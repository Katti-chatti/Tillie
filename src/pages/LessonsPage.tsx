import type { Lesson } from "../types/lesson.types";
import LessonCard from "../components/LessonCard";
import "./LessonsPage.css";
import { useState } from "react";

interface LessonsPageProps {
  lessons: Lesson[];
}

function LessonsPage({ lessons }: LessonsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const lessonsPerPage = 6;

  const filteredLessons = lessons.filter((lesson) => {
    const query = searchQuery.toLowerCase();

    const title = lesson.title.toLowerCase();

    const content =
      new DOMParser()
        .parseFromString(lesson.content, "text/html")
        .body.textContent?.toLowerCase() ?? "";

    return title.includes(query) || content.includes(query);
  });

  const sortedLessons = [...filteredLessons].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const totalPages = Math.ceil(sortedLessons.length / lessonsPerPage);

  const startIndex = (currentPage - 1) * lessonsPerPage;

  const paginatedLessons = sortedLessons.slice(
    startIndex,
    startIndex + lessonsPerPage,
  );

  return (
    <main className="page-content">
      <h1>My Lessons</h1>
      <p>A collection of things I've learned.</p>

      <div className="lessons-search">
        <input
          type="search"
          placeholder="Search for a lesson..."
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setCurrentPage(1);
          }}
          aria-label="Search lessons"
        />
      </div>

      <section className="lessons-list">
        {filteredLessons.length > 0 ? (
          paginatedLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))
        ) : (
          <p>
            {searchQuery
              ? "No lessons found. Try another search."
              : "There are no lessons saved yet."}
          </p>
        )}
      </section>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}

export default LessonsPage;
