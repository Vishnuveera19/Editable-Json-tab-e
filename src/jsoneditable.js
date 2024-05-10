import React, { useState } from "react";

const JsonEditTable = ({ jsonData }) => {
  const [editable, setEditable] = useState({});
  // Check if JSON data is provided
  if (!jsonData) {
    return <div>No JSON data provided.</div>;
  }
  jsonData.map((e) => (e.editable = false));
  // Function to check if a value is an object
  const isObject = (value) =>
    typeof value === "object" && value !== null && !Array.isArray(value);

  // Function to render an editable cell
  const renderEditableCell = (value, rowIndex, colIndex) => {
    const isEditable = editable[rowIndex] && editable[rowIndex][colIndex];
    return isEditable ? (
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
      />
    ) : (
      value
    );
  };

  // Function to handle input changes
  const handleInputChange = (e, rowIndex, colIndex) => {
    // Update JSON data with the new value
    const newData = [...jsonData];
    newData[rowIndex][Object.keys(jsonData[rowIndex])[colIndex]] =
      e.target.value;
    // Update the state
    setJsonData(newData);
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
                {renderEditableCell(row[header], rowIndex, colIndex)}
              </td>
            ))}
            <td>
              <button
                onClick={() => {
                  // Toggle the 'editable' state for the corresponding row and column
                  setEditable({
                    ...editable,
                    [rowIndex]: {
                      ...editable[rowIndex],
                      [colIndex]: !editable[rowIndex]?.[colIndex],
                    },
                  });
                }}>
                {editable[rowIndex] && editable[rowIndex]?.[colIndex]
                  ? "Save"
                  : "Edit"}
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  // Handle delete functionality here
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

export default JsonEditTable;
