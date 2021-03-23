import React, {useState} from 'react';
import axios from 'axios';
import M from 'materialize-css';

import CardList from '../components/CardList';

import API_KEY from '../misc/keys.js';

import "../App.css";

function YoutubeSearch() {
    
    const [next_page_token, setNextPageToken] = useState();
    const [prev_page_token, setPrevPageToken] = useState();
    const [search_list, setSearchList] = useState(null);
    const [cur_search_term, setCurSearchTerm] = useState(null);//This is to prevent from situation when a user may type something in the search_bar but may not press submit. In this case - if he presses next/prev button then we would have seen the search result of value currently in search bar (if we search based on value currently in search bar). But result will be wrong coz user never pressed enter to search for the term.
    
    const [search_bar_val, setSearchBarVal] = useState("");
    const [video_id, setVideoID] = useState(null);

    function callYoutubeAPI(url, params){
        axios.get(url, {params})
        .then((res) => {
            // console.log(res.data);
            setSearchList(res.data.items);    
            setNextPageToken(res.data.nextPageToken);
            setPrevPageToken(res.data.prevPageToken);
            loader(false);
        })
        .catch((err) => {
            M.toast({html: err.response.data.error.message, classes: "#c62828 red darken-3"});
            console.log(err);
            loader(false);
        });        
    }

    const loader = (show) => {
        const progress_bar = document.getElementsByClassName("progress")[0];
        if(progress_bar)
            progress_bar.style.display = show ? 'block' : 'none';//Note - Just toggle the display of the loader. Don't Rmove it from DOM. It will cause error when you will fetch pages 2 onwards as react won't call render() again. It will just update the state 
    }

    function changePage(dir){
        loader(true);
        callYoutubeAPI(`https://www.googleapis.com/youtube/v3/search`, {
            key: API_KEY,
            part: "snippet", 
            q: cur_search_term,
            pageToken: dir === "FORWARD" ? next_page_token : prev_page_token,
            maxResults: 12,
        });
        //alternative to above - callYoutubeAPI(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${search_bar_val}&maxResults=9`)
    }

    function searchYoutube() {
        if(!navigator.onLine)
          return M.toast({html: "Connect To Internet For Searching Videos", classes: "#c62828 red darken-3"});

        if(search_bar_val !== "" && search_bar_val !== null && search_bar_val !== undefined){
            loader(true);
            setCurSearchTerm(search_bar_val);
            callYoutubeAPI(`https://www.googleapis.com/youtube/v3/search`, {
                key: API_KEY,
                part: "snippet", 
                q: search_bar_val,
                maxResults: 12,
            });
        }
        else
            M.toast({html: "Please Enter Search Query!", classes: "#c62828 red darken-3"});
    }

    return (
        <div className="container change-card-shadow">
            <div className="row" id="video" style={{marginTop: "70px", marginBottom: "56px"}}>
                {video_id ?
                    <iframe className="col s12" height = "401px" allowFullScreen
                            src={`https://www.youtube.com/embed/${video_id}`}
                            frameBorder='0' allow='autoplay; encrypted-media'/> 
                    :   search_list ?   <center><h4>Tap Thumbnail To Play The Video</h4></center> 
                                        : <center><h4>Search & Play Youtube Videos Instantly</h4></center> 
                }
            </div>
            
            <div className="progress" style={{display: "none", marginBottom: "51px"}}>
                <div className="indeterminate"></div>
            </div>

            <div className="row">
                <div className="input-field col s11 " style={{margin: "0 0", paddingRight: "0"}}>
                    <input  id="search" type="text" value={search_bar_val} 
                            onChange={(e) => setSearchBarVal(e.target.value)}
                            onKeyDown={(e) =>   {   if(e.key === 'Enter')  
                                                        searchYoutube();
                                                }}/>
                    <label htmlFor="search">Search</label>
                </div>
                <a  className="waves-effect waves-grey flat-btn col s1" id="search-btn"
                    style={{paddingTop: "15px"}}
                    onClick={searchYoutube}>
                        <i className="material-icons center">search</i>
                </a>
            </div>

            {/* No need for row as the CardList returns a list "inside a row" */}
<<<<<<< HEAD
            <div className="hide-on-small-only">
                {[3, 6, 9, 12].map((end) => 
                    <CardList   mob={false} searchList={search_list} indx={[end-3, end]} 
                                setVideoID={setVideoID} key={end}/> )}
            </div>

            {/* For mobile -  */}
            <div className="hide-on-med-and-up">
                {[2, 4, 6, 8, 10, 12].map((end) => 
                    <CardList   mob={true} searchList={search_list} indx={[end-2, end]} 
                                setVideoID={setVideoID} key={end}/>)}
            </div>
            {search_list !== null ? 
=======
            {search_list && !search_list.length ? 
                <center>
                    <div style={{fontSize: "21px", paddingTop: "21px"}}>No Videos Found</div>
                </center> :
                [ 
                    console.log(search_list),
                <div className="hide-on-small-only">
                    {[3, 6, 9, 12].map((end) => 
                        <CardList   mob={false} searchList={search_list} indx={[end-3, end]} 
                                    setVideoID={setVideoID} key={end}/> )}
                </div>,

                /* For mobile -  */
                <div className="hide-on-med-and-up">
                    {[2, 4, 6, 8, 10, 12].map((end) => 
                        <CardList   mob={true} searchList={search_list} indx={[end-2, end]} 
                                    setVideoID={setVideoID} key={end}/>)}
                </div>
                ]
            }

            {search_list !== null && search_list.length  ? 
>>>>>>> 42436937d8eadc9dd1f90c0d50b7932843ad13fa
                <div className="row">
                  <div className="col s4 m5 l5"></div>
                  <div className="col s2 m1 l1">
                      <a  className={"btn-floating red btn-medium waves-effect waves-light" 
                                    + (prev_page_token === undefined ? " disabled" : "")}
                          onClick={() => changePage("BACKWARD")}
                          href="#search">
                              <i className="material-icons">chevron_left</i>
                      </a>
                  </div>
                  <div className="col s2 m1 l1">
                      <a  className={"btn-floating red btn-medium waves-effect waves-light" 
                                    + (next_page_token === undefined ? " disabled" : "")}
                          onClick={() => changePage("FORWARD")}
                          href="#search">
                              <i className="material-icons">chevron_right</i>
                      </a>
                  </div> 
                </div>  :   null}
        </div>
    );
}


export default YoutubeSearch






// Youtube API Sample Response (For testing purpose)
// [
//   {
//     "kind": "youtube#searchResult",
//     "etag": "yqjian13uoiPmv5Saq-YHYLB6E0",
//     "id": {
//       "kind": "youtube#channel",
//       "channelId": "UCmJz2DV1a3yfgrR7GqRtUUA"
//     },
//     "snippet": {
//       "publishedAt": "2017-01-07T07:12:57Z",
//       "channelId": "UCmJz2DV1a3yfgrR7GqRtUUA",
//       "title": "Back To Back SWE",
//       "description": "This channel is my initiative to add to the community of programming interview preparation. When I prepared for my first software engineering interview I felt that ...",
//       "thumbnails": {
//         "default": {
//           "url": "https://yt3.ggpht.com/ytc/AAUvwniunywsadW3fEOi6xqxSZC4p6m5Fnu_y64cjcXA3A=s88-c-k-c0xffffffff-no-rj-mo"
//         },
//         "medium": {
//           "url": "https://yt3.ggpht.com/ytc/AAUvwniunywsadW3fEOi6xqxSZC4p6m5Fnu_y64cjcXA3A=s240-c-k-c0xffffffff-no-rj-mo"
//         },
//         "high": {
//           "url": "https://yt3.ggpht.com/ytc/AAUvwniunywsadW3fEOi6xqxSZC4p6m5Fnu_y64cjcXA3A=s800-c-k-c0xffffffff-no-rj-mo"
//         }
//       },
//       "channelTitle": "Back To Back SWE",
//       "liveBroadcastContent": "none",
//       "publishTime": "2017-01-07T07:12:57Z"
//     }
//   },
//   {
//     "kind": "youtube#searchResult",
//     "etag": "GYUxau8rI-7MVtea1HlmEnJW4cw",
//     "id": {
//       "kind": "youtube#playlist",
//       "playlistId": "PLiQ766zSC5jM2OKVr8sooOuGgZkvnOCTI"
//     },
//     "snippet": {
//       "publishedAt": "2018-12-02T04:17:22Z",
//       "channelId": "UCmJz2DV1a3yfgrR7GqRtUUA",
//       "title": "Dynamic Programming, Recursion, &amp; Backtracking",
//       "description": "",
//       "thumbnails": {
//         "default": {
//           "url": "https://i.ytimg.com/vi/Zq4upTEaQyM/default.jpg",
//           "width": 120,
//           "height": 90
//         },
//         "medium": {
//           "url": "https://i.ytimg.com/vi/Zq4upTEaQyM/mqdefault.jpg",
//           "width": 320,
//           "height": 180
//         },
//         "high": {
//           "url": "https://i.ytimg.com/vi/Zq4upTEaQyM/hqdefault.jpg",
//           "width": 480,
//           "height": 360
//         }
//       },
//       "channelTitle": "Back To Back SWE",
//       "liveBroadcastContent": "none",
//       "publishTime": "2018-12-02T04:17:22Z"
//     }
//   },
//   {
//     "kind": "youtube#searchResult",
//     "etag": "GwAO_VJxt5Y9EhTxpwsrDx9VCcc",
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "0SZworb_Fo4"
//     },
//     "snippet": {
//       "publishedAt": "2018-12-07T02:13:26Z",
//       "channelId": "UCmJz2DV1a3yfgrR7GqRtUUA",
//       "title": "How To Get A Job At Google | The Ultimate Guide To Algorithmic/Coding Interviews",
//       "description": "This is what a Computer Scientist \"needs\" to get a job at Google. My name is Benyam Ephrem and I am a 2nd year student at the University of Maryland College ...",
//       "thumbnails": {
//         "default": {
//           "url": "https://i.ytimg.com/vi/0SZworb_Fo4/default.jpg",
//           "width": 120,
//           "height": 90
//         },
//         "medium": {
//           "url": "https://i.ytimg.com/vi/0SZworb_Fo4/mqdefault.jpg",
//           "width": 320,
//           "height": 180
//         },
//         "high": {
//           "url": "https://i.ytimg.com/vi/0SZworb_Fo4/hqdefault.jpg",
//           "width": 480,
//           "height": 360
//         }
//       },
//       "channelTitle": "Back To Back SWE",
//       "liveBroadcastContent": "none",
//       "publishTime": "2018-12-07T02:13:26Z"
//     }
//   },
//   {
//     "kind": "youtube#searchResult",
//     "etag": "xTXxVU4qNRftzHHdlvJKVFNpf94",
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "RlXtTF34nnE"
//     },
//     "snippet": {
//       "publishedAt": "2018-12-12T16:14:25Z",
//       "channelId": "UCmJz2DV1a3yfgrR7GqRtUUA",
//       "title": "Total Occurrences Of K In A Sorted Array (Facebook Software Engineering Interview Question)",
//       "description": "Question: Given a sorted array, find the total count of occurrences of a given value K as efficiently as possible. (Hint: The best answer runs in O(log(n)) time) This ...",
//       "thumbnails": {
//         "default": {
//           "url": "https://i.ytimg.com/vi/RlXtTF34nnE/default.jpg",
//           "width": 120,
//           "height": 90
//         },
//         "medium": {
//           "url": "https://i.ytimg.com/vi/RlXtTF34nnE/mqdefault.jpg",
//           "width": 320,
//           "height": 180
//         },
//         "high": {
//           "url": "https://i.ytimg.com/vi/RlXtTF34nnE/hqdefault.jpg",
//           "width": 480,
//           "height": 360
//         }
//       },
//       "channelTitle": "Back To Back SWE",
//       "liveBroadcastContent": "none",
//       "publishTime": "2018-12-12T16:14:25Z"
//     }
//   },
//   {
//     "kind": "youtube#searchResult",
//     "etag": "5v5KgTFLA9OL813-SUM5UAn7yU0",
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "Zq4upTEaQyM"
//     },
//     "snippet": {
//       "publishedAt": "2019-03-03T13:48:55Z",
//       "channelId": "UCmJz2DV1a3yfgrR7GqRtUUA",
//       "title": "The Backtracking Blueprint: The Legendary 3 Keys To Backtracking Algorithms",
//       "description": "An overview of how to solve problems using backtracking. We make choices, we constrain how our recursion advances, and we converge towards a goal.",
//       "thumbnails": {
//         "default": {
//           "url": "https://i.ytimg.com/vi/Zq4upTEaQyM/default.jpg",
//           "width": 120,
//           "height": 90
//         },
//         "medium": {
//           "url": "https://i.ytimg.com/vi/Zq4upTEaQyM/mqdefault.jpg",
//           "width": 320,
//           "height": 180
//         },
//         "high": {
//           "url": "https://i.ytimg.com/vi/Zq4upTEaQyM/hqdefault.jpg",
//           "width": 480,
//           "height": 360
//         }
//       },
//       "channelTitle": "Back To Back SWE",
//       "liveBroadcastContent": "none",
//       "publishTime": "2019-03-03T13:48:55Z"
//     }
//   },
//   {
//     "kind": "youtube#searchResult",
//     "etag": "7UHdiyxla6y4ZYaPe-B9PhLiFZg",
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "GCm7m5671Ps"
//     },
//     "snippet": {
//       "publishedAt": "2018-12-29T01:20:29Z",
//       "channelId": "UCmJz2DV1a3yfgrR7GqRtUUA",
//       "title": "How To Permute A String - Generate All Permutations Of A String",
//       "description": "Question: Given a string, print all permutations of the string and return an array of them. No duplicates are allowed. Whenever we work with problems like this, ...",
//       "thumbnails": {
//         "default": {
//           "url": "https://i.ytimg.com/vi/GCm7m5671Ps/default.jpg",
//           "width": 120,
//           "height": 90
//         },
//         "medium": {
//           "url": "https://i.ytimg.com/vi/GCm7m5671Ps/mqdefault.jpg",
//           "width": 320,
//           "height": 180
//         },
//         "high": {
//           "url": "https://i.ytimg.com/vi/GCm7m5671Ps/hqdefault.jpg",
//           "width": 480,
//           "height": 360
//         }
//       },
//       "channelTitle": "Back To Back SWE",
//       "liveBroadcastContent": "none",
//       "publishTime": "2018-12-29T01:20:29Z"
//     }
//   },
//   {
//     "kind": "youtube#searchResult",
//     "etag": "YUc1iFdgSmwaqF9hlES2j1zvsZI",
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "vMgiXeWAbwE"
//     },
//     "snippet": {
//       "publishedAt": "2020-01-29T20:44:49Z",
//       "channelId": "UCmJz2DV1a3yfgrR7GqRtUUA",
//       "title": "The New Back To Back SWE Platform (2020 Plans)",
//       "description": "UPDATE: You can check it out free @ https://b2bswe.co/platform Free 5-Day Mini-Course: https://backtobackswe.com Try Our Full Platform: ...",
//       "thumbnails": {
//         "default": {
//           "url": "https://i.ytimg.com/vi/vMgiXeWAbwE/default.jpg",
//           "width": 120,
//           "height": 90
//         },
//         "medium": {
//           "url": "https://i.ytimg.com/vi/vMgiXeWAbwE/mqdefault.jpg",
//           "width": 320,
//           "height": 180
//         },
//         "high": {
//           "url": "https://i.ytimg.com/vi/vMgiXeWAbwE/hqdefault.jpg",
//           "width": 480,
//           "height": 360
//         }
//       },
//       "channelTitle": "Back To Back SWE",
//       "liveBroadcastContent": "none",
//       "publishTime": "2020-01-29T20:44:49Z"
//     }
//   },
//   {
//     "kind": "youtube#searchResult",
//     "etag": "Xgw8ces3SL3KxJCRO52AMLuQQhI",
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "S6IfqDXWa10"
//     },
//     "snippet": {
//       "publishedAt": "2019-01-06T02:21:08Z",
//       "channelId": "UCmJz2DV1a3yfgrR7GqRtUUA",
//       "title": "Implement An LRU Cache - The LRU Cache Eviction Policy (&quot;LRU Cache&quot; on LeetCode)",
//       "description": "Question: Implement an LRU Cache. It is a cache replacement policy that says to evict the least recently used item in the cache. Every time an item is used it ...",
//       "thumbnails": {
//         "default": {
//           "url": "https://i.ytimg.com/vi/S6IfqDXWa10/default.jpg",
//           "width": 120,
//           "height": 90
//         },
//         "medium": {
//           "url": "https://i.ytimg.com/vi/S6IfqDXWa10/mqdefault.jpg",
//           "width": 320,
//           "height": 180
//         },
//         "high": {
//           "url": "https://i.ytimg.com/vi/S6IfqDXWa10/hqdefault.jpg",
//           "width": 480,
//           "height": 360
//         }
//       },
//       "channelTitle": "Back To Back SWE",
//       "liveBroadcastContent": "none",
//       "publishTime": "2019-01-06T02:21:08Z"
//     }
//   },
//   {
//     "kind": "youtube#searchResult",
//     "etag": "3lHqKDm_uHBSxuM52b3J7469k20",
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "jgiZlGzXMBw"
//     },
//     "snippet": {
//       "publishedAt": "2019-01-13T14:27:37Z",
//       "channelId": "UCmJz2DV1a3yfgrR7GqRtUUA",
//       "title": "The Change Making Problem - Fewest Coins To Make Change Dynamic Programming",
//       "description": "Question: You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you ...",
//       "thumbnails": {
//         "default": {
//           "url": "https://i.ytimg.com/vi/jgiZlGzXMBw/default.jpg",
//           "width": 120,
//           "height": 90
//         },
//         "medium": {
//           "url": "https://i.ytimg.com/vi/jgiZlGzXMBw/mqdefault.jpg",
//           "width": 320,
//           "height": 180
//         },
//         "high": {
//           "url": "https://i.ytimg.com/vi/jgiZlGzXMBw/hqdefault.jpg",
//           "width": 480,
//           "height": 360
//         }
//       },
//       "channelTitle": "Back To Back SWE",
//       "liveBroadcastContent": "none",
//       "publishTime": "2019-01-13T14:27:37Z"
//     }
//   }
<<<<<<< HEAD
// ]
=======
// ]
>>>>>>> 42436937d8eadc9dd1f90c0d50b7932843ad13fa
