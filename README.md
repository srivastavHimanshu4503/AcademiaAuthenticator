# 🌟 Document Authenticity — Frontend + Backend 

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?size=27&duration=3000&color=00ADEF&center=true&vCenter=true&width=900&lines=Document+Authenticity;React+(TypeScript)+%2B+Python+Backend;Vite+%2B+Tailwind" alt="typing" />
</p>

---

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)]()
![Repo size](https://img.shields.io/github/repo-size/srivastavHimanshu4503/your-repo?style=for-the-badge)
![Top language](https://img.shields.io/github/languages/top/srivastavHimanshu4503/your-repo?style=for-the-badge)
![Last commit](https://img.shields.io/github/last-commit/srivastavHimanshu4503/your-repo?style=for-the-badge)

---

## 🚀 About
A clean demo for a Document Authenticity & Comparison web application. Frontend is a Vite + React (TypeScript) project with Tailwind; backend contains Python utilities (scripts for extraction/compare) and a simple server endpoint to accept uploads. README reflects the repository structure shown in the screenshots.

---

## 🧩 Features
- React + TypeScript frontend with modular page/components structure.
- Document upload flow + comparison display page.
- Admin / Institution / User dashboards (scaffolds).
- Python backend scripts for JSON extraction, comparison and a simple `main.py` for integration/testing.
- `downloads/` for storing generated comparison results or processed files.

---

## 🛠 Tech Stack
- ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/Tailwind-CB3837?style=for-the-badge&logo=tailwindcss&logoColor=white)
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
- Python (scripts inside `/backend`) — OCR / data extract utilities

---

## 📁 Project file structure (as in screenshots)

```bash
SRC/
├─ backend/
│ ├─ pycache/
│ ├─ downloads/ # generated outputs / processed files
│ ├─ add.py # helper script
│ ├─ compare_json.py # comparison logic (JSON comparator)
│ ├─ extract_json.py # extraction logic (from OCR / pdf)
│ └─ main.py # lightweight server or orchestration entry
├─ node_modules/
├─ src/ # frontend source
│ ├─ components/
│ │ ├─ DocumentAuthenticityForm.tsx
│ │ ├─ Footer.tsx
│ │ └─ Navbar.tsx
│ ├─ pages/
│ │ ├─ AdminAuth.tsx
│ │ ├─ AdminDashboard.tsx
│ │ ├─ Auth.tsx
│ │ ├─ AuthTab.tsx
│ │ ├─ CitizenLoginForm.tsx
│ │ ├─ DocumentAuthenticityPage.tsx
│ │ ├─ DocumentComparisonDisplay.tsx
│ │ ├─ InstitutionDashboard.tsx
│ │ ├─ InstitutionProfile.tsx
│ │ ├─ InstitutionRegistration.tsx
│ │ ├─ LandingPage.tsx
│ │ ├─ OrganisationDashboard.tsx
│ │ ├─ OrganisationRegistration.tsx
│ │ ├─ ProfilePage.tsx
│ │ ├─ StandardLoginForm.tsx
│ │ ├─ UploadDoc.tsx
│ │ ├─ UserDashboard.tsx
│ │ ├─ VerificationFlow.tsx
│ │ └─ UploadDoc.css
│ ├─ services/
│ │ └─ App.tsx
│ ├─ constants.ts
│ ├─ firebaseConfig.ts
│ ├─ index.css
│ ├─ main.tsx
│ └─ types.ts
├─ .env
├─ index.html
├─ local_setup.js
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ server.js
├─ tailwind.config.js
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```

--- 

---

## ⚡ Quick start

### Frontend
```bash
# from repository root
cd src         # or wherever package.json is located (root in screenshots)
npm install
npm run dev
# build for production
npm run build
```

---

```bash
# recommended: create a venv
cd ./backend # or whereever the backend folder exists in the root directory
python -m venv .venv
# activate .venv (mac/linux)
source .venv/bin/activate
# activate .venv (windows)
.venv\Scripts\activate

pip install -r requirements.txt   # create this file listing Flask, pypdf, pytesseract, etc.
# run a simple orchestrator / test harness
python main.py
```

## 📬 Contact & links

GitHub: https://github.com/srivastavHimanshu4503

LinkedIn: https://www.linkedin.com/in/himanshu-srivastav-3117a4269

## 📝 License

MIT — feel free to adapt and reuse.
