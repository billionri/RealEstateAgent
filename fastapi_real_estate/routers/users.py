from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import User
from schemas import UserBase, UserOut
from database import SessionLocal
from pydantic import BaseModel
#from passlib.hash import bcrypt

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#@router.post("/login")
#def login(request: LoginRequest, db: Session = Depends(get_db)):
#    user = db.query(User).filter(User.email == request.email).first()
#    if not user or not bcrypt.verify(request.password, user.password):
#        raise HTTPException(status_code=401, detail="Invalid credentials")
#    return {"message": "Login successful", "user_id": user.user_id}

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
