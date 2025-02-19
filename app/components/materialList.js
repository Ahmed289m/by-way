"use client";

import { Sidebar } from "./materialSidebar";
import { Content } from "./contentMaterial";
import { MaterialModal } from "./materialModal";
import { useMaterial } from "../contexts/MaterialContext";
import { createLectureMaterial, deleteLectureMaterial } from "../_lib/actions";

export function MaterialList({
  materials,
  courseId,
  lectureId,
  courseName,
  LectureName,
  isAdmin,
}) {
  const {
    isModalOpen,
    isSidebarOpen,

    setIsModalOpen,
    setIsSidebarOpen,
  } = useMaterial();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const openAddModal = () => {
    setIsModalOpen(true);
  };

  function handleAddMaterial(data) {
    if (data.type == "text")
      createLectureMaterial(
        {
          lecture_id: lectureId,
          material_title: data.name,
          material_text: data.content,
        },
        courseId
      );
    else if (data.type == "video") {
      createLectureMaterial(
        {
          lecture_id: lectureId,
          material_title: data.name,
          material_video: data.content,
        },
        courseId
      );
    } else if (data.type == "pdf") {
      createLectureMaterial(
        {
          lecture_id: lectureId,
          material_title: data.name,
          material_pdf: data.content,
        },
        courseId
      );
    }
  }

  function handleMaterialDelete(id) {
    deleteLectureMaterial(id, lectureId, courseId);
  }

  return (
    <>
      <Sidebar
        materials={materials}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onAddMaterial={openAddModal}
        onDeleteMaterial={handleMaterialDelete}
        courseName={courseName}
        LectureName={LectureName}
        isAdmin={isAdmin}
      />

      <div
        className={`
        min-h-screen
        transition-all duration-300
        lg:ml-64
        ${isSidebarOpen ? "ml-64" : "ml-0"}
      `}
      >
        <Content material={materials} />
      </div>

      <MaterialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddMaterial}
        title={"Add New Material"}
      />
    </>
  );
}
