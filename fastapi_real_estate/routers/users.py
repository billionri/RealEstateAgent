from fastapi import APIRouter, Depends, HTTPException
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
AES_KEY = b"RealEstateShop15"  # 16 bytes

# Padding helpers (PKCS7)
def pad(text: str) -> str:
    padding_len = 16 - (len(text) % 16)
    return text + chr(padding_len) * padding_len

def unpad(text: str) -> str:
    return text[:-ord(text[-1])]

# AES decryption
def decrypt_password(enc_password: str) -> str:
    try:
        # Handle URL-safe Base64 (replace -/_ back to +/)
        enc_password = enc_password.replace("-", "+").replace("_", "/")

        # Fix missing padding for Base64
        missing_padding = len(enc_password) % 4
        if missing_padding != 0:
            enc_password += "=" * (4 - missing_padding)

        # Decode from Base64
        enc = base64.b64decode(enc_password)

        # Decrypt AES-ECB
        cipher = AES.new(AES_KEY, AES.MODE_ECB)
        decrypted = cipher.decrypt(enc).decode()

        # Remove PKCS7 padding
        return unpad(decrypted)
    except Exception as e:
        print("Decryption error:", e)
        raise HTTPException(status_code=400, detail="Invalid encrypted password format")

# Login request schema
class LoginRequest(BaseModel):
    email: str
    password: str  # AES encrypted from frontend

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Login route
@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first() 
    print("Received login:", request.email, request.password, "User found:", bool(user))

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    try:
        decrypted_password = decrypt_password(request.password)
        print("Decrypted password:", decrypted_password)  # Debug only
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=400, detail="Decryption failed")

    if not bcrypt.verify(decrypted_password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "user_id": user.user_id,
        "email": user.email
    }

# Create user
@router.post("/", response_model=UserOut)
def create_user(user: UserBase, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    db_obj = User(
        email=user.email,
        password=bcrypt.hash(user.password)  # Hash password
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

# List users
@router.get("/", response_model=list[UserOut])
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()

# Get user by ID
@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Delete user
@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"msg": "User deleted"}
