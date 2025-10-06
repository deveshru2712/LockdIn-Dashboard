import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    // No token → user is guest, handled in extension
    return Response.json(
      { success: false, error: "No token provided" },
      { status: 401 },
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // make a db call

    return Response.json({ success: true, user: decoded }, { status: 200 });
  } catch (err: any) {
    const errorType =
      err.name === "TokenExpiredError" ? "Token expired" : "Token invalid";
    return Response.json({ success: false, error: errorType }, { status: 401 });
  }
}
