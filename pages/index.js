import {useState, useEffect} from 'react'
import MainLayout from '../components/MainLayout'
import VideoPreview from '../components/VideoPreview'
import Loader from "../components/Loader"
import {getVideos} from '../api'

const Index = () => {
  const channelErrors = {
    'dirty':'Для загрузки видео требуется ввести название канала',
    'invalid': 'Невалидное название канала'
  }
  const channelRegex = /^[a-zA-Z0-9]{1,25}$/

  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState([])
  const [channel, setChannel] = useState('')
  const [channelDirty, setChannelDirty] = useState(false)
  const [channelError, setChannelError] = useState(channelErrors.dirty)
  const [channelValid, setChannelValid]= useState(false)
  const [noChannel, setNoChannel] = useState(false)
  const [emptyChannel, setEmptyChannel] = useState(false)

  function handleChange(e) {
    const value = e.target.value
    setChannel(value)

    if (value.trim() === '') {
      setChannelDirty(true)
      setChannelError(channelErrors.dirty)
    } else if (!channelRegex.test(value)) {
      setChannelError(channelErrors.invalid)
    } else {
      setChannelDirty(false)
      setChannelError('')
      setChannelValid(true)
    }
  }

  function isInputValid() {
    return !!channel && channel.trim() !== ''
  }

  async function updateVideos(e) {
    e.preventDefault()

    if (isInputValid()) {
      setLoading(true)
      const videos = await getVideos(channel)

      if (videos[0] === 'no-channel') {
        setNoChannel(true)
      } else if (!videos.length) {
        setEmptyChannel(true)
      } else {
        setNoChannel(false)
        setEmptyChannel(false)
      }

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
    } else if (noChannel) {
      return <h1 className="error error--no-channel">Каналов с таким названием не существует :(</h1>
    } else if (emptyChannel) {
      return <h1 className="error error--no-videos">На канале нет видео</h1>
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

  const blurHandler = (e) => {
    if (e.target.name === 'channel') {
      setChannelDirty(true)
    }
  }

  return (
    <MainLayout title={'Поиск видео'}>
      <form action="get" className="search-form">
        <div className="search-form__search-wrapper">
          {
            (channelDirty && channelError) &&
            <label
              htmlFor="channel"
              className="search-form__search-label"
            >
              {channelError}
            </label>
          }
          <input
            id="channel"
            name="channel"
            type="search"
            className="search-form__search"
            placeholder="Введите название канала"
            value={channel}
            onChange={handleChange}
            onBlur={e => blurHandler(e)}
          />
        </div>

        <button
          type="submit"
          className="search-form__btn btn"
          onClick={updateVideos}
          disabled={!channelValid}
        >
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
