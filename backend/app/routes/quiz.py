from fastapi import APIRouter
from openai import OpenAI
import os

router = APIRouter(prefix="/quiz")
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@router.post("/generate")
def generate_quiz(subject: str, topic: str, level: str):
    prompt = f"""
    Generate 10 {level} level MCQs for {topic} in {subject}.
    """
    res = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    return {"questions": res.choices[0].message.content}