// AddPatient.jsx
import { useNavigate } from "react-router-dom";
import { createPatient } from "../api/patientService";
import PatientForm from "../components/PatientForm";
import { useState } from "react";
import { Alert } from "react-bootstrap";

export default function AddPatient() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = async (patient) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await createPatient(patient);
      navigate("/");
    } catch (err) {
      setError("Failed to add patient. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Add New Patient</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <PatientForm onSubmit={handleAdd} isSubmitting={isSubmitting} />
    </div>
  );
}