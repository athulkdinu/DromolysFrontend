import { Table, Alert } from "react-bootstrap";

function DataTable({ columns = [], tableData = [] }) {
  if (columns.length === 0) {
    return <Alert>Upload a CSV file to see the table</Alert>;
  }

  if (tableData.length === 0) {
    return <Alert>No data available</Alert>;
  }

  return (
    <Table bordered striped hover size="sm">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col}>{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DataTable;
