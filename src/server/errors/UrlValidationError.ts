export class UrlValidationError extends Error {
    constructor(message: string = 'Provided URL is invalid.') {
        super(message);
        this.name = 'UrlValidationError';
    }
}
