"use client";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT_SERVER } from "./servers.tsx";

interface LogData {
  total_logs: number;
  error_logs: number;
  success_rate: number;
}

type LogsResponse = Record<string, LogData>;

const Table = () => {
  const [logs, setLogs] = useState<LogsResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Show 5 rows per page

  const reRender = useSelector((state) => state.log.reRender);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<LogsResponse>(`${API_ENDPOINT_SERVER}/api/stats`);
        console.log("response: ", response);
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchData();
  }, [reRender]);

  // Convert object data to an array and paginate
  const logEntries = logs ? Object.entries(logs) : [];
  const totalPages = Math.ceil(logEntries.length / pageSize);

  const paginatedLogs = logEntries.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <span className="text-gray-900 font-bold">Click on the LogID to get detailed information</span>
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Total Logs</th>
              <th className="px-4 py-2">Error Logs</th>
              <th className="px-4 py-2">Success Rate (%)</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.length > 0 ? (
              paginatedLogs.map(([id, log]) => (
                <tr key={id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2 font-mono text-xs text-gray-800 truncate">{id}</td>
                  <td className="px-4 py-2 text-gray-900">{log.total_logs}</td>
                  <td className="px-4 py-2 text-red-500">{log.error_logs}</td>
                  <td className="px-4 py-2 font-semibold text-green-600">{log.success_rate}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  Loading data...
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center p-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;

