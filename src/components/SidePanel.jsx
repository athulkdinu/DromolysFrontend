import { Button, Card, Form, Alert } from "react-bootstrap";

function SidePanel({
  columns = [],selectedColumn = "",onColumnChange,onStatRequest, onHistogramRequest, columnType = "",statsResult,missingCount = 0,})
   {
  const isNumeric = columnType === "number";

  return (
    <Card>
      <Card.Body>
        <Card.Title>Column Actions</Card.Title>

        {/* Column selection */}
        <Form.Group className="mb-3">
          <Form.Label>Select Column</Form.Label>
          <Form.Select value={selectedColumn} onChange={(e) => onColumnChange(e.target.value)}>
            <option value="">Select</option>
            {columns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Statistic buttons */}
        <div className="mb-2">
          <Button size="sm" className="me-2 mb-2" disabled={!isNumeric} onClick={() => onStatRequest("min")}>
            Min
          </Button>

          <Button size="sm" className="me-2 mb-2" disabled={!isNumeric} onClick={() => onStatRequest("max")}>
            Max
          </Button>

          <Button size="sm" className="me-2 mb-2" disabled={!isNumeric} onClick={() => onStatRequest("mean")}>
            Mean
          </Button>

          <Button size="sm" className="me-2 mb-2" disabled={!isNumeric} onClick={() => onStatRequest("median")}>
            Median
          </Button>

          <Button size="sm" className="me-2 mb-2" onClick={() => onStatRequest("mode")}>
            Mode
          </Button>
        </div>

        {/* Histogram */}
        <Button variant="secondary" size="sm" disabled={!isNumeric} onClick={onHistogramRequest}>
          Show Histogram
        </Button>

        {/* Missing values */}
        <div className="mt-2">
          <strong>Missing values:</strong> {missingCount}
        </div>

        {/* Result display */}
        {statsResult && (
          <Alert variant="info" className="mt-2">
            <strong>{statsResult.stat.toUpperCase()}:</strong>{" "}
            {statsResult.value}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default SidePanel;
