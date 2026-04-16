import { createClient } from "@/libs/supabase/client";

const BUCKET_NAME = "kudo-images";

/**
 * Upload a kudo image to Supabase Storage.
 * Files stored at: kudo-images/{userId}/{timestamp}-{filename}
 * Returns the public URL of the uploaded image.
 */
export async function uploadKudoImage(
  file: File,
  userId: string
): Promise<{ url: string }> {
  const supabase = createClient();
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = `${userId}/${timestamp}-${safeName}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return { url: urlData.publicUrl };
}
