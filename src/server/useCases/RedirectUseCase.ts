import { injectable, inject } from 'tsyringe';
import type { IUrlRepository } from '../repositories/UrlRepository';

export interface IRedirectUseCase {
    handle(uuid: string): Promise<string|undefined>;
}

@injectable()
export class RedirectUseCase implements IRedirectUseCase {
    constructor(@inject('UrlRepository') private urlRepository: IUrlRepository) {}

    public async handle(uuid: string): Promise<string|undefined> {
        return (await this.urlRepository.findByUuid(uuid))?.redirect_url
    }
}
