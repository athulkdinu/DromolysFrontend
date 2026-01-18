import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { uploadCSVAPI } from "../services/AllAPI";

function UploadCSV({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    const response = await uploadCSVAPI(formData);
    setLoading(false);

    if (response && response.status === 200) {
      onUploadSuccess(response.data);
      setError("");
    } else {
      setError("CSV upload failed");
    }
  };

  return (
    <Form onSubmit={handleUpload}>
      <Form.Group className="mb-2">
        <Form.Control type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])}/>
      </Form.Group>

      <Button type="submit" disabled={loading}>{loading ? "Uploading..." : "Upload CSV"}</Button>

      {error && (<Alert variant="danger" className="mt-2">{error}</Alert>)}
    </Form>
  );
}

export default UploadCSV;
