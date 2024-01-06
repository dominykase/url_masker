import { inject, injectable } from 'tsyringe';
import type { IUrlRepository } from '../repositories/UrlRepository';
import { UrlMaskResponse } from '@/types/responses/UrlMaskResponse';
import { Url } from '@/types/db/Url';

export interface IMaskUrlUseCase {
    handle(url: string): Promise<UrlMaskResponse>;
}

@injectable()
export class MaskUrlUseCase implements IMaskUrlUseCase {
    constructor(@inject('UrlRepository') private urlRepository: IUrlRepository) {}
    
    public async handle(url: string): Promise<UrlMaskResponse> {
        const maskedUrl: Url = await this.urlRepository.create(url);

        return { url: `${process.env.BASE_URL}/api/r/${maskedUrl.id}` };
    }
}
