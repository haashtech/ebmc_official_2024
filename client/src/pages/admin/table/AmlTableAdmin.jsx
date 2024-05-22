import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  import { useState } from "react";
  import DownloadBtn from "./DownloadBtn";
  import DebouncedInput from "./DebouncedInput";
import { IoSearchCircleOutline } from "react-icons/io5";
//   import { SearchIcon } from "../Icons/Icons";
  
  const AmlTableAdmin = ({users}) => {
    const columnHelper = createColumnHelper();
  
    const columns = [
      columnHelper.accessor("", {
        id: "S.No",
        cell: (info) => <span>{info.row.index + 1}</span>,
        header: "S.No",
      }),
    //   columnHelper.accessor("profile", {
    //     cell: (info) => (
    //       <img
    //         src={info?.getValue()}
    //         alt="..."
    //         className="rounded-full w-10 h-10 object-cover"
    //       />
    //     ),
    //     header: "Profile",
    //   }),
      columnHelper.accessor("companyName", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "ComanyName",
      }),
      columnHelper.accessor("checkLimit", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "CheckLimit",
      }),
      columnHelper.accessor("apiUsage", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "Used Checks",
      }),
      columnHelper.accessor("checkLimit", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "Remaining Checks",
      }),
    //   columnHelper.accessor("progress", {
    //     cell: (info) => <span>{info.getValue()}</span>,
    //     header: "Progress",
    //   }),
    ];
    const [data] = useState(() => [...users]);
    const [globalFilter, setGlobalFilter] = useState("");
  
    const table = useReactTable({
      data,
      columns,
      state: {
        globalFilter,
      },
      getFilteredRowModel: getFilteredRowModel(),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });
  
    return (
      <div className="p-2 max-w-5xl mx-auto text-white fill-gray-400">
        <div className="d-flex justify-between mb-2">
          <div className="w-full d-flex items-center gap-1">
            <IoSearchCircleOutline />
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="p-2 bg-transparent outline-none border-b-2 w-1/5 text-white focus:w-1/3 duration-300 border-indigo-500"
              placeholder="Search all columns..."
            />
          </div>
          <DownloadBtn data={data} fileName={"AML_USERS"} />
        </div>
        <table className="border border-gray-700 w-full text-left">
          <thead className="bg-indigo-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="capitalize px-3.5 py-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`
                  ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
                  `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3.5 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32">
                <td colSpan={12}>No Recoard Found!</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* pagination */}
        <div className="d-flex items-center justify-end mt-2 gap-2">
          <button
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className="p-1 border border-gray-300 px-2 disabled:opacity-30 text-white"
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="p-1 border border-gray-300 px-2 disabled:opacity-30 text-white"
          >
            {">"}
          </button>
  
          <span className="d-flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16 bg-transparent text-white bg-white"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="p-2 bg-transparent text-white"
          >
            {[10, 20, 30, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize} className="text-black">
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };
  
  export default AmlTableAdmin;