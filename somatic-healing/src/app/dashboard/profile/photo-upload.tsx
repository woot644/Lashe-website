"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

export function PhotoUpload({
  currentUrl,
  practitionerId,
  onUploaded,
}: {
  currentUrl: string | null;
  practitionerId: string;
  onUploaded: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB.");
      return;
    }

    setUploading(true);

    const supabase = createClient();
    if (!supabase) {
      alert("Upload service not available.");
      setUploading(false);
      return;
    }

    const ext = file.name.split(".").pop();
    const fileName = `${practitionerId}.${ext}`;

    const { error } = await supabase.storage
      .from("practitioner-photos")
      .upload(fileName, file, { upsert: true });

    if (error) {
      alert("Upload failed: " + error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("practitioner-photos")
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    // Update practitioner record
    await supabase
      .from("practitioners")
      .update({ photo_url: publicUrl })
      .eq("id", practitionerId);

    setPreview(publicUrl);
    onUploaded(publicUrl);
    setUploading(false);
  }

  async function handleRemove() {
    const supabase = createClient();
    if (!supabase) return;

    await supabase
      .from("practitioners")
      .update({ photo_url: null })
      .eq("id", practitionerId);

    setPreview(null);
    onUploaded("");
  }

  return (
    <div>
      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
        Profile Photo
      </label>
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 rounded-2xl bg-cream border border-[var(--border)] overflow-hidden relative shrink-0">
          {preview ? (
            <>
              <Image
                src={preview}
                alt="Profile photo"
                fill
                className="object-cover"
                sizes="96px"
              />
              <button
                onClick={handleRemove}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                type="button"
              >
                <X size={10} />
              </button>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Upload size={20} className="text-[var(--text-muted)]" />
            </div>
          )}
        </div>

        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:border-aqua hover:text-aqua transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload size={14} /> {preview ? "Change Photo" : "Upload Photo"}
              </>
            )}
          </button>
          <p className="text-[10px] text-[var(--text-muted)] mt-1.5">
            JPG, PNG, or WebP. Max 5MB. Square photos work best.
          </p>
        </div>
      </div>
    </div>
  );
}
