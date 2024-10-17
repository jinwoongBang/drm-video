import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const programId = searchParams.get("programId");

  if (!programId) {
    return NextResponse.json(
      { error: "Missing programId parameter" },
      { status: 400 }
    );
  }

  const playDirectory = path.join(process.cwd(), "src", "mock", "play");

  try {
    const files = fs.readdirSync(playDirectory);
    const jsonFiles = files.filter((file) => file.endsWith(".json"));
    const videoList = jsonFiles.map((file) => {
      const [format, seasonId, episodeNumber] = file.split("-");
      return {
        format,
        seasonId: parseInt(seasonId),
        episodeNumber: parseInt(episodeNumber),
      };
    });

    return NextResponse.json({ payload: { programId, videos: videoList } });
  } catch (error) {
    console.error("Error reading directory:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
