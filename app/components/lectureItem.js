"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useLectures } from "../contexts/LecturesContext";
import { deleteLecture } from "../_lib/actions";
import Swal from "sweetalert2";
import Link from "next/link";

export default function LectureItem({ lecture, isAdmin }) {
  const { setIsEditing, setFormOpen, setLecture } = useLectures();

  return (
    <Link
      href={`/enrollments/${lecture.course_id}/${lecture.id}`}
      className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
    >
      <div>
        <h3 className="text-2xl font-semibold text-blue-600">
          {lecture.lecture_title}
        </h3>
        <p className="text-gray-600">{lecture.lecture_desc}</p>
      </div>
      {isAdmin && (
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-600"
            onClick={(event) => {
              event.stopPropagation(); // Prevent Link click
              event.preventDefault(); // Prevent navigation

              setIsEditing((e) => !e);
              setFormOpen((f) => !f);
              setLecture(lecture);
            }}
          >
            <Pencil size={20} />
          </button>
          <button
            className="text-red-500 hover:text-red-600"
            onClick={(event) => {
              event.stopPropagation(); // Prevent Link click
              event.preventDefault(); // Prevent navigation

              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel",
                reverseButtons: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteLecture(lecture.id, lecture.course_id)
                    .then(() => {
                      Swal.fire({
                        icon: "success",
                        title: "Lecture Deleted",
                        text: "The lecture has been successfully deleted!",
                      });
                    })
                    .catch(() => {
                      Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "There was an error deleting the lecture.",
                      });
                    });
                }
              });
            }}
          >
            <Trash2 size={20} />
          </button>
        </div>
      )}
    </Link>
  );
}
