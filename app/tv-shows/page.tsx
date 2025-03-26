
"use client"
import React,{useEffect} from "react";
import HeroSection from "../../components/HeroSection";
import CardSlider from "../../components/CardSlider";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import{fetchTvShows} from "../../redux/slices/movieSlice"
import { HeroData } from "../dashboard/page";

const TvShows = () => {
  const dispatch: AppDispatch = useDispatch();
  const {tvShows} = useSelector((state:RootState)=>state.movie)
  const featuredMovie:HeroData[] = [{
    urlName:"kung-fu-panda",
    title: "kung fu panda",
    image: "https://cineflow-bucket.s3.eu-north-1.amazonaws.com/poster/kung-fu-panda.jpg",
    videoUrl:"https://cineflow-bucket.s3.eu-north-1.amazonaws.com/videos/KUNG+FU+PANDA+4.mp4",
    description: "There is no secret ingredient. It’s just you.",
    genre:"Thiller",
    type:"tv shows"
  },
  {
    urlName: "bridgerton",
    title: "Bridgerton",
    image: "https://static1.moviewebimages.com/wordpress/wp-content/uploads/2024/05/bridgerton.jpg",
    videoUrl: "https://cineflow-bucket.s3.eu-north-1.amazonaws.com/videos/Bridgerton-Trailer.mp4",
    description: "A tale of love, scandal, and high society.",
    genre: "Drama, Romance",
    type: "TV Show"
  },
  {
    urlName: "titans",
    title: "Titans",
    image: "https://wallpapercat.com/w/full/d/f/9/2076496-2560x1440-desktop-hd-titans-tv-series-background.jpg",
    videoUrl: "https://cineflow-bucket.s3.eu-north-1.amazonaws.com/videos/Titans-Trailer.mp4",
    description: "Heroes rise from the shadows.",
    genre: "Action, Drama, Superhero",
    type: "TV Show"
  }
  
  ];
 
     useEffect(() => {
        dispatch(fetchTvShows("tv shows"));
      }, []);


  return (
    <>
      <div className="bg-black text-white min-h-screen">
        {/* <Navbar /> */}
        <HeroSection data={featuredMovie} />
        <div className="trending-head">Trending Now</div>
        <CardSlider allVideos={tvShows} />
      </div>
    </>
  );
};

export default TvShows;
