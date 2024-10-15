import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");
  const episodeNumber = searchParams.get("episodeNumber");

  if (!format || !episodeNumber) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  if (format !== "HLS" && format !== "DASH") {
    return NextResponse.json({ error: "Invalid format" }, { status: 400 });
  }

  const fileName = `${format}-1500001-${episodeNumber}.json`;
  const filePath = path.join(process.cwd(), "src", "mock", "play", fileName);

  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(fileContents);
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
