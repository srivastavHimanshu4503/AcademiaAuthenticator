import os
import json
import re
import pdfplumber
import traceback
import shutil
# --- CONFIGURATION ---
INPUT_FOLDER = "C:\\Desktop\\src\\uploads"
OUTPUT_FOLDER = "extracted_json"

def clean_text(text):
    if text:
        return text.strip()
    return ""

def safe_float(value):
    """
    Safely converts a string to float. 
    Returns 0.0 if conversion fails or if value is just '.'
    """
    try:
        if not value: return 0.0
        # Remove any stray characters that aren't digits or dots
        cleaned = re.sub(r'[^\d\.]', '', str(value))
        if cleaned == '.' or cleaned == '':
            return 0.0
        return float(cleaned)
    except:
        return 0.0

def extract_fields_from_pdf(pdf_path):
    data = {
        "text_content": "",
        "tables": []
    }
    
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            # Extract Text
            page_text = page.extract_text()
            if page_text:
                data["text_content"] += page_text + "\n"
            
            # Extract Tables
            tables = page.extract_tables()
            for table in tables:
                data["tables"].append(table)

    text = data["text_content"]
    
    # --- 1. REGEX EXTRACTION ---
    university = None

    # Method 1: match uppercase university heading
    university_match = re.search(r"([A-Z][A-Z\s]+UNIVERSITY)", text)
    if university_match:
        university = clean_text(university_match.group(1))
    else:
        # Fallback: any uppercase line containing UNIVERSITY
        for line in text.split("\n"):
            if "UNIVERSITY" in line and line.strip().isupper():
                university = clean_text(line)
                break

    # Roll No
    roll_match = re.search(r"University Roll No[:\s]*(\d+)", text, re.IGNORECASE | re.MULTILINE)
    roll_no = roll_match.group(1) if roll_match else None

    # Name
    name_match = re.search(r"Student's Name[:\s]*([A-Za-z\s\.]+)", text, re.IGNORECASE)
    student_name = ' '.join(clean_text(name_match.group(1)).split()[:2]) if name_match else ""

    # Semester
    sem_match = re.search(r"SEMESTER\s+([IVX]+)", text, re.IGNORECASE)
    semester = sem_match.group(1) if sem_match else None

    # Course
    course_match = re.search(r"(BACHELOR OF TECHNOLOGY|B\.Tech|BCA|MCA|B\.Sc)", text, re.IGNORECASE)
    course = course_match.group(1) if course_match else "B.Tech"

    # SGPA/CGPA 
    # FIX: Updated Regex to (\d+\.\d+) to ensure we get digits, not just dots.
    sgpa_match = re.search(r"SGPA[\s\S]{0,50}?(\d+\.\d+)", text)
    cgpa_match = re.search(r"CGPA[\s\S]{0,50}?(\d+\.\d+)", text)
    
    # FIX: Use safe_float to prevent crashes
    sgpa = safe_float(sgpa_match.group(1)) if sgpa_match else 0.0
    cgpa = safe_float(cgpa_match.group(1)) if cgpa_match else 0.0

    # --- 2. TABLE EXTRACTION ---
    subjects_list = []
    
    for table in data["tables"]:
        if not table: continue
        
        # Check headers
        headers = [str(cell).lower() for cell in table[0] if cell]
        
        # Heuristic: Looks for "Subject Code" OR "Code" in the header row
        if any(x in str(headers) for x in ["subject code", "sub code", "code"]):
            
            for row in table[1:]:
                # Clean row
                row = [clean_text(str(cell)) for cell in row]

                # Validation filters
                if len(row) < 3: continue
                if "THEORY" in row[0] or "PRACTICAL" in row[0]: continue
                if "Total" in row[0] or "Total" in row[2]: continue
                if not row[0]: continue 

                # Attempt to map columns safely
                try:
                    subj_entry = {
                        "code": row[0],
                        "name": row[1],
                        "grade": row[2] if len(row) > 2 else "",
                        "grade_points": row[3] if len(row) > 3 else "",
                        "credit": row[4] if len(row) > 4 else ""
                    }
                    subjects_list.append(subj_entry)
                except IndexError:
                    continue

    return {
        "university": university,
        "roll_no": roll_no,
        "name": student_name,
        "semester": semester,
        "course": course,
        "sgpa": sgpa,
        "cgpa": cgpa,
        "subjects": subjects_list
    }

def process_pdfs():
    os.makedirs(INPUT_FOLDER, exist_ok=True)
    os.makedirs(OUTPUT_FOLDER, exist_ok=True)
    print("inside process pdfs")
    if not os.path.exists(INPUT_FOLDER):
        print(f"Error: Input folder not found at: {INPUT_FOLDER}")
        return

    files = [f for f in os.listdir(INPUT_FOLDER) if f.lower().endswith('.pdf')]
    print(f"Found {len(files)} PDFs. Processing...")

    for filename in files:
        try:
            file_path = os.path.join(INPUT_FOLDER, filename)
            extracted = extract_fields_from_pdf(file_path)
            
            # Marks Map
            marks_map = {sub['name']: sub['grade_points'] for sub in extracted['subjects']}
            
            json_output = {
                "marksheet": {
                    "rollNo": extracted['roll_no'],
                    "university": extracted['university'],
                    "document_metadata": {
                        "schema_version": "1.0",
                        "university_name": extracted['university'],
                        "document_type": "marksheet",
                        "issue_date": None
                    },
                    "student_info": {
                        "name": extracted['name'],
                        "roll_no": extracted['roll_no'],
                        "registration_no": extracted['roll_no'],
                        "certificate_id": None
                    },
                    "academic_info": {
                        "course": extracted['course'],
                        "semester": extracted['semester'],
                        "marks": marks_map,
                        "credits": extracted["subjects"][0]["credit"] if extracted["subjects"] else None,
                        "total_marks": sum([int(sub["credit"])*int(sub["grade_points"]) for sub in extracted["subjects"]]),
                        "total_credits": sum([int(sub["credit"]) for sub in extracted["subjects"]]),
                        "sgpa": extracted['sgpa'],
                        "cgpa": extracted['cgpa'],
                        "result_status": "PASS" if extracted['cgpa'] > 0 else "FAIL",
                        "subjects": extracted['subjects']
                    },
                },
            }

            json_filename = os.path.splitext(filename)[0] + ".json"
            output_path = os.path.join(OUTPUT_FOLDER, json_filename)

            with open(output_path, 'w', encoding='utf-8') as json_file:
                json.dump(json_output, json_file, indent=4)
            
            return json.dumps(json_output, indent=4)

        except Exception as e:
            print(f"FAILED: {filename}")
            traceback.print_exc()

if __name__ == "__main__":
    process_pdfs()