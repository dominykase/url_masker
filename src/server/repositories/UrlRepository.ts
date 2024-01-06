import { Url } from "@/types/db/Url";
import { PrismaClient } from "@prisma/client";
import {inject, injectable} from "tsyringe";

export interface IUrlRepository {
    create(url: string): Promise<Url>;
}

@injectable()
export class UrlRepository implements IUrlRepository {
    constructor(@inject('PrismaClient') private prismaClient: PrismaClient) {}

    public async create(url: string): Promise<Url> {
        const maskedUrl = await this.prismaClient.url.create({
            data: {
                redirect_url: url,
            },
        });

        return maskedUrl;
    }
}
