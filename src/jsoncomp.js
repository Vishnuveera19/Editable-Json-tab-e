import React, { useState } from "react";
import axios from "axios";
const JsonTable = ({ jsonData }) => {
  const [editable, setEditable] = useState(-1);
  const [save, setSave] = useState({ status: false, index: -1 });
  const [buttonText, setButtonText] = useState(false);
  // Check if JSON data is provided
  if (!jsonData) {
    return <div>No JSON data provided.</div>;
  }
  // jsonData.map((e) => (e.editable = false));
  // Function to check if a value is an object
  const isObject = (value) =>
    typeof value === "object" && value !== null && !Array.isArray(value);

  // Render a cell containing either a value or a subtable
  const renderCell = (value) => {
    if (isObject(value)) {
      return <JsonTable jsonData={[value]} />;
    } else {
      return value;
    }
  };

  // Extract column headers from the first object in the JSON
  const columnHeaders = Object.keys(jsonData[0]);

  return (
    <table border="solid 2px black">
      <thead>
        <tr>
          {columnHeaders.map((header) => (
            <th key={header}>{header.split("_").join(" ")}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {jsonData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columnHeaders.map((header, colIndex) => (
              <td key={`${rowIndex}-${colIndex}`}>
                {editable == rowIndex ? (
                  <input
                    type="text"
                    name={row[header]}
                    defaultValue={row[header]}
                    onChange={(e) => {
                      row[header] = e.target.value;
                    }}
                  />
                ) : (
                  renderCell(row[header])
                )}
              </td>
            ))}
            <td>
              <button
                onClick={() => {
                  setEditable(rowIndex);
                }}>
                {editable == rowIndex ? (
                  <button
                    onClick={() => {
                      console.log(row);
                      row.paymBranch = {
                        pnCompany: {
                          pnCompanyId: row.pnCompanyId,
                        },
                        pnBranchId: row.pnBranchId,
                      };
                      axios
                        .put(
                          "https://localhost:7266/api/PaymEmployees/" +
                            row.pnCompanyId,
                          row
                        )
                        .then((e) => {
                          if ((e.status = 204)) {
                            alert("Data Saved Successfully!");
                            setEditable(-1);
                          }
                        })
                        .catch((e) => {
                          alert("cannot perform this operation ! ");
                        });
                    }}>
                    Save
                  </button>
                ) : (
                  <button>Edit</button>
                )}
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  const confirmed = window.confirm(
                    "Are you sure you want to delete this record ?"
                  );
                  if (confirmed) {
                    axios
                      .delete(
                        "https://localhost:7266/api/PaymEmployees/" +
                          row.pnCompanyId +
                          "," +
                          row.pnBranchId +
                          "," +
                          row.pnEmployeeId
                      )
                      .then((e) => {
                        alert("deleted successfully");
                        window.location.reload();
                      })
                      .catch((e) => console.log(e));
                  } else {
                    alert("delete operation cancelled");
                  }
                }}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JsonTable;
