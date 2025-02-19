"use client";

import { Menu, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useMaterial } from "../contexts/MaterialContext";
import { useRouter } from "next/navigation";

export function Sidebar({
  materials,
  onAddMaterial,
  onDeleteMaterial,
  isSidebarOpen,
  toggleSidebar,
  courseName,
  LectureName,
  isAdmin,
}) {
  const { selectedMaterial, setSelectedMaterial } = useMaterial();
  const router = useRouter();
  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white text-black shadow-md rounded-md hover:bg-gray-50"
      >
        <Menu size={24} />
      </button>

      <button
        onClick={() => router.back()}
        className="absolute top-4 right-4 p-2 bg-gray-100 text-black shadow-md rounded-md hover:bg-gray-200"
      >
        <ArrowLeft size={24} />
      </button>

      <div
        className={`pt-10 md:pt-5
        fixed top-0 left-0 h-full bg-white text-black border-r
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:w-64 
        ${isSidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"}
        z-40
      `}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-col items-center gap-2">
              <h2 className="text-xl font-bold">{courseName}</h2>
              <h2 className=" ">{LectureName}</h2>
            </div>
            {isAdmin && (
              <button
                onClick={onAddMaterial}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                title="Add new material"
              >
                <Plus size={20} />
              </button>
            )}
          </div>
          <nav>
            {materials.map((material) => (
              <div
                key={material.id}
                className={`
                  group relative flex items-center
                  p-4 rounded-lg mb-2
                  hover:bg-gray-50 transition-colors
                  ${
                    selectedMaterial?.id === material.id
                      ? "bg-gray-100 font-medium"
                      : ""
                  }
                `}
              >
                <button
                  onClick={() => setSelectedMaterial(material)}
                  className="flex-grow text-left"
                >
                  {material.material_title}
                </button>
                {isAdmin && (
                  <div className="absolute right-2  flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteMaterial(material.id);
                      }}
                      className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                      title="Delete material"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
