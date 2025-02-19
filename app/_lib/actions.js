"use server";

import { revalidatePath } from "next/cache";
import { auth } from "./auth";
import { supabase } from "./supabase";

export async function createLecture(newLecture) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  const { error } = await supabase.from("lectures").insert([newLecture]);

  if (error) {
    throw new Error("Lecture could not be created");
  }

  revalidatePath(`/enrollments/${newLecture.course_id}`);
}

export async function editLecture(updatedLecture) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  const { error } = await supabase
    .from("lectures")
    .update(updatedLecture)
    .match({ id: updatedLecture.id });

  if (error) {
    throw new Error("Lecture could not be updated");
  }

  // Revalidate path after update if needed
  revalidatePath(`/enrollments/${updatedLecture.course_id}`);
}

export async function deleteLecture(lectureId, courseId) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  const { error } = await supabase
    .from("lectures")
    .delete()
    .match({ id: lectureId });

  if (error) {
    throw new Error("Lecture could not be deleted");
  }

  revalidatePath(`/enrollments/${courseId}`);

  return error;
}

//Lecture Materials

export async function createLectureMaterial(newMaterial, courseId) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  const { error } = await supabase
    .from("lecture_materials")
    .insert([newMaterial]);

  if (error) {
    throw new Error("Material could not be created");
  }

  revalidatePath(`/enrollments/${courseId}/${newMaterial.lecture_id}`);
}

export async function editLectureMaterial(updatedMaterial, courseId) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  const { error } = await supabase
    .from("lecture_materials")
    .update(updatedMaterial)
    .match({ id: updatedMaterial.id });

  if (error) {
    throw new Error("Material could not be updated");
  }

  revalidatePath(`/enrollments/${courseId}/${newMaterial.lecture_id}`);
}

export async function deleteLectureMaterial(materialId, lectureId, courseId) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  const { error } = await supabase
    .from("lecture_materials")
    .delete()
    .match({ id: materialId });

  if (error) {
    throw new Error("Material could not be deleted");
  }

  revalidatePath(`/enrollments/${courseId}/${lectureId}}`);
}
