import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { GameListingsService } from './game-listings.service';
import { GameListing } from './schemas/game-listing.schema';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('game-listings')
export class GameListingsController {
  constructor(private readonly gameListingsService: GameListingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all games' })
  @ApiResponse({
    status: 200,
    type: [GameListing],
    description: 'Return the created game listing',
  })
  getAllGameListings(): Promise<GameListing[]> {
    return this.gameListingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single game listing by ID' })
  @ApiResponse({
    status: 200,
    type: GameListing,
    description: 'Return the game listing',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findGameListingById(
    @Param() params: { id: string },
  ): Promise<GameListing> {
    const game = await this.gameListingsService.findById(params.id);
    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return game;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new game' })
  @ApiResponse({
    status: 200,
    type: GameListing,
    description: 'Return the created game listing',
  })
  @ApiResponse({ status: 400, description: 'Error' })
  async createGameListing(
    @Body() gameListing: GameListing,
  ): Promise<GameListing> {
    return this.gameListingsService.create(gameListing);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a game listing' })
  @ApiResponse({
    status: 200,
    type: GameListing,
    description: 'Return the deleted game listing',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  async removeGameListing(@Param('id') id: string) {
    const game = await this.gameListingsService.findById(id);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return this.gameListingsService.delete(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a game listing' })
  @ApiResponse({
    status: 200,
    type: GameListing,
    description: 'Return the updated game listing',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  async updateGameListing(
    @Param('id') id: string,
    @Body() gameListing: GameListing,
  ) {
    const game = await this.gameListingsService.findById(id);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return this.gameListingsService.update(id, gameListing);
  }
}
