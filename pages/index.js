import {useState, useEffect, createRef} from 'react'
import MainLayout from '../components/MainLayout'
import VideoPreview from '../components/VideoPreview'
import Loader from "../components/Loader"
import {getVideos} from '../api'

const Index = () => {

  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState([])
  const [input, setInput] = useState('')

  const inputRef = createRef()

  useEffect(() => {
    inputRef.current.focus()
  })

  function handleChange(e) {
    setInput(e.target.value)
  }

  function isInputValid() {
    return !!input && input.trim() !== ''
  }

  async function updateVideos(e) {
    e.preventDefault()

    if (isInputValid()) {
      setLoading(true)
      const videos = await getVideos(input)
      setVideos(videos)
      setLoading(false)
    }
  }

  function addToFavourites(video) {
    let videos = JSON.parse(localStorage.getItem('favourites'))
    const ids = videos.map(video => video.id)
    if (videos) {
      !ids.includes(video.id) ? videos.push(video) : ''
    } else videos = [video]
    localStorage.setItem('favourites', JSON.stringify(videos))
  }

  function getLoadingOrPreviews() {
    if (loading) {
      return <Loader />
    } else {
      return videos.map(video => {
        return <VideoPreview
          key={video.id}
          video={video}
          btnText={'В избранное'}
          btnCallback={addToFavourites}
        />
      })
    }
  }


  return (
    <MainLayout title={'Поиск видео'}>
      <form action="get" className="search-form">
        <input
          type="search"
          className="search-form__search"
          placeholder="Введите название канала"
          value={input}
          onChange={handleChange}
          ref={inputRef}
        />
        <button type="submit" className="search-form__btn btn" onClick={updateVideos}>
          Загрузить
        </button>
      </form>

      <div className="previews">
        { getLoadingOrPreviews() }
      </div>
    </MainLayout>
  )
}

export default Index
