from fastapi import FastAPI, Query, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import uvicorn
import extract_json
import compare_json
import requests
import json
import os
import shutil
import json
from pymongo import MongoClient
from bson import json_util
from fastapi import FastAPI, HTTPException
import httpx
import aiofiles # Optional, but good for async file writing
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return "FastAPI is working"

@app.post("/uploadFile/")
async def create_upload_file(file_upload: UploadFile):
    UPLOAD_DIR = Path("uploads")
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True) 

    data = await file_upload.read()
    save_to = UPLOAD_DIR / file_upload.filename
    
    # Save the file
    with open(save_to, "wb") as f:
        f.write(data)
    
    extract_json.process_pdfs()


@app.get("/verify/")
async def verify_diff():
    folder_path = "extracted_json"
    diff = {}
    file_path = os.path.join(folder_path, os.listdir(folder_path)[0])
    with open(file_path, "r", encoding="utf-8") as f:
        json1 = json.load(f)
    # print(json1, type(json1))
    ATLAS_CONNECTION_STRING = "mongodb+srv://webdevlearning777_db_user:shKUSxcnmFhvlnyE@documents.bb7wqae.mongodb.net/?appName=Documents"
    DB_NAME = "test"
    COLLECTION_NAME = "marksheets"

    def get_student_marksheet(roll_no, semester):
        try:
            client = MongoClient(ATLAS_CONNECTION_STRING)
            db = client[DB_NAME]
            collection = db[COLLECTION_NAME]
            query = {
                "marksheet.rollNo": roll_no,
                "marksheet.academic_info.semester": semester
            }
            document = collection.find_one(query)
            
            if document:
                return json.loads(json_util.dumps(document))
            else:
                return None
        except Exception as e:
            print(f"An error occurred: {e}")
            return None
        
    target_roll = json1['marksheet']['rollNo']
    target_sem = json1['marksheet']['academic_info']['semester']
    json2 = get_student_marksheet(target_roll, target_sem)
    if json2:
        del json2["_id"]
        del json2["__v"]
    json.dumps(json1, indent=4)
    json.dumps(json2, indent=4)
    diff = compare_json.compare_json_files(json1, json2)
    INPUT_FOLDER = "C:\\Desktop\\src\\uploads"
    if os.path.exists(folder_path):
        shutil.rmtree(folder_path)
    if os.path.exists(INPUT_FOLDER):
        shutil.rmtree(INPUT_FOLDER)
    return {"file1": json1, "file2": json2, "diff": diff}

@app.post("/save-pdf-to-server")
async def save_pdf(pdf_url: str = Query(...)):
    try:
        # 1. Asynchronously fetch the data
        async with httpx.AsyncClient() as client:
            response = await client.get(pdf_url)
            response.raise_for_status() # Check for errors (404, 500)

        # 2. Save the file to the local disk
        # We use standard open here for simplicity, but aiofiles is better for heavy loads
        UPLOAD_DIR = Path("uploads")
        UPLOAD_DIR.mkdir(parents=True, exist_ok=True) 
        save_path = f"{UPLOAD_DIR}/1.pdf"
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(save_path), exist_ok=True)

        with open(save_path, "wb") as f:
            f.write(response.content)

        return {"message": "File saved successfully", "path": save_path}

    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=400, detail=f"Error fetching PDF: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get('/uploadMongo')
async def uploadDoc2Mongo():
    ATLAS_CONNECTION_STRING = "mongodb+srv://webdevlearning777_db_user:shKUSxcnmFhvlnyE@documents.bb7wqae.mongodb.net/?appName=Documents"
    DB_NAME = "test"
    COLLECTION_NAME = "marksheets"
    try:
        client = MongoClient(ATLAS_CONNECTION_STRING)
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]
        UPLOAD_DIR = Path("uploads")
        UPLOAD_DIR.mkdir(parents=True, exist_ok=True) 
        extract_json.process_pdfs()
        folder_path = "extracted_json"
        file_path = os.path.join(folder_path, os.listdir(folder_path)[0])
        with open(file_path, "r", encoding="utf-8") as f:
            json1 = json.load(f)
        json.dumps(json1, indent=4)
        try:
            collection.insert_one(json1)
        except Exception as e:
            print(e)
    except Exception as e:
        print(e)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
