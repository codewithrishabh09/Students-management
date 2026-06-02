import React from 'react';
import { deleteStudent } from '../services/api';

const StudentList = ({ students, onEdit, onRefresh }) => {
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await deleteStudent(id);
                onRefresh();
            } catch (error) {
                console.error('Error deleting student:', error);
                alert('Failed to delete student');
            }
        }
    };

    if (students.length === 0) {
        return <div className="no-data">No students found</div>;
    }

    return (
        <div className="student-list-container">
            <table className="student-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Grade</th>
                        <th>Course</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.email}</td>
                            <td>{student.grade}</td>
                            <td>{student.course}</td>
                            <td className="actions">
                                <button className="btn-edit" onClick={() => onEdit(student)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
