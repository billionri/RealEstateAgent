# routers/images.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import PropertyImage
from schemas import PropertyImageBase, PropertyImageOut
from database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=PropertyImageOut)
def create_image(image: PropertyImageBase, db: Session = Depends(get_db)):
    db_image = PropertyImage(**image.dict())
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return db_image

@router.get("/", response_model=list[PropertyImageOut])
def list_images(db: Session = Depends(get_db)):
    return db.query(PropertyImage).all()

@router.get("/{image_id}", response_model=PropertyImageOut)
def get_image(image_id: int, db: Session = Depends(get_db)):
    img = db.query(PropertyImage).filter(PropertyImage.image_id == image_id).first()
    if not img:
        raise HTTPException(status_code=404, detail="Image not found")
    return img

@router.delete("/{image_id}")
def delete_image(image_id: int, db: Session = Depends(get_db)):
    img = db.query(PropertyImage).filter(PropertyImage.image_id == image_id).first()
    if not img:
        raise HTTPException(status_code=404, detail="Image not found")
    db.delete(img)
    db.commit()
    return {"msg": "Deleted"}
