import LessonForm from "../components/LessonForm";
import { useState } from "react";
import FeedbackModal from "../components/FeedbackModal";

interface TodayPageProps {
  onLessonSubmit: (title: string, content: string) => void;
}

function TodayPage({ onLessonSubmit }: TodayPageProps) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function handleSubmit(title: string, content: string) {
    onLessonSubmit(title, content);
    setShowSuccessModal(true);
  }

  return (
    <main className="page-content">
      <div className="page-heading">
        <h1>Today I Learned</h1>
        <h2 className="page-tagline">- Lessons in Everyday</h2>
      </div>

      <p>Every day is an opportunity to learn something new.</p>

      <LessonForm onSubmit={handleSubmit} />

      {showSuccessModal && (
        <FeedbackModal
          title="Lesson saved!"
          message="Your new lesson has been added to your collection. Keep learning something new every day!"
          confirmLabel="Lovely!"
          onConfirm={() => setShowSuccessModal(false)}
        />
      )}
    </main>
  );
}

export default TodayPage;
