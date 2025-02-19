"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  checkEnroll,
  enroll,
  removeFromMyCourses,
} from "../_lib/data-services";
import Swal from "sweetalert2";
import Link from "next/link";

export default function CourseCard({
  name,
  description,
  level,
  department,
  imageUrl,
  color,
  courseId,
  userId,
  readyToEnter,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Fetch enrollment status when component loads
  useEffect(() => {
    async function checkEnrollment() {
      if (!userId || !courseId) return; // Prevent running if no user
      setIsLoading(true);
      const enrolled = await checkEnroll(userId, courseId);
      setIsEnrolled(!!enrolled);
      setIsLoading(false);
    }

    checkEnrollment();
  }, [userId, courseId]);

  async function handleEnroll() {
    if (!userId) {
      await Swal.fire({
        title: "Not Signed In",
        text: "You need to sign up or log in before enrolling in a course.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sign Up",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/signup"; // Redirect to signup page
        }
      });
      return;
    }

    const confirm = await Swal.fire({
      title: isEnrolled ? "Are you sure?" : "Confirm Enrollment",
      text: isEnrolled
        ? "Do you want to remove this course from your list?"
        : "Do you want to enroll in this course?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: isEnrolled ? "Yes, Remove" : "Yes, Enroll",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    setIsLoading(true);

    let result;
    if (isEnrolled) {
      result = await removeFromMyCourses(userId, courseId);
      if (result) {
        setIsEnrolled(false);
        Swal.fire("Unenrolled!", "You have been removed.", "warning");
      }
    } else {
      result = await enroll(userId, courseId);
      if (result) {
        setIsEnrolled(true);
        Swal.fire("Enrolled!", "You have successfully joined.", "success");
      }
    }

    setIsLoading(false);
  }

  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        {level && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${color}`}
            >
              {level}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${color}`}
            >
              {department}
            </span>
          </div>
        )}

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{description}</p>

        <button
          onClick={readyToEnter ? null : handleEnroll}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={!userId || isLoading}
          className={`
            group/btn relative w-full py-2.5 px-4 rounded-lg 
            text-white font-medium transition-all duration-300 
            transform hover:scale-[1.02] active:scale-[0.98] 
            overflow-hidden
            ${
              !userId
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            }
          `}
        >
          <Link
            href={readyToEnter ? `/enrollments/${courseId}` : "#"}
            className="relative flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="animate-spin mr-2" size={18} />
            ) : !userId ? (
              "Sign In to Enroll"
            ) : isEnrolled && readyToEnter ? (
              "Enter The Course"
            ) : isEnrolled ? (
              "Remove From My Courses"
            ) : (
              "Enroll Now"
            )}
            {!isLoading && userId && (
              <ArrowRight
                className={`absolute right-0 transition-all duration-300 ${
                  isHovered
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                }`}
                size={18}
              />
            )}
          </Link>
        </button>
      </div>
    </div>
  );
}
