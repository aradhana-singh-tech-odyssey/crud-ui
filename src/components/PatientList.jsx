import { useEffect, useState } from "react";
import { getPatients, deletePatient } from "../api/patientService";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table, Container, Alert, Spinner } from "react-bootstrap";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadPatients = async () => {
    try {
      const { data } = await getPatients();
      setPatients(data);
    } catch (err) {
      setError("Failed to load patients. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await deletePatient(id);
        loadPatients();
      } catch (err) {
        setError("Failed to delete patient");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Patient Management</h1>
        <Button as={Link} to="/add" variant="primary">
          Add New Patient
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Disease</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.disease}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/edit/${p.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No patients found. Add your first patient!
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}