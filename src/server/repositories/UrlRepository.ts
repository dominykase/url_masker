import { Url } from "@/types/db/Url";
import { PrismaClient } from "@prisma/client";
import {inject, injectable} from "tsyringe";

export interface IUrlRepository {
    create(url: string): Promise<Url>;
    findByUuid(uuid: string): Promise<Url|null>;
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

    public async findByUuid(uuid: string): Promise<Url|null> {
        return await this.prismaClient.url.findUnique({
            where: {
                id: uuid,
            },
        });
    }
}
