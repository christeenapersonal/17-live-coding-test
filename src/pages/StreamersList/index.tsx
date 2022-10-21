import React, { createRef, useEffect, useState } from 'react';

import { useFlip } from './useFlip';
import { Streamer as StreamerType } from 'Streamer-Types';

import { fetchStreamers, sortStreamers } from '../../utils/streamer';

import styled from 'styled-components';
import Streamer from '../../components/Streamer';

const Container = styled.div`
width: fit-content;
margin:auto;
`;

const StreamerList = () => {
    let listRef = createRef<HTMLDivElement>();
    
    // custom hook to separate the logic
    useFlip(listRef);


    const [sortedStreamers, setSortedStreamers] = useState<StreamerType[]>([]
    );

    useEffect(() => {
        fetchStreamers().then(streamers => setSortedStreamers(sortStreamers(streamers)))
            .catch((error) => {
                // handle your errors here
                console.error(error)
            })
    }, [])



    useEffect(() => {
        const interval = setInterval(() => {
            if (sortedStreamers.length <= 0)
                return
            const randomIndex = Math.floor(Math.random() * sortedStreamers.length);
            // Add a random number to a random item's score in the array in every .3 seconds
            sortedStreamers[randomIndex].score = sortedStreamers[randomIndex].score + Math.floor(Math.random() * (1000 - 100) + 100)
            setSortedStreamers(sortStreamers(sortedStreamers))
        }, 300);
        return () => clearInterval(interval);
    }, [sortedStreamers]);



    return (
        <Container>
            {sortedStreamers.length &&
                // An object to store DOMRect of every single item and a boolean ref to not running animation on the first run
                <div ref={listRef}>
                    {sortedStreamers.map((streamer: any, index) => (
                        <Streamer
                            // To keep track of the DOMRect, we use user id. 
                            // The origin key must be a not-changed unique key so that the user id would be the best in this case
                            key={streamer.userID}
                            index={index}
                            {...streamer}
                        />
                    ))}
                </div>
            }
        </Container>
    );
};

export default StreamerList;

