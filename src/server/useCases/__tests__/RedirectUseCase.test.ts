import 'reflect-metadata';
import { RedirectUseCase } from "../RedirectUseCase";
import { MockUrlRepository } from '../__mocks__/MockUrlRepository';

describe('RedirectUseCase', () => {
    it('should handle redirection for valid uuid', async () => {
        const redirectUseCase = new RedirectUseCase(new MockUrlRepository());

        const result = await redirectUseCase.handle('valid_uuid');

        expect(result).toEqual("https://example.com");
    });

    it('should handle redirection for invalid uuid', async () => {
        const redirectUseCase = new RedirectUseCase(new MockUrlRepository());

        const result = await redirectUseCase.handle('invalid_uuid');

        expect(result).toEqual(undefined);
    });
});
