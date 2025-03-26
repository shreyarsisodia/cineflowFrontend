import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  setShowDialog,
  setClickedcard,
  fetchVideoDescription,
} from "../redux/slices/movieSlice";
import { Video } from "./CardSlider";

interface CardProps {
  imageUrl: string;
  title: string;
  videoUrl: string;
  ele: Video;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, videoUrl, ele }) => {
  const dispatch = useDispatch();

  const hanldeVideo = async (video: string, image: string, ele: Video) => {
    console.log("clicked");
    if (!ele?.aiDescription) {
      dispatch(fetchVideoDescription(ele?._id));
    }
    // if(res){
    dispatch(setShowDialog(true));
    dispatch(setClickedcard(ele));
    // }
  };

  return (
    <>
      <div
        className="card"
        onClick={() => hanldeVideo(videoUrl, imageUrl, ele)}
      >
        <div className="card-image-container">
          <Image
            src={imageUrl}
            alt={title}
            //   layout="fill"
            width={230}
            height={300}
            objectFit="cover"
            unoptimized
          />
          {/* <h3 className="card-title">{title}</h3> */}
          <div className="card-image-container-overlay">
            <div className="base-text">UK,2001</div>
            <div>Harry Potter and the </div>
            <div className="card-image-container-overlay-rating">
              <div className="imdb-rating">
                <Image
                  src={"/imdb.jpg"}
                  alt={"title"}
                  //   layout="fill"
                  width={22}
                  height={12}
                  // objectFit="cover"
                />
                <span>
                8.6
                </span>
              </div>
              <div>
                {" "}
                <div className="rotten-rating">
                  {" "}
                  <Image
                    src={"/Rotten_Tomatoes.svg"}
                    alt={title}
                    //   layout="fill"
                    width={22}
                    height={12}
                    // objectFit="cover"
                  />
                  <span>95%</span>
                </div>
              </div>
            </div>
            <div className="base-text">Action/Adventure/Sci-fi</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
