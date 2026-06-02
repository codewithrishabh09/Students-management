import React from 'react';

const StudentCard = ({ student }) => {
    return (
        <div className="student-card">
            <h3>{student.name}</h3>
            <div className="card-content">
                <p><strong>Age:</strong> {student.age}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Grade:</strong> {student.grade}</p>
                <p><strong>Course:</strong> {student.course}</p>
            </div>
        </div>
    );
};

export default StudentCard;
