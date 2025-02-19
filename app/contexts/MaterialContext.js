"use client";
import { createContext, useContext, useState } from "react";

const materialContext = createContext();
export function MaterialProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState({});
  return (
    <materialContext.Provider
      value={{
        isModalOpen,
        isSidebarOpen,
        setIsModalOpen,
        setIsSidebarOpen,
        selectedMaterial,
        setSelectedMaterial,
      }}
    >
      {children}
    </materialContext.Provider>
  );
}

export const useMaterial = () => useContext(materialContext);
