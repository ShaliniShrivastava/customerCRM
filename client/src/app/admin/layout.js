"use client";

import { useEffect } from "react";

export default function AdminLayout({ children }) {
  useEffect(() => {
    document.body.classList.add("admin-mode");

    return () => {
      document.body.classList.remove("admin-mode");
    };
  }, []);

  return (
    <>
      {children}

      <style>{` 
        body.admin-mode::-webkit-scrollbar { 
          width: 10px !important; 
        } 
 
        body.admin-mode::-webkit-scrollbar-track { 
          background: #020203 !important; 
        } 
 
        body.admin-mode::-webkit-scrollbar-thumb { 
          background: #a855f7 !important; 
          border-radius: 10px !important; 
        } 
 
        body.admin-mode::-webkit-scrollbar-thumb:hover { 
          background: #c084fc !important; 
        } 
      `}</style>
    </>
  );
}
