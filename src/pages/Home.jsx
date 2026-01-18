import { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import UploadCSV from "../components/UploadCSV";
import DataTable from "../components/DataTable";
import SidePanel from "../components/SidePanel";
import Histogram from "../components/Histogram";
import {
  getTableDataAPI,
  getColumnStatsAPI,
  getHistogramAPI,
} from "../services/AllAPI";

function Home() {
  const [datasetId, setDatasetId] = useState("");
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [columnType, setColumnType] = useState("");
  const [statsResult, setStatsResult] = useState(null);
  const [histogramData, setHistogramData] = useState(null);
  const [missingCount, setMissingCount] = useState(0);
  const [error, setError] = useState("");

  /* After CSV upload */
  const handleUploadSuccess = async (data) => {
    setDatasetId(data.datasetId);
    setColumns(data.schema.map((c) => c.name));
    setSelectedColumn("");
    setStatsResult(null);
    setHistogramData(null);
    setMissingCount(0);
    setError("");

    const res = await getTableDataAPI(data.datasetId);
    if (res?.status === 200) {
      setTableData(res.data.rows);
    } else {
      setError("Failed to load table data");
    }
  };

  /* Column change */
  const handleColumnChange = (col) => {
    setSelectedColumn(col);
    setStatsResult(null);
    setHistogramData(null);
    setMissingCount(0);
    setColumnType("number"); // backend will confirm
  };

  /* Statistics */
  const handleStatRequest = async (stat) => {
    const res = await getColumnStatsAPI(datasetId, selectedColumn);
    if (res?.status === 200) {
      setStatsResult({
        stat,
        value: res.data[stat] ?? res.data.mode,
      });
      setColumnType(res.data.type);
      setMissingCount(res.data.missingCount || 0);
    } else {
      setError("Failed to fetch statistics");
    }
  };

  /* Histogram */
  const handleHistogramRequest = async () => {
    const res = await getHistogramAPI(datasetId, selectedColumn);
    if (res?.status === 200) {
      setHistogramData(res.data);
    } else {
      setError("Failed to generate histogram");
    }
  };

  return (
    <Container fluid>
      <UploadCSV onUploadSuccess={handleUploadSuccess} />

      {error && (
        <Alert variant="danger" className="mt-2">
          {error}
        </Alert>
      )}

      <Row className="mt-3">
        <Col md={8}>
          <DataTable columns={columns} tableData={tableData} />
        </Col>

        <Col md={4}>
          <SidePanel
            columns={columns}
            selectedColumn={selectedColumn}
            columnType={columnType}
            onColumnChange={handleColumnChange}
            onStatRequest={handleStatRequest}
            onHistogramRequest={handleHistogramRequest}
            statsResult={statsResult}
            missingCount={missingCount}
          />

          <Histogram
            histogramData={histogramData}
            selectedColumn={selectedColumn}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
