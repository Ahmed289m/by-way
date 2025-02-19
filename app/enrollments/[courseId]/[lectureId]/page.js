import { auth } from "@/app/_lib/auth";
import {
  checkAdmin,
  getCourseNameById,
  getLectureMaterialsByLectureId,
  getLectureNameById,
  getStudentIdByEmail,
} from "@/app/_lib/data-services";
import { MaterialList } from "@/app/components/materialList";
import { MaterialProvider } from "@/app/contexts/MaterialContext";

async function LecturePage({ params }) {
  const { courseId, lectureId } = await params;
  const materials = await getLectureMaterialsByLectureId(lectureId);
  const courseName = await getCourseNameById(courseId);
  const LectureName = await getLectureNameById(lectureId);
  const session = await auth();
  const studentId = await getStudentIdByEmail(session?.user?.email);
  const isAdmin = await checkAdmin(studentId.id);
  return (
    <MaterialProvider>
      <div className="min-h-screen bg-gray-50">
        <MaterialList
          courseName={courseName}
          courseId={courseId}
          materials={materials}
          lectureId={lectureId}
          LectureName={LectureName}
          isAdmin={isAdmin}
        />
      </div>
    </MaterialProvider>
  );
}

export default LecturePage;
