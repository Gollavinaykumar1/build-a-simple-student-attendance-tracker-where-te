# LLM Output

=== FILE: src/App.jsx ===
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FiUser, FiCalendar } from 'react-icons/fi';
import { format } from 'date-fns';
import { clsx } from 'clsx';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const { register, handleSubmit } = useForm();

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const markAttendance = async (studentId, status) => {
    try {
      const response = await axios.post(`${BASE_URL}/attendance`, {
        studentId,
        status,
        date: format(new Date(), 'yyyy-MM-dd'),
      });
      setAttendance((prevAttendance) => ({ ...prevAttendance, [studentId]: status }));
      toast.success('Attendance marked successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/students`, data);
      setStudents((prevStudents) => [...prevStudents, response.data]);
      toast.success('Student added successfully');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <HashRouter>
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Student Attendance Tracker</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Student Name
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className={clsx('shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline', {
              'border-red-500': register('name').errors,
            })}
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Student
          </button>
        </form>
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Student Name</th>
              <th className="px-4 py-2">Attendance</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">
                  {attendance[student.id] === 'present' ? (
                    <span className="text-green-500">
                      <FiUser /> Present
                    </span>
                  ) : attendance[student.id] === 'absent' ? (
                    <span className="text-red-500">
                      <FiUser /> Absent
                    </span>
                  ) : (
                    <span className="text-gray-500">
                      <FiCalendar /> Not marked
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    type="button"
                    onClick={() => markAttendance(student.id, 'present')}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Mark Present
                  </button>
                  <button
                    type="button"
                    onClick={() => markAttendance(student.id, 'absent')}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Mark Absent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </HashRouter>
  );
}

export default App;
=== END ===

=== FILE: src/main.jsx ===
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
=== END ===

=== FILE: src/index.css ===
@tailwind base;
@tailwind components;
@tailwind utilities;
=== END ===

=== FILE: src/api.js ===
// No need to create a separate api.js file as we are using axios directly in App.jsx
// However, if you want to create a separate file for API calls, you can do something like this:
// import axios from 'axios';
// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
// export const getStudents = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/students`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
// export const markAttendance = async (studentId, status) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/attendance`, {
//       studentId,
//       status,
//       date: format(new Date(), 'yyyy-MM-dd'),
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
=== END ===