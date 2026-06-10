from fastapi import APIRouter, Query
from typing import Optional
from database import student_collection
from helpers.student_helper import student_helper

router = APIRouter()

@router.get("/students")
async def get_students(
    search: Optional[str] = Query(None),
    grade:  Optional[str] = Query(None),
    course: Optional[str] = Query(None),
):
    query = {}

    # Search by name or email
    if search:
        query["$or"] = [
            {"name":  {"$regex": search, "$options": "i"}},
            {"email": {"$regex": search, "$options": "i"}},
        ]

    # Filter by grade
    if grade:
        query["grade"] = grade

    # Filter by course
    if course:
        query["course"] = course

    students = []
    async for student in student_collection.find(query):
        students.append(student_helper(student))

    return students