import { auth } from "@/app/_lib/auth";
import {
  getEnrolledCoursesByIds,
  getLevelById,
  getStudentEnrollments,
  getStudentIdByEmail,
} from "@/app/_lib/data-services";
import CourseCard from "@/app/components/course_cart";
import Link from "next/link";

async function Level({ params }) {
  const level = await getLevelById(params.levelId);
  const session = await auth();
  const userId = await getStudentIdByEmail(session?.user?.email);
  const coursesId = await getStudentEnrollments(userId?.id);
  const courses = (await getEnrolledCoursesByIds(coursesId)) || []; // Ensure courses is always an array

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                My Courses
              </h1>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {courses.length > 0
                  ? `${courses.length} Courses Available`
                  : "No Courses Enrolled"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6 px-10 pt-5">
          {courses.map((course) => (
            <CourseCard
              name={course.course_name}
              imageUrl={course.course_img}
              description={course.course_des}
              key={course.id}
              courseId={course.id}
              userId={userId?.id || null}
              readyToEnter={true}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            You haven’t enrolled in any courses yet.
          </h2>
        </div>
      )}
    </div>
  );
}

export default Level;
