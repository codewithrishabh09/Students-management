from fastapi import APIRouter, HTTPException
from database import student_collection
from models import Student, UpdateStudent
from bson import ObjectId
from typing import List

router = APIRouter()

def student_helper(student) -> dict:
    return {
        "id": str(student["_id"]),
        "name": student["name"],
        "age": student["age"],
        "email": student["email"],
        "grade": student["grade"],
        "course": student["course"],
    }

@router.get("/students", response_model=List[dict])
async def get_students():
    students = []
    async for student in student_collection.find():
        students.append(student_helper(student))
    return students

@router.post("/students")
async def add_student(student: Student):
    result = await student_collection.insert_one(student.dict())
    new = await student_collection.find_one({"_id": result.inserted_id})
    return student_helper(new)

@router.get("/students/{id}")
async def get_student(id: str):
    student = await student_collection.find_one({"_id": ObjectId(id)})
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student_helper(student)

@router.put("/students/{id}")
async def update_student(id: str, data: UpdateStudent):
    update = {k: v for k, v in data.dict().items() if v is not None}
    result = await student_collection.update_one({"_id": ObjectId(id)}, {"$set": update})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Student not found")
    updated = await student_collection.find_one({"_id": ObjectId(id)})
    return student_helper(updated)

@router.delete("/students/{id}")
async def delete_student(id: str):
    result = await student_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"message": "Student deleted successfully"}

    