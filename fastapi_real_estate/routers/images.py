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

# @router.get("/", response_model=list[PropertyImageOut])
import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import PropertyImage
from schemas import PropertyImageBase, PropertyImageOut
from database import SessionLocal

router = APIRouter()

# path to public/property_images
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # fastapi_real_estate/
IMAGES_DIR = os.path.join(BASE_DIR, "public", "property_images")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[PropertyImageOut])
def list_images(db: Session = Depends(get_db)):
    if not os.path.exists(IMAGES_DIR):
        os.makedirs(IMAGES_DIR)

    # list only files in directory
    files_in_dir = [f for f in os.listdir(IMAGES_DIR) if os.path.isfile(os.path.join(IMAGES_DIR, f))]

    # get DB entries
    existing_filenames = {img.filename for img in db.query(PropertyImage).all()}

    # insert new files into DB
    for filename in files_in_dir:
        if filename not in existing_filenames:
            new_img = PropertyImage(filename=filename, path=f"/property_images/{filename}")
            db.add(new_img)
    db.commit()

    # return all images
    return db.query(PropertyImage).all()


@router.get("/{image_id}", response_model=PropertyImageOut)
def get_image(image_id: int, db: Session = Depends(get_db)):
    img = db.query(PropertyImage).filter(PropertyImage.image_id == image_id).first()
    print(img)
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
