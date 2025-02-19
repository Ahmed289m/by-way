"use client";
import { useLectures } from "../contexts/LecturesContext";

function LecturesHeader({ isAdmin }) {
  const { formOpen, setFormOpen, setIsAdding, setIsEditing } = useLectures();
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 pl-8">Lectures</h1>

      {isAdmin && (
        <button
          className="bg-blue-500 px-5 py-3 rounded-md"
          onClick={() => {
            setFormOpen((f) => !f);
            setIsAdding((f) => !f);
            setIsEditing((f) => false);
          }}
        >
          {formOpen ? "Cancel" : "Add New Lecture"}
        </button>
      )}
    </div>
  );
}

export default LecturesHeader;
