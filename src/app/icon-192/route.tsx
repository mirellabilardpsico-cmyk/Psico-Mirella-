import { ImageResponse } from "next/og";
import { renderIconMark } from "@/lib/icon-mark";

export async function GET() {
  return new ImageResponse(renderIconMark(192), { width: 192, height: 192 });
}
