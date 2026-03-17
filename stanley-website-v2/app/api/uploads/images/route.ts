import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

import { auth } from "@/auth";

const allowedPrefixes = [
  "profile/avatar/",
  "site/og/",
  "projects/",
];

export async function POST(request: Request): Promise<NextResponse> {
  const session = await auth();
  const allowedLogin = process.env.ADMIN_GITHUB_LOGIN?.trim().toLowerCase();
  const login = session?.user?.login?.toLowerCase();

  if (!session || !allowedLogin || login !== allowedLogin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!allowedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
          throw new Error("Upload path is not allowed.");
        }

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        return;
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed." },
      { status: 400 },
    );
  }
}
