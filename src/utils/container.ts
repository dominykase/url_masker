import { UrlRepository } from '@/server/repositories/UrlRepository';
import { MaskUrlUseCase } from '@/server/useCases/MaskUrlUseCase';
import { RedirectUseCase } from '@/server/useCases/RedirectUseCase';
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

container.register('RedirectUseCase', {
  useClass: RedirectUseCase,
});

export { container };
