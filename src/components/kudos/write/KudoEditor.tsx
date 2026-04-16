"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Mention from "@tiptap/extension-mention";
import { EditorToolbar } from "./EditorToolbar";

interface KudoEditorProps {
  content: string;
  onUpdate: (html: string) => void;
  error?: string;
  labels: {
    placeholder: string;
    hint: string;
    communityStandards: string;
  };
}

const MAX_CHARS = 2000;

export function KudoEditor({ content, onUpdate, error, labels }: KudoEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false, // Not needed for kudos messages
        codeBlock: false,
        code: false,
        horizontalRule: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      Placeholder.configure({
        placeholder: labels.placeholder,
      }),
      CharacterCount.configure({
        limit: MAX_CHARS,
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "text-[#996B00] bg-[rgba(153,140,95,0.15)] rounded px-1 font-bold",
        },
        suggestion: {
          char: "@",
          items: async ({ query }: { query: string }) => {
            if (query.length < 1) return [];
            try {
              const res = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`);
              if (res.ok) {
                const data = (await res.json()) as { data: Array<{ user_id: string; name: string }> };
                return data.data?.slice(0, 5) ?? [];
              }
            } catch { /* ignore */ }
            return [];
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        render: () => {
            let popup: HTMLElement | null = null;
            return {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onStart: (props: any) => {
                popup = document.createElement("div");
                popup.className = "fixed z-[60] bg-white border border-[#998C5F] rounded-lg shadow-lg p-1 max-w-[220px] text-[#00101A]";
                const rect = props.clientRect?.();
                if (rect) {
                  popup.style.top = `${rect.bottom + 4}px`;
                  popup.style.left = `${rect.left}px`;
                }
                document.body.appendChild(popup);
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onUpdate: (props: any) => {
                if (!popup) return;
                popup.innerHTML = props.items
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  .map((item: any) => `<button class="block w-full text-left px-3 py-2 text-sm font-bold text-[#00101A] hover:bg-[rgba(153,140,95,0.15)] rounded cursor-pointer transition-colors" data-id="${item.user_id}">${item.name}</button>`)
                  .join("");
                popup.querySelectorAll("button").forEach((btn: Element, i: number) => {
                  btn.addEventListener("click", () => {
                    props.command({ id: props.items[i].user_id, label: props.items[i].name });
                  });
                });
              },
              onExit: () => {
                popup?.remove();
                popup = null;
              },
            };
          },
        },
      }),
    ],
    content,
    onUpdate: ({ editor: e }) => {
      onUpdate(e.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[168px] px-6 py-4",
      },
    },
  });

  const borderColor = error ? "border-[#CF1322]" : "border-[#998C5F]";
  const charCount = editor?.storage.characterCount?.characters() ?? 0;

  return (
    <div className="flex flex-col gap-1">
      {/* Toolbar + Editor connected unit */}
      <div>
        <EditorToolbar editor={editor} communityStandardsLabel={labels.communityStandards} />
        <div
          className={`w-full h-[200px] min-h-[120px] overflow-y-auto border ${borderColor} rounded-b-lg bg-white font-bold text-base text-[#00101A] transition-colors [&_.tiptap_p.is-editor-empty:first-child::before]:text-[#999] [&_.tiptap_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.tiptap_p.is-editor-empty:first-child::before]:float-left [&_.tiptap_p.is-editor-empty:first-child::before]:h-0 [&_.tiptap_p.is-editor-empty:first-child::before]:pointer-events-none`}
        >
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Hint + character count */}
      <div className="flex justify-between items-center">
        <p className="font-bold text-base leading-6 tracking-[0.5px] text-[#00101A]">
          {labels.hint}
        </p>
        {charCount > 0 && (
          <span className="text-xs text-[#999] font-bold">
            {charCount}/{MAX_CHARS}
          </span>
        )}
      </div>
      {error && <p className="text-sm font-bold text-[#CF1322]">{error}</p>}
    </div>
  );
}
