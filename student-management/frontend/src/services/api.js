import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000',
});

// ✅ Pass search/filter as query params to backend
export const getStudents = (params = {}) => 
    API.get('/students', { params });
//  params becomes → /students?search=ayu&grade=A&course=Btech

export const getStudent    = (id)       => API.get(`/students/${id}`);
export const addStudent    = (data)     => API.post('/students', data);
export const updateStudent = (id, data) => API.put(`/students/${id}`, data);
export const deleteStudent = (id)       => API.delete(`/students/${id}`);