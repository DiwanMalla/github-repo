import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Revalidate the home page cache to fetch fresh data
    revalidatePath("/");

    return NextResponse.json(
      { message: "Cache revalidated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error revalidating cache:", error);
    return NextResponse.json(
      { error: "Failed to revalidate cache" },
      { status: 500 }
    );
  }
}
