from fastapi import FastAPI, HTTPException, Query
import requests
import os
from urllib.parse import urlparse

app = FastAPI()

DOWNLOAD_DIR = "C:\\Desktop\\src\\uploads"
os.makedirs(DOWNLOAD_DIR, exist_ok=True)


@app.get("/download-pdf")
def download_pdf(pdf_url: str = Query(..., description="Cloudinary PDF URL")):
    try:  # <-- your PDF link here
        filename = f"{DOWNLOAD_DIR}/downloaded.pdf"             # <-- save as this name

        response = requests.get(pdf_url)

        with open(filename, "wb") as f:
            f.write(response.content)
        print("File downloaded successfully")
    except Exception as e:
        print(e)
