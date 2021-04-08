import {useState} from 'react'

const VideoPreview = ({ video, btnText, btnCallback, btnTextOnClick, isClicked }) => {
  const [clicked, setClicked] = useState(isClicked)

  const previewWidth = '360'
  const previewHeight = '200'
  const src = video.thumbnail_url
    .replace('%{width}', previewWidth)
    .replace('%{height}', previewHeight)

  return (
    <div className="preview">
      <img src={ src } alt={ video.title } className="preview__img" />

      <a href={ video.url } target="_blank" className="preview__link">
        <div className="preview__hidden">
          <h2 className="preview__title">
            { video.title }
          </h2>

          <div className="preview__btn-row">
            <button
              className="btn"
              onClick={e => {
                e.preventDefault()
                setClicked(true)
                btnCallback(video)
              }}
              disabled={clicked}
            >
              { !clicked ? btnText : btnTextOnClick}
            </button>
          </div>
        </div>
      </a>
    </div>
  )
}

export default VideoPreview
