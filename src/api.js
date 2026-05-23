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

// Auto-generated missing exports by VIA
export const createItem = async (data) => {
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/items`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  if (!r.ok) throw new Error('createItem failed');
  return r.json();
};
export const deleteItem = async (id) => {
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/items/${id}`, { method: 'DELETE' });
  if (!r.ok) throw new Error('deleteItem failed');
  return r.json();
};
export const getItems = async (params) => {
  const q = params ? '?' + new URLSearchParams(params).toString() : '';
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/items${q}`);
  if (!r.ok) throw new Error('getItems failed');
  return r.json();
};
export const getStats = async () => {
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/stats`);
  if (!r.ok) throw new Error('getStats failed');
  return r.json();
};
