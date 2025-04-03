import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="bg-dark-purple min-h-screen" >
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="flex flex-col pl-5  overflow-auto w-full p-2" style={{
            background: "linear-gradient(to bottom left, #3366ff 0%, #99ccff 85%)",
            padding: "1rem", // optional padding for content inside Outlet
          }}>
          <Outlet /> {/* Renders the child route */}
      </div>
    </div>
  );
}
