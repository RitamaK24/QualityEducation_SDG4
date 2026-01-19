'''from fastapi import APIRouter, HTTPException, Header
from app.database import supabase

router = APIRouter(prefix="/auth")

@router.post("/signup")
def signup(email: str, password: str):
    response = supabase.auth.sign_up({
        "email": email,
        "password": password
    })

    if response.user is None:
        raise HTTPException(status_code=400, detail="Signup failed")

    return {"message": "User created successfully"}

@router.post("/login")
def login(email: str, password: str):
    response = supabase.auth.sign_in_with_password({
        "email": email,
        "password": password
    })

    if response.session is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "access_token": response.session.access_token,
        "user": response.user
    }

@router.get("/verify")
def verify_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing token")

    token = authorization.replace("Bearer ", "")
    user = supabase.auth.get_user(token)

    return {"user": user}'''



from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.database import supabase
from app.schemas import LoginRequest
from app.schemas import SignupRequest
import random

router = APIRouter(prefix="/auth", tags=["auth"])

otp_store = {}  # TEMP STORE (replace with Supabase later)

class EmailRequest(BaseModel):
    email: str

class OtpRequest(BaseModel):
    email: str
    otp: str

@router.post("/send-otp")
def send_otp(data: EmailRequest):
    otp = str(random.randint(100000, 999999))
    otp_store[data.email] = otp

    # 🔁 Replace this with Supabase Email / SMTP
    print(f"OTP for {data.email}: {otp}")

    return {"message": "OTP sent to registered email"}

@router.post("/verify-otp")
def verify_otp(data: OtpRequest):
    if otp_store.get(data.email) == data.otp:
        del otp_store[data.email]
        return {"message": "OTP verified. Registration successful."}

    return {"message": "Invalid OTP"}

router = APIRouter()

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str
    classLevel: str


'''@router.post("/login")
def login(email: str, password: str):
    response = supabase.auth.sign_in_with_password({
        "email": email,
        "password": password
    })

    if response.session is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "access_token": response.session.access_token,
        "user": response.user
    }'''

@router.post("/login")
def login_user(payload: LoginRequest):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": payload.email,
            "password": payload.password
        })

        if response.user is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        return {
            "message": "Login successful",
            "user": {
                "id": response.user.id,
                "email": response.user.email
            },
            "access_token": response.session.access_token
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/signup")
def signup_student(data: SignupRequest):
    # 1. Check if email already exists
    existing = (
        supabase
        .table("students")
        .select("id")
        .eq("email", data.email)
        .execute()
    )

    if existing.data:
        raise HTTPException(
            status_code=400,
            detail="User already exists. Please login."
        )

    # 2. Insert new student
    response = (
        supabase
        .table("students")
        .insert({
            "email": data.email,
            "password": data.password,
            "name": data.name
        })
        .execute()
    )

    return {
        "message": "Signup successful",
        "user": response.data[0]
    }

'''@router.post("/signup")
def signup_student(data: SignupRequest):
    # 1. Create user in Supabase Auth
    auth_response = supabase.auth.sign_up({
        "email": data.email,
        "password": data.password
    })

    if auth_response.user is None:
        raise HTTPException(status_code=400, detail="Signup failed")

    # 2. Store student profile
    supabase.table("students").insert({
        "id": auth_response.user.id,
        "name": data.name,
        "email": data.email,
        "class": data.classLevel
    }).execute()

    return {"message": "Signup successful"}'''
'''from fastapi import Depends, HTTPException, Header
from app.db.supabase_client import supabase

def get_current_user(authorization: str = Header(...)):
    try:
        token = authorization.split(" ")[1]
        user = supabase.auth.get_user(token)
        return user
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")'''
