"use client";
import React, {  useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
import { AppDispatch } from "../redux/store";
import { addCommentToVideo,
  addLikeToVideo,
  getCommentVideo,
    setShowDialog,
  setStoreMovie,
  updateUserWatchHistory,
} from "../redux/slices/movieSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useRouter } from "next/navigation";
import CommentIcon from "@mui/icons-material/Comment";
import ClipLoader from "react-spinners/ClipLoader";
import { Avatar, TextField, Tooltip } from "@mui/material";
import { RootState } from '../redux/store';
// ReactModal.setAppElement('#__next');
interface ClickCard {
  _id: string;
}
const VideoModal = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [items, setItems] = useState<ClickCard[]>([]);
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);
  const [inputComment, setInputComment] = useState<string>("");  // const playerRef = useRef<any>(null);
  const {
    showDialog,
    clickedCard,
    showDes,
    videoComments,
    likeResponse,
  } = useSelector((state:RootState) => state.movie);
  // console.log(showDialog, "showDialog");
  // console.log(clickedCard, "clickedCard");
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedItems = localStorage.getItem("myLists");
    if (storedItems) {
      try {
        setItems(JSON.parse(storedItems)); // Ensure data is parsed properly
      } catch (error) {
        console.error("Error parsing localStorage data", error);
        setItems([]); // Reset to empty array if JSON is invalid
      }
    }
  }, []);

  const handleModal = () => {
    // event.stopPropagation()
    dispatch(updateUserWatchHistory(clickedCard?._id));
    // console.log("click");
    dispatch(setShowDialog(!showDialog));
    router.push(`video/${clickedCard?._id}`);
    dispatch(setStoreMovie(clickedCard?.url));
  };
  const closeModal = () => {
    dispatch(setShowDialog(false));
    // if (playerRef.current) {
    //   playerRef.current.seekTo(0); // Optionally reset the video to the beginning
    //   playerRef.current.stop(); // Stop the video
    // }
  };
  const handleWatchList = (clickedCard: ClickCard) => {
    const isExist = items?.some((ele) => ele?._id == clickedCard?._id);
    if (!isExist) {
      const newArr = [...items, clickedCard];
      const updatedItems = newArr;
      setItems(updatedItems); // Update state
      localStorage.setItem("myLists", JSON.stringify(updatedItems));
    }

    dispatch(setShowDialog(false));
  };
  const handleComment = async () => {
    const commentData = {
      videoId: clickedCard?._id,
      text: inputComment,
    };
    const res = await dispatch(addCommentToVideo(commentData));
    if (res?.payload?.status == 200) {
      dispatch(getCommentVideo(clickedCard?._id));
    }
    console.log(res, "res");
    setInputComment("");
  };
  const handleLike = () => {
    dispatch(addLikeToVideo(clickedCard?._id));
  };
  return (
    <div>
      {/* <div className="close-button" onClick={closeModal}><CloseIcon/></div> */}
      <ReactModal
        isOpen={showDialog}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        {/* <button onClick={handleModal} className="close-button">close</button> */}
        { showDialog ? (
          // <div className="video-container">
          //   <ReactPlayer
          //     ref={playerRef}
          //     url={selectedMovie}
          //     playing={true}
          //     controls={true}
          //     className="player"
          //   />
          // </div>
          <div>
            <Card sx={{ position: "relative",borderRadius: "10px",height: 550,  backgroundPosition: "top",
               paddingBottom: "8px !important"  }}>
              <CardMedia
                 sx={{ 
                  height: 550, 
                  objectFit: "cover",
                  backgroundPosition: "top" // Ensure cropping happens from the bottom
                }}
                image={clickedCard?.poster}
                title="movie"
                // className="show-image"
              />
              <CardContent sx={{
      position: "absolute", /* Overlay on top of the image */
      bottom: 0, /* Align at the bottom of the card */
      left: 0,
      right: 0,
      // padding: "16px",
      backdropFilter: "blur(5px)", /* Apply frosted glass effect */
      background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)", /* Gradient fade from transparent to semi-transparent black */
      zIndex: 1, /* Ensure it appears above the image */
    }} className="show-content">
                <div className="show-title">{clickedCard?.title}</div>
                <div className="show-des">
                <div className="show-des">
  {showDes ||
    (clickedCard?.aiDescription?.length > 200
      ? `${clickedCard?.aiDescription.substring(0, 200)}...`
      : clickedCard?.aiDescription) ||
    "Generating Description using AI..."}
</div>
                </div>
                <div className="show-data">
                <div className="show-actions">
                  <PlayCircleOutlineIcon
                    sx={{
                      color: "white",
                      height: "30px",
                      width: "30px",
                      zIndex: 999,
                    }}
                    onClick={handleModal}
                  />
                  <AddCircleOutlineIcon
                    sx={{ color: "white", height: "30px", width: "30px" }}
                    onClick={() => {
                      handleWatchList(clickedCard);
                    }}
                  />
                
                  {likeResponse?.likes == 0 ? (
                    <Tooltip title="Like">
                        <FavoriteBorderIcon
                    sx={{ color: "white", height: "30px", width: "30px" }}
                    onClick={handleLike}
                  />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Dislike">
                       <FavoriteIcon
                    sx={{ color: "grey", height: "30px", width: "30px" }}
                    onClick={handleLike}
                  />
                    </Tooltip>
                  )}                  <CommentIcon
                    sx={{ color: "white", height: "30px", width: "30px" }}
                    onClick={() => {
                      dispatch(getCommentVideo(clickedCard?._id));
                      setShowCommentBox(true);
                    }}
                  />
                </div>
                <div className="show-info">
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: "small",
                      color: "grey",
                      width: "0.7rem",
                      height: "0.7rem",
                    }}
                  />
                  <div style={{ color: "white", marginLeft: "-3px" }}>2025</div>
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: "small",
                      color: "grey",
                      width: "0.7rem",
                      height: "0.7rem",
                    }}
                  />
                  <div style={{ color: "white", marginLeft: "-3px" }}>A</div>{" "}
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: "small",
                      color: "grey",
                      width: "0.7rem",
                      height: "0.7rem",
                    }}
                  />
                  <div style={{ color: "white", marginLeft: "-3px" }}>
                    {clickedCard?.genre || "Thiller"}
                  </div>{" "}
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: "small",
                      color: "grey",
                      width: "0.7rem",
                      height: "0.7rem",
                    }}
                  />
                  <div style={{ color: "white", marginLeft: "-3px" }}>
                    {clickedCard?.type || "Movie"}
                  </div>
                 
                </div>
              </div>
              
              </CardContent>
              {showCommentBox ? (
                <div style={{ display: "flex", flexDirection: "column",background:"green" }}>
                  <div style={{ display: "flex", flexDirection: "column",background:"green" }}>{`Total Comments: ${videoComments?.result?.length}`}</div>
                  <div >
                    <TextField
                      fullWidth
                      placeholder="Add Comment.."
                     
                    
                      onChange={(event) => {
                        setInputComment(event?.target.value);
                      }}
                    />
                    <div>
                      <button className="playBtn" onClick={handleComment}>
                        {" "}
                        Submit
                      </button>
                    </div>
                    {videoComments && videoComments.result && videoComments.result.length > 0 && (
                    <div >
                      {videoComments?.result &&
                        videoComments?.result?.map(
                          (ele, index: number) => (
                            <div key={index}>
                              <Avatar
                                alt={ele?.user.name}
                                src={ele?.user?.avatar}
                                sx={{ width: 56, height: 56 }}
                              />
                              <div >
                                {" "}
                                <Typography
                                  variant="h6"
                                  sx={{ color: "white" }}
                                >
                                  {ele?.user.name}
                                </Typography>
                                <Typography sx={{ color: "white" }}>
                                  {ele?.comment}
                                </Typography>
                              </div>
                            </div>
                          )
                        )}
                    </div>
                  )}
                  </div>
                 
                </div>
              ) : (
                <></>
              )}           
            </Card>
          </div>
        ) : (
          <ClipLoader />
        )}
        {showCommentBox ? (
                <div className="comment-section">
                  <div className="comment-title">{`Total Comments: ${videoComments?.result?.length}`}</div>
                  <div className="comment-merge">
                    <TextField
                      fullWidth
                      placeholder="Add Comment.."
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#bbb",
                            // color:"white"
                          },
                        },
                      }}
                      className="textfield"
                      onChange={(event) => {
                        setInputComment(event?.target.value);
                      }}
                    />
                    <div className="submit-parent">
                      <button className="comment-button" onClick={handleComment}>
                        {" "}
                        Submit
                      </button>
                    </div>
                    {videoComments && videoComments.result && videoComments.result.length > 0 && (
                    <div className="comment-parent">
                      {videoComments?.result &&
                        videoComments?.result?.map(
                          (ele, index: number) => (
                            <div className="comment-profile" key={index}>
                              <Avatar
                                alt={ele?.user.name}
                                src={ele?.user?.avatar}
                                sx={{ width: 56, height: 56 }}
                              />
                              <div className="profile-details">
                                {" "}
                                <Typography
  variant="subtitle1"
  sx={{ color: "white" }}
>
                                  {ele?.user.name}
                                </Typography>
                                <Typography  variant="body2" sx={{ color: "white" }}>
                                  {ele?.comment}
                                </Typography>
                              </div>
                            </div>
                          )
                        )}
                    </div>
                  )}
                  </div>
                 
                </div>
              ) : (
                <></>
              )}  
      </ReactModal>
    </div>
  );
};

export default VideoModal;
