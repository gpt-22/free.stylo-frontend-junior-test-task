const Preview = ({ video }) => {

  function addToFafourites(video) {
    let videos = JSON.parse(localStorage.getItem('favourites'))
    const ids = videos.map(video => video.id)
    if (videos) {
      !ids.includes(video.id) ? videos.push(video) : ''
    } else videos = [video]
    localStorage.setItem('favourites', JSON.stringify(videos))
  }

  const src = video.thumbnail_url.replace('%{width}','360').replace('%{height}', '200')

  return (
    <div className="preview">
      <img src={ src } alt={ video.title } className="preview__img" />

      <a href={ video.url } target="_blank" className="preview__link">
        <div className="preview__hidden">
          <h3 className="preview__title">
            { video.title }
          </h3>
          <div className="preview__btn-row">
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault()
                addToFafourites(video)
              }}
            >
              В избранное
            </button>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Preview;
