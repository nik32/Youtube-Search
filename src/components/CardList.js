import React from 'react';

import Card from './Card';

import img1 from '../misc/img1.jpg';
import img2 from '../misc/img2.jpg';

function CardList(props) {
    const dummy_desc = <p>Here will be some more information about this product that will only be revealed once clicked on.</p>;
    let caption = props.searchList ? [] : ["Office", "Lake", "Office"];//Youtube cards don't have caption wheras dummy card have one.Caption is on word desc ofthe product
    let img = [img1, img2, img1];
    let title = ["Specious Office With Wooden Flooring", "Beautiful Lake With Crystal Clear Water", "Specious Office With Wooden Flooring"]
    let desc = [dummy_desc, dummy_desc, dummy_desc];
    let video_id = [], channel_id = [], playlist_id = [];
    const card_indx = props.mob ? [0,1] : [0, 1, 2];

    //Did procesing here instead of inside the card component because if we would have processed the below in Card comp (by passing only searchLit prop), Then we wouldn't have been able to show the dummy cards.
    if(props.searchList !== null && props.searchList !== undefined)
        for(let i = props.indx[0], cards = props.mob ? 2 : 3 ; i < props.indx[1]; i++){
            img[i % cards] = props.searchList[i].snippet.thumbnails.high.url;
            title[i % cards] = props.searchList[i].snippet.title;
            desc[i % cards] =   <div>
                                    <a  href={`https://www.youtube.com/channel/${props.searchList[i].snippet.channelId}`}
                                        target="_blank" rel="noreferrer">
                                        [Channel]
                                    </a> 
                                    <p>{props.searchList[i].snippet.description}</p>
                                </div> ;
            video_id[i % cards] = props.searchList[i].id.videoId;
            channel_id[i % cards] = props.searchList[i].id.channelId;
            playlist_id[i % cards] = props.searchList[i].id.playlistId;
        }

    return props.searchList !== null ? (
            <div className="row">  
                {   card_indx.map((i) => 
                        <Card   img={img[i]} caption={caption[i]} title={title[i]} description={desc[i]} key={i}
                                setVideoID={video_id[i] ? () => props.setVideoID(video_id[i]) : null}
                                channel={channel_id[i]} playlist={playlist_id[i]}/>
                    )
                }
            </div>
        ) :
        null;
}

export default CardList;