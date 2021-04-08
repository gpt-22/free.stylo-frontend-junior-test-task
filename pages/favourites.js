import {useState} from 'react'
import MainLayout from '../components/MainLayout'
import VideoPreview from "../components/VideoPreview";

const Favourites = () => {
  const [videos, setVideos] = useState(getVideosFromLS())

  function getVideosFromLS() {
    return process.browser ? JSON.parse(localStorage.getItem('favourites')) || [] : []
  }

  function removeFromFavourites(videoToRemove) {
    if (process.browser) {
      const updatedVideos = videos.filter(video => video.id !== videoToRemove.id)
      localStorage.setItem('favourites', JSON.stringify(updatedVideos))
      setVideos(updatedVideos)
    }
  }

  return (
    <MainLayout title={'Избранное'}>
      <div className="previews" suppressHydrationWarning={true}>
        {
          process.browser &&
          videos.map(video => {
            return <VideoPreview
              key={video.id}
              video={video}
              btnText={'Удалить'}
              btnCallback={removeFromFavourites}
            />
          })
        }
      </div>
    </MainLayout>
  )
}

export default Favourites
