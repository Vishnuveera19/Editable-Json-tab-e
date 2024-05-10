import React from "react";
import { useTable } from "react-table";
import { useState, useEffect } from "react";
const EditableTable = ({ data }) => {
  const columnHeaders = Object.keys(data[0]);
  const [columns, setColumns] = useState([]);
  const [editRowId, setEditRowId] = useState([]);
  useEffect(() => {
    setColumns(
      columnHeaders.map((e) => {
        return { Header: e, accessor: e };
      })
    );
  }, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((e) => (
            <tr {...e.getHeaderGroupProps()}>
              {e.headers.map((c) => (
                <th {...c.getHeaderProps()}>{c.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                <td>
                  <button
                    onClick={() => {
                      setEditRowId(row.id);
                    }}>
                    edit
                  </button>
                </td>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {editRowId === row.id ? (
                        <input type="text" />
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
                {/* <td>
                  <button
                    onClick={() => {
                      setEditRowId(row.id);
                    }}>
                    edit
                  </button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
