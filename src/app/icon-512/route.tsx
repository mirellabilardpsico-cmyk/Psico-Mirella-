import { ImageResponse } from "next/og";
import { renderIconMark } from "@/lib/icon-mark";

export async function GET() {
  return new ImageResponse(renderIconMark(512), { width: 512, height: 512 });
}
