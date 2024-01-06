import { NextResponse } from "next/server";
import { container } from '@/utils/container';
import { redirect, useParams } from "next/navigation";
import { RedirectUseCase } from "@/server/useCases/RedirectUseCase";

export async function GET(
    req: Request,
) {
    const slug = req.url.split('/').pop();

    if (!slug || typeof slug !== 'string') {
        redirect('/404');
    }

    const redirectUrl = await container.resolve(RedirectUseCase).handle(slug);

    if (redirectUrl) {
        redirect(redirectUrl);
    }

    redirect('/404');
}
