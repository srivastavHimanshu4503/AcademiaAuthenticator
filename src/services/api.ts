import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  setDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";

import * as firebaseAuth from "firebase/auth";
import { db, auth, googleProvider, storage } from "../firebaseConfig"; // <-- storage added
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";     // <-- storage imports
import { UserRole, Institution, VerificationRequest } from "../types";
import { MONTHLY_STATS } from "../constants";
import { deleteDoc } from "firebase/firestore";


// ---------------------------------------------
// EXTENDED TYPES
// ---------------------------------------------

export interface FixedInstitution extends Institution {
  logo?: string;
}

export interface Organisation {
  name: string;
  contactName: string;
  mobileNo: string;
  email: string;
  status: "PENDING" | "ACTIVE" | "REJECTED";
  uid: string;
  createdAt: Timestamp;
}

export interface FixedOrganisation extends Organisation {
  id: string;
}

// ---------------------------------------------
// OTP STATE
// ---------------------------------------------
let confirmationResult: firebaseAuth.ConfirmationResult | null = null;

// ---------------------------------------------
// API OBJECT
// ---------------------------------------------
export const api = {
  // ------------------ CITIZEN: Google Login ------------------

  loginGoogle: async () => {
    try {
      const result = await firebaseAuth.signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);

      await setDoc(
        userRef,
        {
          name: user.displayName,
          email: user.email,
          role: UserRole.USER,
          lastLogin: Timestamp.now(),
        },
        { merge: true }
      );

      return {
        name: user.displayName || "User",
        email: user.email,
        role: UserRole.USER,
        token: await user.getIdToken(),
        avatar: user.photoURL,
        uid: user.uid,
      };
    } catch (error) {
      console.error("Google Auth Error:", error);
      throw error;
    }
  },

  // ------------------ CITIZEN: Mobile OTP (SEND) ------------------

  sendOtp: async (phoneNumber: string, recaptchaDivId: string) => {
    try {
      const recaptchaVerifier = new firebaseAuth.RecaptchaVerifier(
        auth,
        recaptchaDivId,
        { size: "invisible" }
      );

      confirmationResult = await firebaseAuth.signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );

      return true;
    } catch (error: any) {
      console.error("OTP Send Error:", error);
      throw new Error(error.message || "Failed to send OTP");
    }
  },

  // ------------------ CITIZEN: Mobile OTP (VERIFY) ------------------

  verifyOtp: async (otp: string) => {
    if (!confirmationResult) {
      throw new Error("OTP was not sent or expired.");
    }

    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);

      await setDoc(
        userRef,
        {
          mobile: user.phoneNumber,
          role: UserRole.USER,
          lastLogin: Timestamp.now(),
        },
        { merge: true }
      );

      return {
        name: "Citizen User",
        mobile: user.phoneNumber,
        role: UserRole.USER,
        token: await user.getIdToken(),
        uid: user.uid,
      };
    } catch (error: any) {
      throw new Error("Invalid OTP");
    }
  },

  // ------------------ INSTITUTION LOGIN ------------------

  loginInstitution: async (email: string, pass: string) => {
    try {
      const result = await firebaseAuth.signInWithEmailAndPassword(
        auth,
        email,
        pass
      );

      const q = query(
        collection(db, "institutions"),
        where("contactEmail", "==", email)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) throw new Error("Institution not registered.");

      const instData = snapshot.docs[0].data() as FixedInstitution;

      if (instData.status === "PENDING")
        throw new Error("Your account is pending approval.");
      if (instData.status === "REJECTED")
        throw new Error("Your account request was rejected.");

      return {
        name: instData.name,
        role: UserRole.INSTITUTION,
        id: snapshot.docs[0].id,
        token: await result.user.getIdToken(),
        uid: result.user.uid,
      };
    } catch (error: any) {
      throw new Error(error.message || "Institution login failed");
    }
  },

  // ------------------ ORGANISATION LOGIN ------------------

  loginOrganisation: async (email: string, pass: string) => {
    try {
      const result = await firebaseAuth.signInWithEmailAndPassword(
        auth,
        email,
        pass
      );

      const q = query(
        collection(db, "organisations"),
        where("email", "==", email)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) throw new Error("Organisation not registered.");

      const orgData = snapshot.docs[0].data() as FixedOrganisation;


      return {
        name: orgData.name,
        role: UserRole.ORGANISATION,
        id: snapshot.docs[0].id,
        token: await result.user.getIdToken(),
        uid: result.user.uid,
      };
    } catch (error: any) {
      throw new Error(error.message || "Organisation login failed");
    }
  },

  // ------------------ LOGOUT ------------------

  logout: async () => {
    await firebaseAuth.signOut(auth);
  },

  // ------------------ REGISTER INSTITUTION ------------------

  registerInstitution: async (data: any) => {
    try {
      const userCredential = await firebaseAuth.createUserWithEmailAndPassword(
        auth,
        data.contactEmail,
        data.password
      );

      const newInst = {
        name: data.name,
        code: data.code,
        type: data.type,
        address: data.address,
        district: data.district,
        principalName: data.principalName,
        contactEmail: data.contactEmail,
        mobile: data.mobile,
        status: "PENDING",
        uid: userCredential.user.uid,
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "institutions"), newInst);

      await firebaseAuth.signOut(auth);
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // ------------------ REGISTER ORGANISATION ------------------

  registerOrganisation: async (data: any) => {
    try {
      const userCredential = await firebaseAuth.createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const newOrg = {
        name: data.organisationName,
        contactName: data.contactName,
        mobileNo: data.mobileNo,
        email: data.email,
        status: "PENDING",
        uid: userCredential.user.uid,
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "organisations"), newOrg);
      await firebaseAuth.signOut(auth);

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // ------------------ INSTITUTION LIST ------------------

  getAllInstitutions: async () => {
    const snapshot = await getDocs(collection(db, "institutions"));
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as FixedInstitution[];
  },

  updateInstitutionStatus: async (
    id: string,
    status: "ACTIVE" | "REJECTED"
  ) => {
    await updateDoc(doc(db, "institutions", id), { status });
    return true;
  },

  // ------------------ USER VERIFICATION QUEUE ------------------

  submitVerificationRequest: async (file: File, userId: string) => {
    const docRef = await addDoc(collection(db, "verification_queue"), {
      userId,
      fileName: file.name,
      status: "PENDING",
      type: "DOCUMENT",
      submittedAt: Timestamp.now(),
    });

    return { requestId: docRef.id };
  },

  submitManualRequest: async (details: any, userId: string) => {
    const docRef = await addDoc(collection(db, "verification_queue"), {
      userId,
      details,
      status: "PENDING",
      type: "MANUAL",
      submittedAt: Timestamp.now(),
    });

    return { requestId: docRef.id };
  },

  getUserRequests: async (userId: string) => {
    if (!userId) return [];

    try {
      const q1 = query(
        collection(db, "verification_queue"),
        where("userId", "==", userId),
        orderBy("submittedAt", "desc")
      );

      const snapshot = await getDocs(q1);

      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          submittedAt: data.submittedAt?.toDate?.()?.toLocaleString() || "",
        } as VerificationRequest;
      });
    } catch {
      const q2 = query(
        collection(db, "verification_queue"),
        where("userId", "==", userId)
      );
      const snapshot = await getDocs(q2);
      return snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as VerificationRequest)
      );
    }
  },

  // --------------------------------------------------------
  // ⭐⭐⭐ NEW: ORGANISATION DOCUMENT UPLOAD APIs ⭐⭐⭐
  // --------------------------------------------------------

  uploadOrganisationDocument: async (formData: FormData) => {
    const file = formData.get("file") as File;
    const organisationId = formData.get("organisationId") as string;

    if (!file || !organisationId)
      throw new Error("File or organisationId missing");

    // Upload file to Firebase Storage
    const fileRef = ref(
      storage,
      `organisation_uploads/${organisationId}/${Date.now()}_${file.name}`
    );

    const snap = await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(snap.ref);

    // Create DB entry
    const docRef = await addDoc(collection(db, "organisation_uploads"), {
      organisationId,
      fileName: file.name,
      fileUrl,
      status: "PENDING",
      uploadedAt: Timestamp.now(),
    });

    return { id: docRef.id };
  },

  getOrganisationUploads: async (organisationId: string) => {
    if (!organisationId) return [];

    const colRef = collection(db, "organisation_uploads");
    const q1 = query(colRef, where("organisationId", "==", organisationId));

    const snapshot = await getDocs(q1);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data.sort((a: any, b: any) => {
      const t1 = a.uploadedAt?.toMillis?.() || 0;
      const t2 = b.uploadedAt?.toMillis?.() || 0;
      return t2 - t1;
    });
  },
  deleteInstitution: async (id: string) => {
    try {
      const instRef = doc(db, "institutions", id);
      await deleteDoc(instRef);
      // NOTE: For a complete solution, you would typically also delete the 
      // corresponding Firebase Auth user using a Cloud Function or Admin SDK.
      return true;
    } catch (error: any) {
      console.error("Firestore Delete Error:", error);
      // Re-throw the error so it can be caught in the component
      throw new Error(error.message || "Failed to delete institution in Firestore.");
    }
  },


  // ------------------ ADMIN DASHBOARD STATS ------------------

  getAdminStats: async () => {
    return MONTHLY_STATS;
  },
};
