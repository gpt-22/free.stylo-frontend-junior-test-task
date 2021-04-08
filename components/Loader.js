
const Loader = () => {
  const stripes = [...Array(12)]

  return (
    <div className="loader">
      <div className="loader__spinner">
        {
          stripes.map((n, i) => {
            return <div key={i}></div>
          })
        }
      </div>
    </div>
  )
}

export default Loader
