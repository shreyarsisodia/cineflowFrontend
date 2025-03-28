"use client"; //Ensures the component runs in the browsers, important for redux and hooks

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../../components/HeroSection";
import CardSlider from "../../components/CardSlider";
// import MovieRow from "../../components/MovieRow";
import { RootState, AppDispatch } from "../../redux/store";
import {
  fetchVideos,
  getAiRecommendationList,
  getWatchHistory,
} from "../../redux/slices/movieSlice";
import Head from "next/head";

export interface Allvideo {

  aiDescription : string
  genre:string;
 poster:string
  title:string;
  type:string
  url:string
  _id:string;
}

export interface HeroData {
  videoUrl: string;
  urlName: string;
  title: string;
  type: string;
  genre: string;
  image: string;
  description: string;

}

export default function Dashboard() {

  //dispatches an action the redux store
  const dispatch: AppDispatch = useDispatch();
  const { allVideos, userWatchHistory, aiRecommendationList } = useSelector(
    (state: RootState) => state.movie
  );
  // console.log(allVideos, "videos");
  //fetch movies when the component mounts
  useEffect(() => {
    dispatch(fetchVideos());
    dispatch(getWatchHistory());
    dispatch(getAiRecommendationList());
  }, []);

  const featuredMovie :HeroData[] = [
    {
      urlName: "Frozen",
      title: "Frozen",
      type: "movie",
      genre: "Animation, Adventure, Fantasy",
      image: "https://images7.alphacoders.com/112/1120950.jpg",
      videoUrl: "https://cineflow-videos.s3.eu-north-1.amazonaws.com/Disney's+Frozen+Official+Trailer.mp4",
      description: "A princess discovers her icy powers."
    },
    {
      urlName: "Raya",
      title: "Raya and the Last Dragon",
      type: "movie",
      genre: "Animation, Action, Adventure",
      image: "https://wallpapers.com/images/hd/raya-and-the-last-dragon-heroes-forest-poster-seresvygoxxw0en0.jpg",
      videoUrl: "https://cineflow-bucket.s3.eu-north-1.amazonaws.com/videos/Raya-Movie-Trailer.mp4",
      description: "A warrior seeks the last dragon."
    },
    {
      urlName: "BeautyBeast",
      title: "Beauty and the Beast",
      type: "movie",
      genre: "Animation, Romance, Fantasy",
      image: "https://images6.alphacoders.com/811/811443.jpg",
      videoUrl: "https://cineflow-videos.s3.eu-north-1.amazonaws.com/BEAUTY+AND+THE+BEAST+%EF%BD%9C+NEW+Trailer+%EF%BD%9C+Official+Disney+UK.mp4",
      description: "A tale as old as time."
    }
  ];

  const allMovies = allVideos?.filter((ele) => {
    return ele?.type == "movie";
  });

  const allTvShows = allVideos?.filter((ele) => {
    return ele?.type == "tv shows";
  });
  console.log(aiRecommendationList, "aiRecommendationList");

  return (
    <>
      <Head>
        <title>My Custom Page Title</title>
      </Head>
      <div className="bg-black text-white min-h-screen">
        {/* <Navbar /> */}
        <HeroSection data={featuredMovie} />
  
        {/* Trending Now */}
        {allVideos?.length > 0 && (
          <>
            <div className="trending-head">Trending Now</div>
            <CardSlider allVideos={allVideos} />
          </>
        )}
  
        {/* Continue Watching */}
        {userWatchHistory?.length > 3 && (
          <>
            <div className="trending-head">Continue Watching...</div>
            <CardSlider allVideos={userWatchHistory} />
          </>
        )}
  
        {/* AI Recommendations */}
        {aiRecommendationList?.length > 0 && (
          <>
            <div className="trending-head">AI Recommendation List</div>
            <CardSlider allVideos={aiRecommendationList} />
          </>
        )}
  
        {/* Binge-Worthy Movies */}
        {allMovies?.length > 0 && (
          <>
            <div className="trending-head">Binge-Worthy Movies</div>
            <CardSlider allVideos={allMovies} />
          </>
        )}
  
        {/* Critically Acclaimed TV Shows */}
        {allTvShows?.length > 0 && (
          <>
            <div className="trending-head">Critically Acclaimed TV Shows</div>
            <CardSlider allVideos={allTvShows} />
          </>
        )}
      </div>
    </>
  );
}  
