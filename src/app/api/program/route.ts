import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const mockFilePath = path.join(
      process.cwd(),
      "src",
      "mock",
      "programs",
      "15000001.json"
    );
    const fileContents = fs.readFileSync(mockFilePath, "utf8");
    const mockData = JSON.parse(fileContents);

    // Return the mock data as the response
    return NextResponse.json(mockData, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
