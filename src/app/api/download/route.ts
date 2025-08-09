import { NextResponse } from "next/server";

export async function GET() {
  // Create a 10MB buffer filled with random data
  const bufferSize = 10 * 1024 * 1024; // 10MB
  const buffer = Buffer.alloc(bufferSize);

  // Fill with some data (not completely random to avoid compression)
  for (let i = 0; i < bufferSize; i++) {
    buffer[i] = i % 256;
  }

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Length": bufferSize.toString(),
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "Content-Encoding": "identity",
    },
  });
}
