"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { createLecture, editLecture } from "../_lib/actions";
import Swal from "sweetalert2";

export default function LectureForm({
  isAdding,
  isEditing,
  setFormOpen,
  setIsAdding,
  setIsEditing,
  lecture,
  courseId,
}) {
  const [title, setTitle] = useState(isEditing ? lecture.lecture_title : "");
  const [desc, setDesc] = useState(isEditing ? lecture.lecture_desc : "");

  function handleSubmit(e) {
    e.preventDefault();
    if (isAdding) {
      createLecture({
        lecture_title: title,
        lecture_desc: desc,
        course_id: courseId,
      });
      setFormOpen(false);
      setIsAdding(false);
      setIsEditing(false);

      Swal.fire({
        icon: "success",
        title: "Lecture Created",
        text: "The lecture has been successfully added!",
      });
    }

    if (isEditing) {
      editLecture({
        lecture_title: title,
        lecture_desc: desc,
        course_id: lecture.course_id,
        id: lecture.id,
      });
      setFormOpen(false);
      setIsAdding(false);
      setIsEditing(false);

      Swal.fire({
        icon: "success",
        title: "Lecture Updated",
        text: "The lecture has been successfully Updated!",
      });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }} // Start hidden, slightly below
      animate={{ opacity: 1, y: 0, scale: 1 }} // Animate in
      exit={{ opacity: 0, y: 30, scale: 0.95 }} // Animate out
      transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth effect
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-20 z-10"
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.9, opacity: 0 }} // Smaller and hidden
        animate={{ scale: 1, opacity: 1 }} // Expand to full size
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white p-6 rounded-lg shadow-md text-gray-900 w-96 "
      >
        <h2 className="text-xl font-semibold mb-4">
          {isAdding ? "Add New Lecture" : "Edit Lecture"}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={4}
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              {isAdding ? "Add" : "Edit"}
            </button>

            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              onClick={() => {
                setIsAdding(false);
                setIsEditing(false);
                setFormOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
}
