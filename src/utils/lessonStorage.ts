import type { Lesson } from "../types/lesson.types";

const STORAGE_KEY = "tillie-lessons";

export function getLessons(): Lesson[] {
  const storedLessons = localStorage.getItem(STORAGE_KEY);

  if (!storedLessons) {
    return [];
  }

  try {
    return JSON.parse(storedLessons) as Lesson[];
  } catch (error) {
    console.error("Could not read lessons from localStorage:", error);
    return [];
  }
}

export function saveLessons(lessons: Lesson[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lessons));
}
