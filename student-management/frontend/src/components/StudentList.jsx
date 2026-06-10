import React, { useState, useEffect } from 'react';
import { getStudents, deleteStudent } from '../services/api';

const StudentList = ({ onEdit }) => {
    const [students,     setStudents]     = useState([]);
    const [search,       setSearch]       = useState("");
    const [filterGrade,  setFilterGrade]  = useState("");
    const [filterCourse, setFilterCourse] = useState("");
    const [loading,      setLoading]      = useState(false);

    // ── Fetch from backend whenever filters change ──
    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const params = {};
                if (search)       params.search = search;
                if (filterGrade)  params.grade  = filterGrade;
                if (filterCourse) params.course = filterCourse;

                const { data } = await getStudents(params);
                setStudents(data);
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        };

        // Debounce search — wait 400ms after user stops typing
        const delay = setTimeout(fetchStudents, 400);
        return () => clearTimeout(delay);

    }, [search, filterGrade, filterCourse]); // re-runs on every filter change

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteStudent(id);
                // re-fetch after delete
                setSearch(prev => prev); 
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        }
    };

    return (
        <div className="student-list-container">

            {/* ── Filter Bar ── */}
            <div className="filter-bar">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />

                <select
                    value={filterGrade}
                    onChange={(e) => setFilterGrade(e.target.value)}
                    className="filter-select"
                >
                    <option value="">All Grades</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>

                <select
                    value={filterCourse}
                    onChange={(e) => setFilterCourse(e.target.value)}
                    className="filter-select"
                >
                    <option value="">All Courses</option>
                    <option value="Btech">Btech</option>
                    <option value="BCA">BCA</option>
                    <option value="MCA">MCA</option>
                </select>

                <button className="btn-clear" onClick={() => {
                    setSearch("");
                    setFilterGrade("");
                    setFilterCourse("");
                }}>
                    Clear
                </button>

                <span className="result-count">{students.length} students</span>
            </div>

            {/* ── Table ── */}
            {loading ? (
                <div className="loading">Searching...</div>
            ) : students.length === 0 ? (
                <div className="no-data">No students found</div>
            ) : (
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Grade</th>
                            <th>Course</th>
                            <th>Attendance</th>
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
                                <td>{student.attendance}</td>
                                <td className="actions">
                                    <button className="btn-edit"
                                        onClick={() => onEdit(student)}>Edit</button>
                                    <button className="btn-delete"
                                        onClick={() => handleDelete(student.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default StudentList;