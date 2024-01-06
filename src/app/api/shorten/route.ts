import { MaskUrlUseCase } from "@/server/useCases/MaskUrlUseCase";
import { NextResponse } from "next/server";
import { container } from '@/utils/container';

export async function POST(
  req: Request,
) {
  return NextResponse.json(await container.resolve(MaskUrlUseCase).handle((await req.json()).url));
}
