import axios from "axios";

const API_URL = "http://localhost:4002/api/patients"; // Your backend URL

export const getPatients = () => axios.get(API_URL);

export const getPatientById = (id) => axios.get(`${API_URL}/${id}`);

export const createPatient = (patient) => axios.post(API_URL, patient);

export const updatePatient = (id, patient) => axios.put(`${API_URL}/${id}`, patient);

export const deletePatient = (id) => axios.delete(`${API_URL}/${id}`);
