import { auth } from "@/app/_lib/auth";
import {
  checkAdmin,
  getLecturesByCourseId,
  getStudentIdByEmail,
} from "@/app/_lib/data-services";
import LectureList from "@/app/components/lectureList";
import LecturesHeader from "@/app/components/lecturesHeader";
import { LecturesProvider } from "@/app/contexts/LecturesContext";

export default async function Lectures({ params }) {
  const { courseId } = await params;
  const lectures = await getLecturesByCourseId(courseId);
  const session = await auth();
  const studentId = await getStudentIdByEmail(session?.user?.email);
  const isAdmin = await checkAdmin(studentId.id);

  return (
    <LecturesProvider>
      <div className="w-full mx-auto p-6 bg-white min-h-screen">
        <LecturesHeader isAdmin={isAdmin} />
        <LectureList
          isAdmin={isAdmin}
          lectures={lectures}
          courseId={courseId}
        />
      </div>
    </LecturesProvider>
  );
}
