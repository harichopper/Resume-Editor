from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Add this CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # or ["*"] for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Your existing models and routes
class Section(BaseModel):
    section: str
    content: str

saved_resumes = []

@app.post("/ai-enhance")
async def ai_enhance(section: Section):
    improved = section.content + " (Improved by AI ✨)"
    return {"improved_content": improved}

@app.post("/save-resume")
async def save_resume(resume: dict):
    saved_resumes.append(resume)
    return {"message": "Resume saved successfully"}
