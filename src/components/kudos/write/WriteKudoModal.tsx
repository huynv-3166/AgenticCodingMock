"use client";

import { useReducer, useEffect, useRef, useCallback, useState } from "react";
import { Toast } from "@/components/shared/Toast";
import { RecipientSearch } from "./RecipientSearch";
import { BadgeInput } from "./BadgeInput";
import { KudoEditor } from "./KudoEditor";
import { HashtagSelector } from "./HashtagSelector";
import { ImageUploader } from "./ImageUploader";
import { AnonymousToggle } from "./AnonymousToggle";
import type {
  WriteKudoFormState,
  UserSearchResult,
  Hashtag,
  ImageAttachment,
  Kudo,
} from "@/types";
import type { Dictionary } from "@/libs/i18n";

// --- Form reducer ---

type FormAction =
  | { type: "SET_FIELD"; field: string; value: unknown }
  | { type: "SET_ERROR"; field: string; message: string }
  | { type: "CLEAR_ERRORS" }
  | { type: "SET_SUBMITTING"; value: boolean }
  | { type: "RESET" };

const initialState: WriteKudoFormState = {
  recipient: null,
  badgeTitle: "",
  messageContent: "",
  hashtags: [],
  images: [],
  isAnonymous: false,
  anonymousName: "",
  isSubmitting: false,
  errors: {},
  recipientQuery: "",
  uploadingImages: 0,
};

function formReducer(
  state: WriteKudoFormState,
  action: FormAction
): WriteKudoFormState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value, errors: { ...state.errors, [action.field]: "" } };
    case "SET_ERROR":
      return { ...state, errors: { ...state.errors, [action.field]: action.message } };
    case "CLEAR_ERRORS":
      return { ...state, errors: {} };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// --- Component ---

interface WriteKudoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (kudo: Kudo) => void;
  dictionary: Dictionary;
}

