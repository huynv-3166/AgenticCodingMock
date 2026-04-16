import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "@/libs/validations/kudos";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate file type
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "File must be JPEG, PNG, GIF, or WebP" },
      { status: 400 }
    );
  }

  // Validate file size
  if (file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json(
      { error: "File must be under 5MB" },
      { status: 400 }
    );
  }

  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = `${user.id}/${timestamp}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from("kudo-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: `Upload failed: ${uploadError.message}` },
      { status: 500 }
    );
  }

  const { data: urlData } = supabase.storage
    .from("kudo-images")
    .getPublicUrl(filePath);

  return NextResponse.json({
    url: urlData.publicUrl,
    thumbnail_url: urlData.publicUrl, // Same URL — thumbnail generation out of scope
  }, { status: 201 });
}
