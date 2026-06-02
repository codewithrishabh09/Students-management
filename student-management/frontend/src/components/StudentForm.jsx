import React, { useState, useEffect } from 'react';
import { addStudent, updateStudent } from '../services/api';

const StudentForm = ({ editData, onDone }) => {
    const initialState = {
        name: '',
        age: '',
        email: '',
        grade: '',
        course: ''
    };

    const [form, setForm] = useState(initialState);

    useEffect(() => {
        if (editData) {
            setForm({
                name: editData.name,
                age: editData.age,
                email: editData.email,
                grade: editData.grade,
                course: editData.course
            });
        } else {
            setForm(initialState);
        }
    }, [editData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editData) {
                await updateStudent(editData.id, form);
            } else {
                await addStudent(form);
            }
            setForm(initialState);
            onDone();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to save student data');
        }
    };

    return (
        <div className="form-container">
            <h2>{editData ? 'Edit Student' : 'Add Student'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input type="number" name="age" value={form.age} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Grade</label>
                    <input type="text" name="grade" value={form.grade} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Course</label>
                    <input type="text" name="course" value={form.course} onChange={handleChange} required />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-submit">
                        {editData ? 'Update Student' : 'Add Student'}
                    </button>
                    {editData && (
                        <button type="button" className="btn-cancel" onClick={onDone}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
