import { useState, useEffect, type FormEvent } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import "./LessonForm.css";

interface LessonFormProps {
  onSubmit: (title: string, content: string) => void;
  initialTitle?: string;
  initialContent?: string;
  submitLabel?: string;
  onCancel?: () => void;
  cancelLabel?: string;
  resetOnSubmit?: boolean;
}

function LessonForm({
  onSubmit,
  initialTitle = "",
  initialContent = "<p></p>",
  submitLabel = "Save Lesson",
  onCancel,
  cancelLabel = "Cancel",
  resetOnSubmit = true,
}: LessonFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [characterCount, setCharacterCount] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
        link: {
          openOnClick: false,
        },
      }),
      Underline,
    ],
    content: initialContent,

    editorProps: {
      attributes: {
        id: "lesson-content",
        "aria-label": "Lesson content",
      },
    },

    onUpdate: ({ editor }) => {
      setCharacterCount(editor.getText().length);
    },
  });

  useEffect(() => {
    if (!editor) return;

    setTitle(initialTitle);
    editor.commands.setContent(initialContent);
  }, [editor, initialTitle, initialContent]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !editor || editor.isEmpty) {
      return;
    }

    const content = editor.getHTML();

    onSubmit(title.trim(), content);

    if (resetOnSubmit) {
      setTitle("");
      editor.commands.clearContent();
      setCharacterCount(0);
    }
  }

  function addLink() {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt("Enter the link URL:", previousUrl || "https://");

    if (url === null) return;

    if (url.trim() === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    try {
      const parsedUrl = new URL(url.trim());

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        window.alert("Please enter a valid HTTP or HTTPS URL.");
        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: parsedUrl.href })
        .run();
    } catch {
      window.alert("Please enter a valid URL.");
    }
  }

  if (!editor) return null;

  return (
    <form className="lesson-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="lesson-title">What did you learn today?</label>

        <input
          id="lesson-title"
          type="text"
          placeholder="Give your lesson a title..."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="lesson-content">Write down what you learned...</label>

        <div className="rich-editor">
          <div className="editor-toolbar">
            <button
              type="button"
              className={editor.isActive("bold") ? "is-active" : ""}
              aria-label="Bold"
              title="Bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <strong>B</strong>
            </button>

            <button
              type="button"
              className={editor.isActive("italic") ? "is-active" : ""}
              aria-label="Italic"
              title="Italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <em>I</em>
            </button>

            <button
              type="button"
              className={editor.isActive("underline") ? "is-active" : ""}
              aria-label="Underline"
              title="Underline"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <u>U</u>
            </button>

            <button
              type="button"
              className={editor.isActive("strike") ? "is-active" : ""}
              aria-label="Strikethrough"
              title="Strikethrough"
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <s>S</s>
            </button>

            <span className="toolbar-divider" />

            <button
              type="button"
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
              title="Heading 2"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              H2
            </button>

            <button
              type="button"
              className={
                editor.isActive("heading", { level: 3 }) ? "is-active" : ""
              }
              title="Heading 3"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              H3
            </button>

            <span className="toolbar-divider" />

            <button
              type="button"
              className={editor.isActive("bulletList") ? "is-active" : ""}
              title="Bullet list"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              • List
            </button>

            <button
              type="button"
              className={editor.isActive("orderedList") ? "is-active" : ""}
              title="Numbered list"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              1. List
            </button>

            <span className="toolbar-divider" />

            <button
              type="button"
              className={editor.isActive("link") ? "is-active" : ""}
              title="Insert link"
              onClick={addLink}
            >
              Link
            </button>
          </div>

          <EditorContent editor={editor} className="editor-content" />
        </div>
      </div>

      <div className="form-footer">
        <span>{characterCount} characters</span>

        <div className="form-actions">
          {onCancel && (
            <button type="button" className="cancel-button" onClick={onCancel}>
              {cancelLabel}
            </button>
          )}

          <button type="submit">{submitLabel}</button>
        </div>
      </div>
    </form>
  );
}

export default LessonForm;
