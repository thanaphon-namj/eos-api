import { NestFactory } from '@nestjs/core';
import { SeedModule } from './module';
import { UserSeedService } from './user/user.service';

const run = async () => {
  const app = await NestFactory.create(SeedModule);
  await app.get(UserSeedService).run();
  await app.close();
};

run();
