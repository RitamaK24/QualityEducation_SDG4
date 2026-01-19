from fastapi import APIRouter
from app.schemas import QuizSubmission
from app.database import supabase
from app.ai.langgraph_flow import tutor_graph
import requests
import os


router = APIRouter(prefix="/tutor")

@router.post("/submit-quiz")
def submit_quiz(data: QuizSubmission):
    # Run AI logic
    state = {
        "topic": data.topic,
        "score": data.score
    }

    result = tutor_graph.invoke(state)

    # Store in Supabase
    supabase.table("progress").insert({
        "student_id": data.student_id,
        "topic": data.topic,
        "level": result["level"],
        "score": data.score
    }).execute()

    # Trigger relay.app webhook
    requests.post(
        os.getenv("RELAY_WEBHOOK_URL"),
        json={
            "student_id": data.student_id,
            "topic": data.topic,
            "score": data.score,
            "level": result["level"]
        }
    )

    
    return result



'''from fastapi import APIRouter, Depends
from app.auth import get_current_user
from app.db.supabase_client import supabase

router = APIRouter(prefix="/student", tags=["Student"])

@router.get("/profile")
def get_student_profile(user=Depends(get_current_user)):
    response = (
        supabase
        .table("profiles")
        .select("*")
        .eq("id", user.user.id)
        .single()
        .execute()
    )
    return response.data


@router.get("/progress")
def get_progress(user=Depends(get_current_user)):
    response = (
        supabase
        .table("progress")
        .select("*")
        .eq("student_id", user.user.id)
        .execute()
    )
    return response.data'''