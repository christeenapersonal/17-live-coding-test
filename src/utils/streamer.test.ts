 import { sortStreamers } from './streamer';
import { streamers, sortedStreamers } from '../constants/testData';

test('[Utils] sortStreamers function work properly', () => {
  expect(sortedStreamers).toStrictEqual(sortStreamers(streamers));
});
