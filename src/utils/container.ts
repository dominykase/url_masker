import { UrlRepository } from '@/server/repositories/UrlRepository';
import { MaskUrlUseCase } from '@/server/useCases/MaskUrlUseCase';
import { PrismaClient } from '@prisma/client';
import { container } from 'tsyringe';

container.register('PrismaClient', {
  useValue: new PrismaClient(),
});

container.register('UrlRepository', {
  useClass: UrlRepository,
});

container.register('MaskUrlUseCase', {
  useClass: MaskUrlUseCase,
});

export { container };
