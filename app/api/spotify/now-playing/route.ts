import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

export const revalidate = 0;

export async function GET() {
  // Only enable if env vars are configured
  if (
    !process.env.SPOTIFY_CLIENT_ID ||
    !process.env.SPOTIFY_CLIENT_SECRET ||
    !process.env.SPOTIFY_REFRESH_TOKEN
  ) {
    return NextResponse.json({ data: null });
  }

  const data = await getNowPlaying();
  return NextResponse.json({ data });
}
