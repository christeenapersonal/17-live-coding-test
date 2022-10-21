
import { Streamer } from 'Streamer-Types';

export const sortStreamers = (streamers: Streamer[]) =>
  streamers
    .slice()
    .sort((streamerA, streamerB) => streamerB.score - streamerA.score);

export const fetchStreamers = async() => {
    // get the data from the api
    const data = await fetch('https://webcdn.17app.co/campaign/pretest/data.json');
    // convert the data to json
    const json = await data.json();

    // set state with the result
    return json;

};
