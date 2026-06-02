from pydantic import BaseModel
from typing import Optional

class Student(BaseModel):
    name: str
    age: int
    email: str
    grade: str
    course: str

class UpdateStudent(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    email: Optional[str] = None
    grade: Optional[str] = None
    course: Optional[str] = None
    