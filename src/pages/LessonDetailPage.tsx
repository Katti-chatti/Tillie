import type { Lesson } from "../types/lesson.types";
import { sanitizeHtml } from "../utils/sanitizeHtml";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import LessonForm from "../components/LessonForm";
import "./LessonDetailPage.css";
import FeedbackModal from "../components/FeedbackModal";

interface LessonDetailPageProps {
  lessons: Lesson[];
  onLessonUpdate: (id: string, title: string, content: string) => void;
  onLessonDelete: (id: string) => void;
}

function LessonDetailPage({
  lessons,
  onLessonUpdate,
  onLessonDelete,
}: LessonDetailPageProps) {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const lesson = lessons.find((lesson) => lesson.id === id);

  if (!lesson) {
    return (
      <main className="page-content">
        <h1>Lesson not found</h1>
        <p>We couldn't find the lesson you're looking for.</p>
        <Link to="/lessons">Back to lessons</Link>
      </main>
    );
  }

  const lessonId = lesson.id;

  function handleUpdate(title: string, content: string) {
    if (!lesson) return;

    onLessonUpdate(lesson.id, title, content);
    setIsEditing(false);
  }

  function handleDelete() {
    setShowDeleteModal(true);
  }

  function confirmDelete() {
    onLessonDelete(lessonId);
    navigate("/lessons");
  }

  return (
    <main className="page-content">
      <Link to="/lessons">← Back to lessons</Link>

      {isEditing ? (
        <>
          <h1>Edit lesson</h1>

          <LessonForm
            onSubmit={handleUpdate}
            initialTitle={lesson.title}
            initialContent={lesson.content}
            submitLabel="Update Lesson"
            onCancel={() => setIsEditing(false)}
            resetOnSubmit={false}
          />
        </>
      ) : (
        <article className="individual-lesson">
          <h1>{lesson.title}</h1>

          <div className="lesson-meta">
            <span>
              Created: {new Date(lesson.createdAt).toLocaleDateString("en-GB")}
            </span>

            <span>
              Updated: {new Date(lesson.updatedAt).toLocaleDateString("en-GB")}
            </span>
          </div>

          <div
            className="individual-lesson-content"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(lesson.content),
            }}
          />

          <button
            type="button"
            className="lesson-primary-button"
            onClick={() => setIsEditing(true)}
          >
            Edit Lesson
          </button>

          <button
            type="button"
            className="lesson-delete-button"
            onClick={handleDelete}
          >
            Delete Lesson
          </button>

          {showDeleteModal && (
            <FeedbackModal
              title="Delete this lesson?"
              message="Are you sure you want to delete this lesson?"
              confirmLabel="Delete lesson"
              cancelLabel="Keep lesson"
              onConfirm={confirmDelete}
              onCancel={() => setShowDeleteModal(false)}
            />
          )}
        </article>
      )}
    </main>
  );
}

export default LessonDetailPage;
