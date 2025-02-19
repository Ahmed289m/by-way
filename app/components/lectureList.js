"use client";

import { useLectures } from "../contexts/LecturesContext";
import LectureForm from "./lectureForm";
import LectureItem from "./lectureItem";

export default function LectureList({ lectures, isAdmin, courseId }) {
  const {
    formOpen,
    setFormOpen,
    isAdding,
    isEditing,
    lecture,
    setIsEditing,
    setIsAdding,
  } = useLectures();

  return (
    <div>
      <div className="grid gap-4 mt-6">
        {formOpen ? (
          <LectureForm
            isAdding={isAdding}
            isEditing={isEditing}
            setFormOpen={setFormOpen}
            lecture={lecture}
            setIsAdding={setIsAdding}
            setIsEditing={setIsEditing}
            courseId={courseId}
          />
        ) : null}
        {lectures.length == 0 ? (
          <h1 className="text-gray-900 mx-auto text-2xl opacity-50">
            No Available Lectures For this course !
          </h1>
        ) : (
          lectures.map((lecture) => (
            <LectureItem key={lecture.id} lecture={lecture} isAdmin={isAdmin} />
          ))
        )}
      </div>
    </div>
  );
}
