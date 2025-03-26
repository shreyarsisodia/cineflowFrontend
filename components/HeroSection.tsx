"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  setClickedcard,
  setLoading,
  setShowDialog,
  setStoreMovie,
} from "../redux/slices/movieSlice";
import { useRouter } from "next/navigation";
import { HeroData } from "../app/dashboard/page";
interface HeroSectionProps {
  data: HeroData[];
}
const HeroSection = ({ data=[] }: HeroSectionProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.length);
    }, 2000); // Change slide every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [data.length]);

  const handleVideo = () => {
    dispatch(setStoreMovie(data[currentSlide]?.videoUrl));
    router.push(`video/${data[currentSlide]?.urlName}`);
  };

  const handleInfo = () => {
    dispatch(setLoading(true));
    dispatch(setShowDialog(true));
    dispatch(
      setClickedcard({
        title: data[currentSlide]?.title,
        type: data[currentSlide]?.type,
        genre: data[currentSlide]?.genre,
        poster: data[currentSlide]?.image,
        aiDescription: data[currentSlide]?.description,
      })
    );
  };

  return (
    <section className="hero">
      <motion.div
        className="overlay"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 25,
        }}
      >
        <div className="content">
          <h1 className="title">{data[currentSlide]?.title}</h1>
          <p className="description">{data[currentSlide]?.description}</p>

          <div className="buttons">
            <motion.button className="playBtn" onClick={handleVideo}>
              ▶ Watch Now
            </motion.button>
            <motion.button className="moreInfoBtn" onClick={handleInfo}>
              ℹ More Info
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Image Slideshow */}
      <div className="imageContainer relative">
        {data?.map((movie: any, index: number) => (
          <Image
            key={index}
            src={movie?.image}
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            unoptimized
            className={`slideImage ${index === currentSlide ? "active" : "hidden"}`}
          />
        ))}
      </div>

      <div className="imgContent"></div>
    </section>
  );
};

export default HeroSection;
