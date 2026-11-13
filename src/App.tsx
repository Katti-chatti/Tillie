import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import type { Lesson } from "./types/lesson.types";
import { getLessons, saveLessons } from "./utils/lessonStorage";

import TodayPage from "./pages/TodayPage";
import LessonsPage from "./pages/LessonsPage";
import LessonDetailPage from "./pages/LessonDetailPage";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const savedLessons = getLessons();
    setLessons(savedLessons);
  }, []);

  function handleLessonSubmit(title: string, content: string) {
    const now = new Date().toISOString();

    const newLesson: Lesson = {
      id: crypto.randomUUID(),
      title,
      content,
      createdAt: now,
      updatedAt: now,
    };

    const updatedLessons = [newLesson, ...lessons];

    setLessons(updatedLessons);
    saveLessons(updatedLessons);
  }

  function handleLessonUpdate(id: string, title: string, content: string) {
    const updatedLessons = lessons.map((lesson) =>
      lesson.id === id
        ? {
            ...lesson,
            title,
            content,
            updatedAt: new Date().toISOString(),
          }
        : lesson,
    );

    setLessons(updatedLessons);
    saveLessons(updatedLessons);
  }

  function handleLessonDelete(id: string) {
    const updatedLessons = lessons.filter((lesson) => lesson.id !== id);

    setLessons(updatedLessons);
    saveLessons(updatedLessons);
  }

  return (
    <div className="app-shell">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<TodayPage onLessonSubmit={handleLessonSubmit} />}
        />

        <Route path="/lessons" element={<LessonsPage lessons={lessons} />} />
        <Route
          path="/lessons/:id"
          element={
            <LessonDetailPage
              lessons={lessons}
              onLessonUpdate={handleLessonUpdate}
              onLessonDelete={handleLessonDelete}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
