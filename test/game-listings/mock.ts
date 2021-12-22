import { GameListing } from '../../src/game-listings/schemas/game-listing.schema';

export const allGamesMock: GameListing[] = [
  {
    version: '1.0',
    isStreamable: true,
    isDownloadable: false,
    duration: 16.049999237060547,
    replayBundleUrlJson: 'url goes here',
    author: 'author goes here',
    tags: ['mma', 'fight'],
    type: 1,
    images: [
      {
        id: '1',
        url: '',
        type: 1,
        description: 'test',
      },
    ],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    subtitle: 'Live Event',
    title: 'New game 2',
    category: 'live',
  },
];
