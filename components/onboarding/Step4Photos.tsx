"use client";

import { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Upload, X, Star, Image as ImageIcon, Info, AlertCircle } from "lucide-react";
import { ONBOARDING_LIVE } from "@/lib/onboarding";
import type { OnboardingFormValues } from "@/lib/onboarding/schema";

/**
 * UPLOAD FUNCTION STUB
 * In a future phase when connecting to production storage:
 * This function will take File objects, compress/optimize them,
 * upload them to persistent storage bucket, and return permanent URLs.
 */
export async function uploadProfilePhotosStub(
  files: File[]
): Promise<string[]> {
  // Preview mode stub: returns blob object URLs
  return files.map((file) => URL.createObjectURL(file));
}

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024; // 8 MB

export function Step4Photos() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<OnboardingFormValues>();

  const workPhotos = watch("workPhotos") || [];
  const avatar = watch("avatar") || "";

  const [fileError, setFileError] = useState<string | null>(null);
  const createdUrlsRef = useRef<string[]>([]);
  const workFileInputRef = useRef<HTMLInputElement | null>(null);
  const avatarFileInputRef = useRef<HTMLInputElement | null>(null);

  // Revoke created object URLs on unmount
  useEffect(() => {
    const urls = createdUrlsRef.current;
    return () => {
      urls.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  const handleWorkFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Reset input value so selecting the same file again triggers change
    e.target.value = "";

    // Check count limit
    if (workPhotos.length + files.length > 8) {
      setFileError("You can upload at most 8 photos in total.");
      return;
    }

    // Validate each file
    const newItems: { src: string; caption: string }[] = [];
    for (const file of files) {
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        setFileError(
          `"${file.name}" is not supported. Please upload JPEG, PNG, or WebP images.`
        );
        return;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setFileError(
          `"${file.name}" is larger than 8 MB. Please choose a smaller photo.`
        );
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      createdUrlsRef.current.push(objectUrl);
      newItems.push({ src: objectUrl, caption: "" });
    }

    const updated = [...workPhotos, ...newItems];
    setValue("workPhotos", updated, { shouldValidate: true, shouldDirty: true });
  };

  const handleAvatarFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = "";

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setFileError("Please upload a JPEG, PNG, or WebP photo for your profile image.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError("Profile photo must be smaller than 8 MB.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    createdUrlsRef.current.push(objectUrl);
    setValue("avatar", objectUrl, { shouldValidate: true, shouldDirty: true });
  };

  const handleRemovePhoto = (index: number) => {
    const removed = workPhotos[index];
    if (removed?.src?.startsWith("blob:")) {
      URL.revokeObjectURL(removed.src);
    }
    const updated = workPhotos.filter((_, i) => i !== index);
    setValue("workPhotos", updated, { shouldValidate: true, shouldDirty: true });
  };

  const handleMakeFirst = (index: number) => {
    if (index === 0) return;
    const target = workPhotos[index];
    const remaining = workPhotos.filter((_, i) => i !== index);
    setValue("workPhotos", [target, ...remaining], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleCaptionChange = (index: number, newCaption: string) => {
    const updated = [...workPhotos];
    updated[index] = { ...updated[index], caption: newCaption };
    setValue("workPhotos", updated, { shouldValidate: true, shouldDirty: true });
  };

  const handleRemoveAvatar = () => {
    if (avatar.startsWith("blob:")) {
      URL.revokeObjectURL(avatar);
    }
    setValue("avatar", "", { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="space-y-8">
      {/* Informational banner when not live */}
      {!ONBOARDING_LIVE && (
        <div className="flex items-center gap-2 p-3.5 rounded-[var(--radius-control,0.75rem)] bg-sand-dune/60 border border-border-subtle text-xs text-river-silt">
          <Info className="h-4 w-4 shrink-0 text-laterite" aria-hidden="true" />
          <span>Photos are only previewed for now. Nothing is uploaded to public servers.</span>
        </div>
      )}

      {/* 1. Main Work Photos Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-deep-slate flex items-center gap-1.5">
            <ImageIcon className="h-4 w-4 text-laterite shrink-0" aria-hidden="true" />
            <span>Photos of your work</span>
            <span className="text-laterite">*</span>
          </h3>
          <p className="text-xs text-river-silt mt-0.5">
            Add 1 to 8 photos of jobs you have completed. The first photo will be your main cover photo.
          </p>
        </div>

        {/* Big File Upload Button / Dropzone */}
        {workPhotos.length < 8 && (
          <div>
            <input
              type="file"
              ref={workFileInputRef}
              id="work-photos-input"
              multiple
              accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
              onChange={handleWorkFilesSelected}
              className="sr-only"
            />
            <label
              htmlFor="work-photos-input"
              className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border-subtle hover:border-laterite rounded-[var(--radius-card,1.5rem)] bg-warm-bone text-center cursor-pointer transition-colors min-h-[120px] group"
            >
              <div className="h-12 w-12 rounded-full bg-sand-dune/60 group-hover:bg-laterite-light flex items-center justify-center text-laterite transition-colors mb-2">
                <Upload className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-sm font-semibold text-deep-slate group-hover:text-laterite">
                Add photos of your work
              </span>
              <span className="text-xs text-river-silt mt-1">
                JPEG, PNG, or WebP · Max 8 MB per photo · {8 - workPhotos.length} slots remaining
              </span>
            </label>
          </div>
        )}

        {/* Global File Error Message */}
        {fileError && (
          <div
            role="alert"
            className="flex items-center gap-2 p-3 rounded-[var(--radius-control,0.75rem)] bg-laterite-light text-xs font-medium text-laterite-dark border border-laterite/30"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-laterite" aria-hidden="true" />
            <span>{fileError}</span>
          </div>
        )}

        {/* Schema Validation Error */}
        {errors.workPhotos && (
          <p
            id="workPhotos-error"
            className="text-xs font-medium text-laterite pt-0.5"
            role="alert"
          >
            {errors.workPhotos.message}
          </p>
        )}

        {/* Thumbnails List */}
        {workPhotos.length > 0 && (
          <div className="space-y-3 pt-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-river-silt block">
              Uploaded photos ({workPhotos.length} of 8)
            </span>

            <div className="space-y-3">
              {workPhotos.map((photo, index) => {
                const isFirst = index === 0;

                return (
                  <div
                    key={photo.src + index}
                    className="flex flex-col sm:flex-row gap-3 p-3.5 rounded-[var(--radius-control,0.75rem)] border border-border-subtle bg-warm-bone items-start sm:items-center"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-20 w-24 shrink-0 rounded-[calc(var(--radius-control,0.75rem)-4px)] overflow-hidden border border-border-subtle bg-sand-dune">
                      {/* Using standard img for object URLs */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.src}
                        alt={`Work photo ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      {isFirst && (
                        <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-[2px] bg-laterite text-white text-[10px] font-semibold flex items-center gap-0.5">
                          <Star className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
                          <span>Cover</span>
                        </div>
                      )}
                    </div>

                    {/* Caption Input */}
                    <div className="flex-1 w-full space-y-1">
                      <label
                        htmlFor={`caption-${index}`}
                        className="sr-only"
                      >
                        Photo {index + 1} caption
                      </label>
                      <input
                        type="text"
                        id={`caption-${index}`}
                        maxLength={80}
                        value={photo.caption || ""}
                        onChange={(e) =>
                          handleCaptionChange(index, e.target.value)
                        }
                        placeholder="Optional short caption (e.g. Serekunda wiring project)"
                        className="w-full min-h-[44px] px-3 py-2 text-xs rounded-[var(--radius-control,0.75rem)] bg-warm-bone border border-border-subtle text-deep-slate placeholder:text-river-silt/60 focus:outline-none focus:border-laterite focus:ring-1 focus:ring-laterite"
                      />
                    </div>

                    {/* Actions: Make First & Remove */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {!isFirst && (
                        <button
                          type="button"
                          onClick={() => handleMakeFirst(index)}
                          className="min-h-[44px] inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-deep-slate border border-border-subtle rounded-[var(--radius-control,0.75rem)] hover:bg-sand-dune/60 transition-colors cursor-pointer"
                          aria-label={`Make photo ${index + 1} the cover photo`}
                        >
                          <Star className="h-3.5 w-3.5 text-laterite" aria-hidden="true" />
                          <span>Make first</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(index)}
                        className="min-h-[44px] inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-laterite border border-laterite/20 rounded-[var(--radius-control,0.75rem)] hover:bg-laterite-light/40 transition-colors cursor-pointer"
                        aria-label={`Remove photo ${index + 1}`}
                      >
                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. Optional Profile Photo or Logo */}
      <div className="space-y-3 pt-4 border-t border-border-subtle">
        <div>
          <h3 className="text-sm font-semibold text-deep-slate">
            Profile photo or logo{" "}
            <span className="text-xs font-normal text-river-silt">(optional)</span>
          </h3>
          <p className="text-xs text-river-silt mt-0.5">
            A clear picture of you or your business brand helps customers recognise you.
          </p>
        </div>

        {avatar ? (
          <div className="flex items-center gap-4 p-3.5 rounded-[var(--radius-control,0.75rem)] border border-border-subtle bg-warm-bone">
            <div className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden border border-border-subtle bg-sand-dune">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatar}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-deep-slate">Profile photo added</p>
              <p className="text-[11px] text-river-silt">Will show next to your name</p>
            </div>
            <button
              type="button"
              onClick={handleRemoveAvatar}
              className="min-h-[44px] inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-laterite border border-laterite/20 rounded-[var(--radius-control,0.75rem)] hover:bg-laterite-light/40 transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Remove</span>
            </button>
          </div>
        ) : (
          <div>
            <input
              type="file"
              ref={avatarFileInputRef}
              id="avatar-photo-input"
              accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
              onChange={handleAvatarFileSelected}
              className="sr-only"
            />
            <label
              htmlFor="avatar-photo-input"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 px-4 py-2.5 rounded-[var(--radius-control,0.75rem)] border border-border-subtle bg-warm-bone hover:border-laterite hover:text-laterite text-xs font-semibold text-deep-slate transition-colors cursor-pointer"
            >
              <Upload className="h-4 w-4" aria-hidden="true" />
              <span>Choose profile photo or logo</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
