import { useState, useEffect } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";

export default function PatientForm({ onSubmit, initialData, isSubmitting = false }) {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    disease: "",
  });

  useEffect(() => {
    if (initialData) {
      setPatient(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(patient);
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>
            {initialData ? "Edit Patient" : "Add New Patient"}
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter patient name"
                value={patient.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                placeholder="Enter age"
                value={patient.age}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDisease">
              <Form.Label>Disease</Form.Label>
              <Form.Control
                type="text"
                name="disease"
                placeholder="Enter disease"
                value={patient.disease}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="me-2"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}