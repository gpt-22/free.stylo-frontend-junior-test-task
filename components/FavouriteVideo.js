const FavouriteVideo = ({ video, onRemove }) => {
  const src = video.thumbnail_url.replace('%{width}','360').replace('%{height}', '200')

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
              onClick={(e) => {
                e.preventDefault()
                onRemove(video)
              }}
            >
              Удалить из избранного
            </button>
          </div>
        </div>
      </a>
    </div>
  );
};

export default FavouriteVideo;
