import { auth } from "@/app/_lib/auth";
import {
  getCoursesByLevel,
  getLevelById,
  getStudentIdByEmail,
} from "@/app/_lib/data-services";
import CourseCard from "@/app/components/course_cart";

async function Level({ params }) {
  const courses = await getCoursesByLevel(params.levelId);
  const level = await getLevelById(params.levelId);
  const session = await auth();
  const userId = await getStudentIdByEmail(session?.user?.email);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                {level.cat_name}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Expand your skills with our courses
              </p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {courses ? courses.length : 0} Courses Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Course List */}
      {courses.length == 0 ? (
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-3 mt-10">
          No Courses Available For This Level !
        </h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6 px-10 pt-5">
          {courses.map((course) => {
            return (
              <CourseCard
                name={course.course_name}
                department={course.dep_name}
                level={level.cat_name}
                imageUrl={course.course_img}
                description={course.course_des}
                key={course.id}
                color={level.cat_color}
                courseId={course.id}
                userId={userId?.id || null}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Level;
