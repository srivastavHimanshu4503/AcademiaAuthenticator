export enum UserRole {
  GUEST = 'GUEST',
  USER = 'USER',
  ADMIN = 'ADMIN',
  INSTITUTION = 'INSTITUTION',
  ORGANISATION = 'ORGANISATION',

}

export interface VerificationRequest {
  id: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'REJECTED';
  submittedAt: any;
  type: 'DOCUMENT' | 'MANUAL';
  fileName?: string;
  details?: any;
  result?: any;
}

export interface VerificationLog {
  id: string;
  candidateName: string;
  certificateId: string;
  institution: string;
  status: 'VERIFIED' | 'FAKE' | 'SUSPICIOUS';
  date: string;
  details: string;
}

export interface Institution {
  id: string;
  name: string;
  code: string;
  type : string;
  district :string;
  address : string;
  principalName : string; 
  mobile : string;
  region: string;
  contactEmail: string;
  status: 'ACTIVE' | 'PENDING' | 'REJECTED';
  password?: string;
}

export interface StatData {
  name: string;
  value: number;
  color?: string;
}

export enum VerificationStep {
  UPLOAD = 0,
  PREVIEW = 1,
  PROCESSING = 2,
  RESULT = 3,
  HANDOVER = 4
}