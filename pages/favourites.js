import {useState} from "react";
import MainContainer from "../components/MainContainer";
import FavouriteVideo from "../components/FavouriteVideo";

const Favourites = () => {
  const [videos, setVideos] = useState(getVideosFromLS())

  function getVideosFromLS() {
    let videosFromLS
    if (process.browser) {
      videosFromLS = JSON.parse(localStorage.getItem('favourites'))
    }
    return videosFromLS || []
  }

  function removeFromFavourites(videoToRemove) {
    if (process.browser) {
      const updatedVideos = videos.filter(video => video.id !== videoToRemove.id)
      localStorage.setItem('favourites', JSON.stringify(updatedVideos))
      setVideos(updatedVideos)
    }
  }

  return (
    <MainContainer title={'Избранное'}>
      <div className="previews" suppressHydrationWarning={true}>
        {
          process.browser && videos.map(video => {
            return <FavouriteVideo video={video} onRemove={removeFromFavourites} key={video.id}/>
          })
        }
      </div>
    </MainContainer>
  );
};

export default Favourites;
