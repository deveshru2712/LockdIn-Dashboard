import { getSession } from "@/lib/auth/utils";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: session.user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" },
    );

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error("Token generation error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
