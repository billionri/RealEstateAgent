from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from models import User
from schemas import UserBase, UserOut
from database import SessionLocal
from pydantic import BaseModel
from passlib.hash import bcrypt

from Crypto.Cipher import AES
import base64

router = APIRouter()

# AES KEY (must be 16/24/32 bytes)
AES_KEY = b"RealEstateShop1"

def pad(text):
    return text + (16 - len(text) % 16) * chr(16 - len(text) % 16)

def unpad(text):
    return text[:-ord(text[-1])]

def decrypt_password(enc_password: str) -> str:
    try:
        enc = base64.b64decode(enc_password)
        cipher = AES.new(AES_KEY, AES.MODE_ECB)
        decrypted = cipher.decrypt(enc).decode()
        return unpad(decrypted)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid encrypted password format")

class LoginRequest(BaseModel):
    email: str
    password: str  # This should be AES encrypted from frontend

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Decrypt the AES encrypted password
    try:
        decrypted_password = decrypt_password(request.password)
    except:
        raise HTTPException(status_code=400, detail="Decryption failed")

    if not bcrypt.verify(decrypted_password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "user_id": user.user_id,
        "email": user.email
    }

@router.post("/", response_model=UserOut)
def create_user(user: UserBase, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    db_obj = User(
        email=user.email,
        password=bcrypt.hash(user.password)  # Hash password here
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/", response_model=list[UserOut])
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"msg": "User deleted"}
