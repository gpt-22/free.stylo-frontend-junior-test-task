import {useState, useEffect, createRef} from 'react';
import MainContainer from '../components/MainContainer';
import Preview from '../components/Preview';
import {getVideos} from '../api';

const Index = () => {
  const [videos, setVideos] = useState([])
  const [input, setInput] = useState('')

  const inputRef = createRef(input)

  useEffect(() => {
    inputRef.current.value = getInputValueFromLS()
    setInput(inputRef.current.value)
    inputRef.current.focus()
  })

  function getInputValueFromLS() {
    let inputValue
    if (process.browser) {
      inputValue = localStorage.getItem('inputValue')
    }
    return inputValue || null
  }

  function handleChange(e) {
    setInput(e.target.value)
  }

  function isInputValid() {
    return !!input && input.trim() !== ''
  }

  async function updateVideos(e) {
    e.preventDefault()

    if (isInputValid()) {
      localStorage.setItem('inputValue', input)
      const videos = await getVideos(input)
      setVideos(videos)
    }
  }

  return (
    <MainContainer title={'Поиск видео'}>
      <form action="get" className="search-form">
        <input
          type="search"
          className="search"
          placeholder="Введите название канала"
          value={input}
          onChange={handleChange}
          ref={inputRef}
        />
        <button type="submit" className="btn" onClick={updateVideos}>
          Загрузить
        </button>
      </form>

      <div className="previews">
        { videos.map(video => <Preview video={video} key={video.id}/>) }
      </div>
    </MainContainer>
  );
};

export default Index;
