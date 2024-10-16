import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const programId = searchParams.get("programId");

  if (!programId) {
    return NextResponse.json(
      { error: { message: "Missing programId parameter" } },
      { status: 400 }
    );
  }

  try {
    const mockFilePath = path.join(
      process.cwd(),
      "src",
      "mock",
      "programs",
      `${programId}.json`
    );
    const fileContents = fs.readFileSync(mockFilePath, "utf8");
    const mockData = JSON.parse(fileContents);

    // Return the mock data as the response
    return NextResponse.json(mockData, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: { message: "Program not found" } },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 }
    );
  }
}
