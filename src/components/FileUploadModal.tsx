"use client";
import React, { useState } from "react";
import axios from "axios"
import {API_ENDPOINT_SERVER} from './servers.tsx'
import {useDispatch} from 'react-redux'
import { triggerReRender } from "../store/slices/logSlice.tsx";

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch()
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    console.log("File ready for upload:", file);
    const response = await axios.post(`${API_ENDPOINT_SERVER}/api/upload-logs`, formData)
    console.log(response)
    dispatch(triggerReRender())
    onClose()
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-300">
      <h2 className="text-xl font-semibold mb-4 text-black">Upload File</h2>
      <input 
        type="file" 
        onChange={handleFileChange} 
        className="mb-4 w-full border p-2 text-gray-600"
      />
      <div className="flex justify-end space-x-2">
        <button 
          onClick={onClose} 
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
        <button 
          onClick={handleUpload} 
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default FileUploadModal;

