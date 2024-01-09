import { IUrlRepository } from "@/server/repositories/UrlRepository";
import { Url } from "@/types/db/Url";

export class MockUrlRepository implements IUrlRepository {
    async findByUuid(uuid: string): Promise<Url|null> {
        if (uuid === 'valid_uuid') {
            return {
                id: "123",
                redirect_url: "https://example.com",
            };
        }

        return null;
    }

    async create(url: string): Promise<Url> {
        return {
            id: "123",
            redirect_url: "https://example.com",
        };
    }
}
