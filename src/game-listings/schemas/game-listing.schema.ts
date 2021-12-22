import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IsString,
  IsNumber,
  ValidateNested,
  IsUrl,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export type GameListingDocument = GameListing & Document;

export const SCHEMA_NAME = 'game_listings';

export class GameImage {
  @ApiProperty()
  @Prop()
  id: string;

  @ApiProperty()
  @Prop()
  @IsUrl()
  url: string;

  @ApiProperty()
  @Prop()
  type: number;

  @ApiProperty()
  @Prop()
  description: string;
}

@Schema()
export class GameListing {
  @ApiProperty()
  @Prop()
  @IsString()
  category: string;

  @ApiProperty()
  @Prop()
  @IsString()
  title: string;

  @ApiProperty()
  @Prop()
  @IsString()
  subtitle: string;

  @ApiProperty()
  @Prop()
  @IsString()
  description: string;

  @Prop([GameImage])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GameImage)
  @ApiProperty({ type: [GameImage] })
  images: GameImage[];

  @ApiProperty()
  @Prop()
  @IsNumber()
  type: number;

  @Prop([String])
  @ApiProperty()
  @IsArray()
  tags: string[];

  @ApiProperty()
  @Prop()
  @IsString()
  author: string;

  @ApiProperty()
  @Prop()
  replayBundleUrlJson: string;

  @ApiProperty()
  @Prop()
  duration: number;

  @ApiProperty()
  @Prop()
  isDownloadable: boolean;

  @ApiProperty()
  @Prop()
  isStreamable: boolean;

  @ApiProperty()
  @Prop()
  version: string;
}

export const GameListingSchema = SchemaFactory.createForClass(GameListing);
