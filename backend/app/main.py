'''from fastapi import FastAPI
from app.routes.auth import router as auth_router
from app.routes.tutor import router as tutor_router
from app.routes.webhook import router as webhook_router
from  dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Tutor Backend")

app.include_router(auth_router)
app.include_router(tutor_router)
app.include_router(webhook_router)'''

from fastapi import FastAPI
from app.routes.auth import router as auth_router
from app.routes.tutor import router as tutor_router
from app.routes.webhook import router as webhook_router
from app.routes.quiz import router as quiz_router
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI(title="AI Tutor Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(tutor_router)
app.include_router(quiz_router)
app.include_router(webhook_router)

@app.get("/")
def root():
    return {"status": "Backend running"}

'''from fastapi import FastAPI
from app.routes import student, relay_webhook

app = FastAPI(title="AI Tutor Backend")

app.include_router(student.router)
app.include_router(relay_webhook.router)

@app.get("/")
def root():
    return {"status": "AI Tutor Backend Running"}'''
