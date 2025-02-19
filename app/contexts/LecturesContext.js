"use client";
import { createContext, useContext, useState } from "react";

const lecturesContext = createContext();
export function LecturesProvider({ children }) {
  const [formOpen, setFormOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [lecture, setLecture] = useState({});

  return (
    <lecturesContext.Provider
      value={{
        formOpen,
        setFormOpen,
        isAdding,
        isEditing,
        setIsAdding,
        setIsEditing,
        lecture,
        setLecture,
      }}
    >
      {children}
    </lecturesContext.Provider>
  );
}

export const useLectures = () => useContext(lecturesContext);
