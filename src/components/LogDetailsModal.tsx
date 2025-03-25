"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT_SERVER } from "../config"; // Update with your actual API config

interface LogEntry {
  id: number;
  file_id: string;
  timestamp: string;
  level: string;
  message: string;
  payload: string;
  created_at: string;
}

interface LogDetailsModalProps {
  log_id: string | null; // ID of the log to fetch
  isOpen: boolean;
  onClose: () => void;
}

const LogDetailsModal: React.FC<LogDetailsModalProps> = ({ log_id, isOpen, onClose }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!log_id || !isOpen) return;

    const fetchLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<LogEntry[]>(`${API_ENDPOINT_SERVER}/api/logs/${log_id}`);
        setLogs(response.data);
      } catch (err) {
        setError("Failed to fetch log details.");
        console.error("Error fetching log details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [log_id, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Log Details</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Timestamp</th>
                  <th className="px-4 py-2">Level</th>
                  <th className="px-4 py-2">Message</th>
                  <th className="px-4 py-2">Payload</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{log.id}</td>
                    <td className="px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
                    <td
                      className={`px-4 py-2 font-semibold ${
                        log.level === "ERROR" ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {log.level}
                    </td>
                    <td className="px-4 py-2">{log.message}</td>
                    <td className="px-4 py-2 text-gray-600">{log.payload || "{}"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogDetailsModal;

