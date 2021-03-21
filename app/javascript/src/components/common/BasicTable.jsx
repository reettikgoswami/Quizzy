/* eslint-disable react/jsx-key */
import React, { useMemo } from "react";
import { useTable } from "react-table";

function BasicTable(props) {
  const { COLUMNS, tableData } = props;
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
      <div className="min-w-screen flex justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full lg:w-4/5">
          <div className="bg-white shadow-md rounded my-6">
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
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
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
                      {/* <td class="py-3 px-6 text-center">
                        <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                          Pending
                        </span>
                      </td> */}
                      <td className="py-3 px-6 text-center">
                        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                          Completed
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-150">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-150">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
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
