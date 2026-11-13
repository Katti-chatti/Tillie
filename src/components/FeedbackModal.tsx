import "./FeedbackModal.css";

interface FeedbackModalProps {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

function FeedbackModal({
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: FeedbackModalProps) {
  return (
    <div className="modal-overlay">
      <section
        className="feedback-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-message"
      >
        <h2 id="modal-title">{title}</h2>

        <p id="modal-message">{message}</p>

        <div className="modal-actions">
          {cancelLabel && onCancel && (
            <button
              type="button"
              className="modal-cancel-button"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
          )}

          <button
            type="button"
            className="modal-confirm-button"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}

export default FeedbackModal;
