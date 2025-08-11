// EditPatient.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPatientById, updatePatient } from "../api/patientService";
import PatientForm from "../components/PatientForm";
import { Alert, Spinner } from "react-bootstrap";

export default function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const { data } = await getPatientById(id);
        setPatient(data);
      } catch (err) {
        setError("Failed to load patient data");
        console.error(err);
      }
    };
    loadPatient();
  }, [id]);

  const handleUpdate = async (updatedPatient) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await updatePatient(id, updatedPatient);
      navigate("/");
    } catch (err) {
      setError("Failed to update patient. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!patient) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Edit Patient</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <PatientForm 
        onSubmit={handleUpdate} 
        initialData={patient} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
}