"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../helper/supabaseClient.ts";
import LiveProgress from "./LiveProgress.tsx";
import FileUploadModal from "./FileUploadModal.tsx";
import Table from "./Table.tsx";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClose = () => {
    setIsModalOpen(false)
  }
  useEffect(() => {
    const signOut = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) console.log(error.message);
    };
    signOut();
  }, []);

  return (
    <>
      <LiveProgress />
      <FileUploadModal isOpen={isModalOpen} onClose={onClose}  />
       <button className="btn bg-green-500 text-white font-bold" onClick={() => setIsModalOpen(true)}> + Process Log </button>
      <Table />
    </>
  );
};

export default Dashboard;

