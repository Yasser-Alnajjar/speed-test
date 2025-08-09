import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Read the entire request body to simulate actual upload processing
    const data = await request.arrayBuffer();

    // Return success response
    return NextResponse.json({
      success: true,
      bytesReceived: data.byteLength,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process upload" },
      { status: 500 }
    );
  }
}
