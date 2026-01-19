'''import os
import requests
from fastapi import APIRouter

router = APIRouter(prefix="/webhook")

@router.post("/notify")
def notify_relay(payload: dict):
    relay_url = os.getenv("RELAY_WEBHOOK_URL")

    response = requests.post(
        relay_url,
        json={
            "event": "quiz_completed",
            "data": payload
        }
    )

    return {
        "status": "sent to relay.app",
        "relay_response": response.status_code
    }'''


'''from fastapi import APIRouter, Request
from app.ai.langgraph_flow import langgraph_flow

router = APIRouter(prefix="/webhook", tags=["Relay"])

@router.post("/relay")
async def relay_webhook(request: Request):
    payload = await request.json()

    state = {
        "marks": payload.get("marks")
    }

    result = langgraph.invoke(state)

    return {
        "student_id": payload.get("student_id"),
        "subject": payload.get("subject"),
        "learning_path": result["path"]
    }'''
from fastapi import APIRouter, Request
router = APIRouter(prefix="/webhook", tags=["Relay"])

@router.post("/relay")
async def relay_webhook(request: Request):
    payload = await request.json()

    student_id = payload.get("student_id")
    marks = payload.get("marks")
    subject = payload.get("subject")

    recommendation = "Revise fundamentals"
    if marks > 80:
        recommendation = "Proceed to advanced topics"
    elif marks < 40:
        recommendation = "Start remedial lessons"

    return {
        "student_id": student_id,
        "subject": subject,
        "recommendation": recommendation
    }


