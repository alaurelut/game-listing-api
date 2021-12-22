
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameListingsController } from './game-listings.controller';
import { GameListingsService } from './game-listings.service';
import { GameListingSchema, SCHEMA_NAME } from './schemas/game-listing.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: SCHEMA_NAME, schema: GameListingSchema }])],
  controllers: [GameListingsController],
  providers: [GameListingsService],
})
export class GameListingsModule {}