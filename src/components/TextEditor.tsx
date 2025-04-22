import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "../styles/tiptap.css";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  const buttonStyle = (active: boolean) =>
    `px-2 py-1 text-sm rounded-md border ${
      active
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
    }`;

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    editor.chain().focus().setColor(color).run();
  };

  return (
    <div className="overflow-x-auto whitespace-nowrap flex gap-2 p-2 border-b border-gray-300 bg-gray-50 rounded-t-xl">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={buttonStyle(editor.isActive("bold"))}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={buttonStyle(editor.isActive("italic"))}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={buttonStyle(editor.isActive("strike"))}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={buttonStyle(editor.isActive("code"))}
      >
        Code
      </button>
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className={buttonStyle(false)}
      >
        Clear marks
      </button>
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className={buttonStyle(false)}
      >
        Clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonStyle(editor.isActive("bulletList"))}
      >
        • List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={buttonStyle(editor.isActive("orderedList"))}
      >
        1. List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={buttonStyle(editor.isActive("blockquote"))}
      >
        “ Quote
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={buttonStyle(editor.isActive("codeBlock"))}
      >
        {"</>"}
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={buttonStyle(false)}
      >
        ━━
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={buttonStyle(false)}
      >
        Undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={buttonStyle(false)}
      >
        Redo
      </button>
      <input
        type="color"
        onChange={handleColorChange}
        className="w-10 h-10 border border-gray-300 rounded-md cursor-pointer shrink-0"
        title="Szín kiválasztása"
      />
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  Placeholder.configure({
    placeholder: "Írd ide a megjegyzésedet, státuszt vagy jegyzetet...",
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TextEditor = ({ value, onChange }: TextEditorProps) => {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={value}
      onUpdate={({ editor }) => {
        onChange(editor.getHTML());
      }}
      editorProps={{
        attributes: {
          class:
            "tiptap prose max-w-full p-4 min-h-[300px] focus:outline-none text-gray-800 bg-white rounded",
        },
      }}
    />
  );
};

export default TextEditor;
