import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const episodeNumber = searchParams.get("episodeNumber");
  const seasonId = searchParams.get("seasonId");

  if (!episodeNumber || !seasonId) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  const hlsFileName = `HLS-${seasonId}-${episodeNumber}.json`;
  const dashFileName = `DASH-${seasonId}-${episodeNumber}.json`;
  const hlsFilePath = path.join(
    process.cwd(),
    "src",
    "mock",
    "play",
    hlsFileName
  );
  const dashFilePath = path.join(
    process.cwd(),
    "src",
    "mock",
    "play",
    dashFileName
  );

  try {
    const hlsFileContents = fs.readFileSync(hlsFilePath, "utf8");
    const hlsJsonData = JSON.parse(hlsFileContents).payload;

    const dashFileContents = fs.readFileSync(dashFilePath, "utf8");
    const dashJsonData = JSON.parse(dashFileContents).payload;

    return NextResponse.json(
      {
        payload: {
          hls: hlsJsonData,
          dash: dashJsonData,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
