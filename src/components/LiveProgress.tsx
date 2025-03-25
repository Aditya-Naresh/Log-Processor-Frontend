"use client";
import React, { useState, useEffect } from "react";
import useWebSocket from "@/hooks/useWebSocket";

const WEBSOCKET_URL = "ws://localhost:8002/api/live-stats";

const LiveProgress: React.FC = () => {
  const { messages } = useWebSocket(WEBSOCKET_URL);
  const [fileProgress, setFileProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!messages || messages.length === 0) return;

    setFileProgress((prev) => {
      const updatedProgress = { ...prev };
      messages.forEach(({ file_id, progress }) => {
        if (file_id && progress !== undefined) {
          updatedProgress[file_id] = progress;
        }
      });
      return updatedProgress;
    });
  }, [messages]); // Dependency array ensures it runs only when `messages` updates

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-black mb-2">Live Progress</h2>
      <div className="border p-3 bg-white rounded-md">
        {Object.keys(fileProgress).length === 0 ? (
          <p className="text-black">Waiting for updates...</p>
        ) : (
          <ul>
            {Object.entries(fileProgress).map(([fileId, progress]) => (
              <li key={fileId} className="mb-2">
                <p className="text-sm font-medium text-gray-800 mb-1">
                  File ID: {fileId}
                </p>
                <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="bg-blue-500 text-xs font-medium text-white text-center p-1 leading-none rounded-lg transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  >
                    {progress}%
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LiveProgress;

