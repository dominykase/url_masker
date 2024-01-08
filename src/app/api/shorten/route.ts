import { MaskUrlUseCase } from "@/server/useCases/MaskUrlUseCase";
import { NextResponse } from "next/server";
import { container } from '@/utils/container';
import { UrlValidationError } from "@/server/errors/UrlValidationError";

export async function POST(
    req: Request,
) {
    try {
        return NextResponse.json(
            await container.resolve(MaskUrlUseCase).handle((await req.json()).url),
            { status: 201 }
        );
    } catch (err: unknown) {
        if (err instanceof UrlValidationError) {
            return NextResponse.json({ error: err.message }, { status: 422 });
        }

        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}