export function WriteKudoModal({
  isOpen,
  onClose,
  onSuccess,
  dictionary: d,
}: WriteKudoModalProps) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  // Focus trap + Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    // Prevent body scroll FIRST — before any focus that could cause scroll
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    document.addEventListener("keydown", handleKeyDown);

    // Focus the modal container itself (not a child button) to avoid scroll jump
    setTimeout(() => {
      modalRef.current?.focus({ preventScroll: true });
    }, 50);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Restore body scroll position
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      dispatch({ type: "RESET" });
    }
  }, [isOpen]);

  const validate = useCallback((): boolean => {
    let valid = true;
    dispatch({ type: "CLEAR_ERRORS" });

    if (!state.recipient) {
      dispatch({ type: "SET_ERROR", field: "recipient", message: "Vui lòng chọn người nhận" });
      valid = false;
    }
    if (!state.badgeTitle.trim()) {
      dispatch({ type: "SET_ERROR", field: "badgeTitle", message: "Vui lòng nhập danh hiệu" });
      valid = false;
    }
    // Check if editor has content (strip HTML tags to check raw text)
    const rawText = state.messageContent.replace(/<[^>]*>/g, "").trim();
    if (!rawText) {
      dispatch({ type: "SET_ERROR", field: "messageContent", message: "Vui lòng nhập nội dung" });
      valid = false;
    }
    if (state.hashtags.length === 0) {
      dispatch({ type: "SET_ERROR", field: "hashtags", message: "Vui lòng chọn ít nhất 1 hashtag" });
      valid = false;
    }

    return valid;
  }, [state.recipient, state.badgeTitle, state.messageContent, state.hashtags]);

  const handleSubmit = useCallback(async () => {
    if (state.isSubmitting || state.uploadingImages > 0) return;
    if (!validate()) {
      // Scroll modal to top so user sees validation errors
      modalRef.current?.querySelector("[role=dialog] > div, .overflow-y-auto")?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    dispatch({ type: "SET_SUBMITTING", value: true });

    try {
      const payload = {
        recipient_id: state.recipient!.user_id,
        badge_title: state.badgeTitle,
        message: state.messageContent,
        hashtag_ids: state.hashtags.map((h: Hashtag) => h.id),
        image_urls: state.images.map((img: ImageAttachment) => img.url),
        is_anonymous: state.isAnonymous,
        anonymous_name: state.isAnonymous ? state.anonymousName : undefined,
        mentioned_user_ids: [],
      };
      console.log("[WriteKudo] Submitting payload:", JSON.stringify(payload, null, 2));

      const res = await fetch("/api/kudos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "" })) as { error?: string };
        throw new Error(body.error || d.write_kudo_error);
      }

      const result = await res.json() as { data: Kudo };
      setToast({ message: d.write_kudo_success, type: "success" });
      onSuccess(result.data);
      onClose();
    } catch (e) {
      const message = e instanceof Error ? e.message : d.write_kudo_error;
      setToast({ message, type: "error" });
    } finally {
      dispatch({ type: "SET_SUBMITTING", value: false });
    }
  }, [state, validate, onSuccess, onClose, d]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!isOpen) {
    return toast ? (
      <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />
    ) : null;
  }

  const isSubmitDisabled = state.isSubmitting || state.uploadingImages > 0;

  return (
    <>
      {toast && (
        <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />
      )}

      {/* Overlay + Dialog in one container to prevent scroll issues */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#00101A]/80 animate-[fadeIn_200ms_ease-out] overflow-y-auto outline-none"
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="write-kudo-title"
      >
        <div
          className="relative w-full max-w-[752px] max-h-[100vh] md:max-h-[min(1012px,90vh)] overflow-y-auto bg-[#FFF8E1] rounded-none md:rounded-3xl p-6 md:p-8 lg:p-10 flex flex-col gap-6 md:gap-8 animate-[scaleIn_200ms_ease-out] mx-0 md:mx-4 my-0 md:my-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Title */}
          <h2
            id="write-kudo-title"
            className="text-center font-bold text-2xl md:text-[32px] md:leading-10 text-[#00101A] font-montserrat"
          >
            {d.write_kudo_title}
          </h2>

          {/* Recipient Search */}
          <RecipientSearch
            value={state.recipient}
            onChange={(user) => dispatch({ type: "SET_FIELD", field: "recipient", value: user })}
            error={state.errors.recipient}
            labels={{
              label: d.write_kudo_recipient_label,
              placeholder: d.write_kudo_recipient_placeholder,
              noResults: d.write_kudo_no_results,
            }}
          />

          {/* Badge Input */}
          <BadgeInput
            value={state.badgeTitle}
            onChange={(v) => dispatch({ type: "SET_FIELD", field: "badgeTitle", value: v })}
            error={state.errors.badgeTitle}
            labels={{
              label: d.write_kudo_badge_label,
              placeholder: d.write_kudo_badge_placeholder,
              helper: d.write_kudo_badge_helper,
            }}
          />

          {/* Rich Text Editor with Toolbar */}
          <KudoEditor
            content={state.messageContent}
            onUpdate={(html) => dispatch({ type: "SET_FIELD", field: "messageContent", value: html })}
            error={state.errors.messageContent}
            labels={{
              placeholder: d.write_kudo_editor_placeholder,
              hint: d.write_kudo_editor_hint,
              communityStandards: d.write_kudo_community_standards,
            }}
          />

          {/* Hashtag Selector */}
          <HashtagSelector
            selected={state.hashtags}
            onChange={(hashtags) => dispatch({ type: "SET_FIELD", field: "hashtags", value: hashtags })}
            error={state.errors.hashtags}
            labels={{
              label: d.write_kudo_hashtag_label,
              add: d.write_kudo_hashtag_add,
              max: d.write_kudo_hashtag_max,
            }}
          />

          {/* Image Uploader */}
          <ImageUploader
            images={state.images}
            uploadingCount={state.uploadingImages}
            onAdd={(img) => dispatch({ type: "SET_FIELD", field: "images", value: [...state.images, img] })}
            onRemove={(i) => dispatch({ type: "SET_FIELD", field: "images", value: state.images.filter((_, idx) => idx !== i) })}
            onUploadStart={() => dispatch({ type: "SET_FIELD", field: "uploadingImages", value: state.uploadingImages + 1 })}
            onUploadEnd={() => dispatch({ type: "SET_FIELD", field: "uploadingImages", value: Math.max(0, state.uploadingImages - 1) })}
            onError={(msg) => setToast({ message: msg, type: "error" })}
            labels={{
              label: d.write_kudo_image_label,
              add: d.write_kudo_image_add,
              max: d.write_kudo_image_max,
            }}
          />

          {/* Anonymous Toggle */}
          <AnonymousToggle
            isAnonymous={state.isAnonymous}
            anonymousName={state.anonymousName}
            onToggle={() => dispatch({ type: "SET_FIELD", field: "isAnonymous", value: !state.isAnonymous })}
            onNameChange={(name) => dispatch({ type: "SET_FIELD", field: "anonymousName", value: name })}
            labels={{ label: d.write_kudo_anonymous_label }}
          />

          {/* Action Buttons */}
          <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6">
            {/* Cancel */}
            <button
              ref={firstFocusRef}
              type="button"
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-10 py-4 border border-[#998C5F] rounded bg-[rgba(255,234,158,0.10)] font-bold text-base text-[#00101A] transition-colors hover:bg-[rgba(255,234,158,0.20)]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" stroke="#00101A" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {d.write_kudo_cancel}
            </button>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
              className={`flex-1 flex items-center justify-center gap-2 h-[60px] p-4 rounded-lg font-bold text-[22px] leading-7 transition-colors ${
                isSubmitDisabled
                  ? "bg-[#E5E5E5] text-[#999] cursor-not-allowed"
                  : "bg-[#FFEA9E] text-[#00101A] hover:bg-[#F5DC82] cursor-pointer"
              }`}
            >
              {state.isSubmitting ? (
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>
                  {d.write_kudo_submit}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="#00101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
