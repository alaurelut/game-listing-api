import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  GameImage,
  GameListing,
  GameListingDocument,
  SCHEMA_NAME,
} from './schemas/game-listing.schema';

@Injectable()
export class GameListingsService {
  constructor(
    @InjectModel(SCHEMA_NAME)
    private gameListingModel: Model<GameListingDocument>,
  ) {}

  async create(gameListing: GameListing): Promise<GameListing> {
    const createdGameListing = new this.gameListingModel(gameListing);
    return createdGameListing.save();
  }

  async delete(id: string): Promise<any> {
    return this.gameListingModel.findByIdAndRemove(id).catch((err) => {
      throw err;
    });
  }

  async findAll(): Promise<GameListing[]> {
    return this.gameListingModel.find().exec();
  }

  async findById(id: string): Promise<GameListing> {
    return this.gameListingModel.findById(id).exec();
  }

  async update(id: string, gameListing: GameListing): Promise<any> {
    return this.gameListingModel
      .findByIdAndUpdate({ _id: id }, gameListing, { new: true })
      .catch((err) => {
        throw err;
      });
  }
}
