"use client";
import React from "react";
import Slider from "react-slick";
import Card from "./Card";
import { motion } from "framer-motion"; // Import Framer Motion
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VideoModal from "./videoModal";
export interface Video {
  poster: string;
  title: string;
  url: string;
  aiDescription: string;
  _id: string;
}
interface CardSliderProps {
  allVideos: Video[];
}

function CardSlider({ allVideos }: CardSliderProps) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <>
      <VideoModal />
      <div className="slider-container">
        <Slider {...settings}>
          {allVideos?.map((ele: Video, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.1, // Staggered effect
              }}
              whileHover={{
                scale: 1.1,
                rotateY: 10,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
              }} // 3D pop effect
              whileTap={{ scale: 0.95 }} // Press animation
            >
              
              <Card
                imageUrl={ele?.poster}
                title={ele?.title}
                videoUrl={ele?.url}
                ele={ele}
              />
            </motion.div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default CardSlider;
