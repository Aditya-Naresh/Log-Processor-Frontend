"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT_SERVER } from "./servers.tsx"; // Update with your actual API config

interface LogEntry {
  id: number;
  file_id: string;
  timestamp: string;
  level: string;
  message: string;
  payload: string;
  created_at: string;
}

const LogDetails = ({ file_id }: { file_id: string }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file_id) return;

    const fetchLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<LogEntry[]>(`${API_ENDPOINT_SERVER}/api/stats/${file_id}`);
        setLogs(response.data);
      } catch (err) {
        setError("Failed to fetch log details.");
        console.error("Error fetching log details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [file_id]);

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Log Details for ID: <span className="font-bold">{file_id}</span>
        </h2>

        {loading ? (
          <p className="text-center text-gray-700">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-700 font-semibold">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Level</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Payload</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr
                    key={log.id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-300`}
                  >
                    <td className="px-4 py-3 text-black">{log.id}</td>
                    <td className="px-4 py-3 text-black">{new Date(log.timestamp).toLocaleString()}</td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        log.level === "ERROR" ? "text-red-700" : "text-green-700"
                      }`}
                    >
                      {log.level}
                    </td>
                    <td className="px-4 py-3 text-black">{log.message}</td>
                    <td className="px-4 py-3 text-black">{log.payload || "{}"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogDetails;

