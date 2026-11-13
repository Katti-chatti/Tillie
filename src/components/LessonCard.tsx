import type { Lesson } from "../types/lesson.types";
import "./LessonCard.css";
import { sanitizeHtml } from "../utils/sanitizeHtml";
import { Link } from "react-router-dom";

interface LessonCardProps {
  lesson: Lesson;
}

function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Link to={`/lessons/${lesson.id}`} className="lesson-card-link">
      <article className="lesson-card">
        <div className="lesson-card-header">
          <h2>{lesson.title}</h2>
          <span>{new Date(lesson.createdAt).toLocaleDateString("en-GB")}</span>
        </div>

        <div
          className="lesson-card-content"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(lesson.content),
          }}
        />
      </article>
    </Link>
  );
}

export default LessonCard;
