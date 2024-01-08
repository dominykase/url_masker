import { inject, injectable } from 'tsyringe';
import type { IUrlRepository } from '../repositories/UrlRepository';
import { UrlMaskResponse } from '@/types/responses/UrlMaskResponse';
import { Url } from '@/types/db/Url';
import { UrlValidationError } from '../errors/UrlValidationError';

export interface IMaskUrlUseCase {
    handle(url: string): Promise<UrlMaskResponse>;
}

@injectable()
export class MaskUrlUseCase implements IMaskUrlUseCase {
    constructor(@inject('UrlRepository') private urlRepository: IUrlRepository) {}
    
    public async handle(url: string): Promise<UrlMaskResponse> {
        this.validateUrl(url);

        const maskedUrl: Url = await this.urlRepository.create(url);

        return { url: `${process.env.BASE_URL}/api/r/${maskedUrl.id}` };
    }

    private validateUrl(url: string): void {
        if (!url.trim()) {
            throw new UrlValidationError('URL is required.');
        }

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            throw new UrlValidationError('URL must begin with a http tag.');
        }

        if (!url.includes('.')) {
            throw new UrlValidationError();
        }
    }
}
