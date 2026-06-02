import React, { useState, useEffect } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import { getStudents } from './services/api';

function App() {
    const [students, setStudents] = useState([]);
    const [editData, setEditData] = useState(null);

    const fetchStudents = async () => {
        try {
            const { data } = await getStudents();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleDone = () => {
        setEditData(null);
        fetchStudents();
    };

    const handleEdit = (student) => {
        setEditData(student);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="app-container">
            <header>
                <h1>Student Management System</h1>
            </header>
            <main>
                <div className="content-layout">
                    <StudentForm editData={editData} onDone={handleDone} />
                    <div className="list-section">
                        <h2>All Students</h2>
                        <StudentList
                            students={students}
                            onEdit={handleEdit}
                            onRefresh={fetchStudents}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
