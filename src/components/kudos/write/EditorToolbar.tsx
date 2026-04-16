"use client";

import type { Editor } from "@tiptap/react";

interface EditorToolbarProps {
  editor: Editor | null;
  communityStandardsLabel: string;
}

interface ToolbarBtnProps {
  active?: boolean;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
  children: React.ReactNode;
}

function ToolbarBtn({ active, onClick, ariaLabel, className = "", children }: ToolbarBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={active}
      className={`h-10 px-4 py-2.5 border border-[#998C5F] flex items-center justify-center transition-colors ${
        active ? "bg-[rgba(153,140,95,0.2)]" : "bg-transparent hover:bg-[rgba(153,140,95,0.1)]"
      } focus:outline-2 focus:outline-[#998C5F] focus:-outline-offset-2 ${className}`}
    >
      {children}
    </button>
  );
}

export function EditorToolbar({ editor, communityStandardsLabel }: EditorToolbarProps) {
  if (!editor) return null;

  return (
    <div className="flex h-10 items-center">
      {/* Bold */}
      <ToolbarBtn
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        ariaLabel="Bold"
        className="rounded-tl-lg"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6V4zM6 12h9a4 4 0 014 4 4 4 0 01-4 4H6v-8z" stroke="#00101A" strokeWidth="2" />
        </svg>
      </ToolbarBtn>

      {/* Italic */}
      <ToolbarBtn
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        ariaLabel="Italic"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M19 4h-9M14 20H5M15 4L9 20" stroke="#00101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </ToolbarBtn>

      {/* Strikethrough */}
      <ToolbarBtn
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        ariaLabel="Strikethrough"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M16 4H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6M4 12h16" stroke="#00101A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </ToolbarBtn>

      {/* Numbered List */}
      <ToolbarBtn
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        ariaLabel="Numbered List"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M10 6h11M10 12h11M10 18h11M3 5v2M3 10v4M3 18v2M5 18H3M5 5H3" stroke="#00101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </ToolbarBtn>

      {/* Link */}
      <ToolbarBtn
        active={editor.isActive("link")}
        onClick={() => {
          const url = window.prompt("URL:");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        ariaLabel="Insert Link"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#00101A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </ToolbarBtn>

      {/* Quote */}
      <ToolbarBtn
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        ariaLabel="Block Quote"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" stroke="#00101A" strokeWidth="2" />
        </svg>
      </ToolbarBtn>

      {/* Community Standards — special link button */}
      <button
        type="button"
        onClick={() => window.open("/community-standards", "_blank")}
        className="flex-1 h-10 px-4 py-2.5 border border-[#998C5F] rounded-tr-lg text-right text-[#E46060] font-bold text-base hover:bg-[rgba(153,140,95,0.1)] transition-colors focus:outline-2 focus:outline-[#998C5F] focus:-outline-offset-2"
      >
        {communityStandardsLabel}
      </button>
    </div>
  );
}
