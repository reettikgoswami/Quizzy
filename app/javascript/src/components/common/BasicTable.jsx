/* eslint-disable react/jsx-key */
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";

function BasicTable({
  COLUMNS,
  tableData,
  renderAdditionalColumns = () => null,
  renderAdditionalRows = () => null,
  redirectUrl = () => null,
}) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => tableData, []);

  const tableInstance = useTable({
    columns,
    data,
  });

  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    headerGroups,
  } = tableInstance;
  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen flex justify-center font-sans overflow-hidden">
        <div className="w-full lg:w-4/5">
          <div className="bg-white shadow-md rounded my-2">
            <table {...getTableProps()} className="min-w-max w-full table-auto">
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
                  >
                    {headerGroup.headers.map(column => (
                      <th
                        {...column.getHeaderProps()}
                        className="py-3 px-6 text-left"
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                    {renderAdditionalColumns()}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="text-gray-600 text-sm font-light"
              >
                {rows.map(row => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <Link
                        to={redirectUrl(row.original) || "#"}
                        className="block"
                      >
                        {row.cells.map(cell => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="py-3 px-6 text-left whitespace-nowrap"
                            >
                              <div className="flex items-center">
                                <div className="mr-2"></div>
                                <span className="font-sans font-semibold text-base">
                                  {cell.render("Cell")}
                                </span>
                              </div>
                            </td>
                          );
                        })}
                      </Link>
                      {renderAdditionalRows(row.original)}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicTable;
