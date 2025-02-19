import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";

export async function getCoursesByLevel(id) {
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("level_id", id);
  return courses;
}

export async function getLevelById(id) {
  const { data: level, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();
  return level;
}

export async function getCategories() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");

  return categories;
}

export async function getStudent(email) {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

export async function createStudent(newStudent) {
  const { data, error } = await supabase.from("students").insert([newStudent]);

  if (error) {
    console.error(error);
    throw new Error("Student could not be created");
  }

  return data;
}

export async function enroll(userId, courseId) {
  if (!userId || !courseId) {
    console.error("❌ Missing userId or courseId");
    alert("Error: Missing user or course information.");
    return null;
  }

  const { data, error } = await supabase
    .from("enrollments")
    .insert([{ student_id: userId, course_id: courseId }])
    .select(); // Ensure we get back the inserted data

  if (error) {
    console.error("❌ Enrollment Error:", error.message);
    alert(`Enrollment Failed: ${error.message}`);
    return null;
  }

  return data;
}

export async function getStudentIdByEmail(email) {
  if (!email) {
    console.warn("getStudentIdByEmail: Email is missing or invalid.");
    return null; // Stop execution if no email
  }

  const { data, error } = await supabase
    .from("students")
    .select("id")
    .eq("email", email)
    .maybeSingle(); // Prevent errors if no match

  if (error) {
    console.error("Error fetching student:", JSON.stringify(error, null, 2));
    return null;
  }

  return data;
}

export async function checkEnroll(userId, courseId) {
  const { data, error } = await supabase
    .from("enrollments")
    .select("id")
    .eq("student_id", userId)
    .eq("course_id", courseId)
    .single();

  return data;
}

export async function getStudentEnrollments(studentId) {
  const { data: enrollments, error } = await supabase
    .from("enrollments")
    .select("course_id")
    .eq("student_id", studentId); // Replace studentId with the actual student ID

  if (error) {
    console.error("Error fetching enrollments:", error);
  } else {
    return enrollments.map((enrollment) => enrollment.course_id);
  }
}

export async function getEnrolledCoursesByIds(courseIds) {
  if (!courseIds || courseIds.length === 0) {
    return null;
  }

  const { data, error } = await supabase
    .from("courses") // Assuming your table name is "courses"
    .select("*") // Adjust fields if needed
    .in("id", courseIds); // Fetch where 'id' is in the given list

  if (error) {
    console.error("Error fetching courses:", error);
    return null;
  }

  return data; // Returns an array of course objects
}

export async function getLecturesByCourseId(course_id) {
  const { data, error } = await supabase
    .from("lectures")
    .select("*")
    .eq("course_id", course_id);

  if (error) throw error;
  return data;
}

export async function checkAdmin(studentId) {
  const { data: isAdmin, error } = await supabase
    .from("students")
    .select("isAdmin")
    .eq("id", studentId)
    .single();

  return isAdmin.isAdmin;
}

//Lecture Material

export async function getLectureMaterialsByLectureId(lectureId) {
  if (!lectureId) {
    return null;
  }

  const { data, error } = await supabase
    .from("lecture_materials")
    .select("*")
    .eq("lecture_id", lectureId);

  if (error) {
    console.error("Error fetching lecture materials:", error);
    return null;
  }

  return data;
}

export async function getCourseNameById(courseId) {
  const { data, error } = await supabase
    .from("courses")
    .select("course_name")
    .eq("id", courseId)
    .single();

  if (error) {
    console.error("Error fetching course:", error);
    return "Course not found";
  }

  return data.course_name || "Course not found";
}

export async function getLectureNameById(lectureId) {
  const { data, error } = await supabase
    .from("lectures")
    .select("lecture_title")
    .eq("id", lectureId)
    .single();

  if (error) {
    console.error("Error fetching course:", error);
    return "lecture not found";
  }

  return data.lecture_title || "Lecture not found";
}
