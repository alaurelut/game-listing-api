import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { GameListingsModule } from '../../src/game-listings/game-listings.module';
import { GameListingsService } from '../../src/game-listings/game-listings.service';
import { INestApplication } from '@nestjs/common';
import { allGamesMock } from './mock';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

describe('Game listings', () => {
  let app: INestApplication;
  let gameListingsService = { findAll: () => allGamesMock };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DATABASE_URL),
        GameListingsModule,
      ],
    })
      .overrideProvider(GameListingsService)
      .useValue(gameListingsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET game-listings`, () => {
    return request(app.getHttpServer())
      .get('/game-listings')
      .expect(200)
      .expect(gameListingsService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
