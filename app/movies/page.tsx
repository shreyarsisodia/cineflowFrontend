"use client"
import React,{useEffect} from 'react'
// import Navbar from '../../components/Navbar'
import HeroSection from '../../components/HeroSection'
import CardSlider from '../../components/CardSlider'
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import{fetachMovies} from "../../redux/slices/movieSlice"
import { HeroData } from '../dashboard/page';

const Movies = () => {
  const dispatch: AppDispatch = useDispatch();
  const {movies} = useSelector((state:RootState)=>state.movie)
  const featuredMovie :HeroData[] = [
    {
      urlName: "Frozen",
      title: "Frozen",
      type: "movie",
      genre: "Animation, Adventure, Fantasy",
      image: "https://images7.alphacoders.com/112/1120950.jpg",
      videoUrl: "https://cineflow-bucket.s3.eu-north-1.amazonaws.com/videos/Frozen-Movie-Trailer.mp4",
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
      videoUrl: "https://cineflow-bucket.s3.eu-north-1.amazonaws.com/videos/Beauty-and-the-Beast-Trailer.mp4",
      description: "A tale as old as time."
    }
  ];

    useEffect(() => {
      dispatch(fetachMovies("movie"));
    }, []);
  return (
     <>
      <div className="bg-black text-white min-h-screen">
      {/* <Navbar /> */}
      <HeroSection data={featuredMovie}/>
      <div className="trending-head">Trending Now</div>
      <CardSlider allVideos={movies}/>
    </div>
     </>
  )
}

export default Movies