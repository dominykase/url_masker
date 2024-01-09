import 'reflect-metadata';
import { MaskUrlUseCase } from "../MaskUrlUseCase";
import { MockUrlRepository } from "../__mocks__/MockUrlRepository";

describe('MaskUrlUseCase', () => {
    it('should mask url for valid url', async () => {
        const maskUrlUseCase = new MaskUrlUseCase(new MockUrlRepository());

        const result = await maskUrlUseCase.handle('https://example.com');

        expect(result).toEqual({ url: `${process.env.BASE_URL}/api/r/123` });
    });

    it('should throw error for invalid url (empty string)', async () => {
        const maskUrlUseCase = new MaskUrlUseCase(new MockUrlRepository());

        await expect(maskUrlUseCase.handle('')).rejects.toThrowError('URL is required.');
    });

    it('should throw error for invalid url (no http tag)', async () => {
        const maskUrlUseCase = new MaskUrlUseCase(new MockUrlRepository());

        await expect(maskUrlUseCase.handle('example.com')).rejects.toThrowError('URL must begin with a http tag.');
    });

    it('should throw error for invalid url (no dot)', async () => {
        const maskUrlUseCase = new MaskUrlUseCase(new MockUrlRepository());

        await expect(maskUrlUseCase.handle('https://example')).rejects.toThrowError('Provided URL is invalid.');
    });
});
