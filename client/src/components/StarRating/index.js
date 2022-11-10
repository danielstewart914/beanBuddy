const styles = {
  margin: '0 0.05em'
}

const StarRating = ( { rating } ) => {
  return (
    <div>
      <img style={ styles } src={ rating === 1 ? process.env.PUBLIC_URL + 'images/star-half.svg' : process.env.PUBLIC_URL + 'images/star-fill.svg' } alt='star' />
      <img style={ styles } src={ rating === 3 ? process.env.PUBLIC_URL + 'images/star-half.svg' : rating < 3 ? process.env.PUBLIC_URL + 'images/star.svg' : process.env.PUBLIC_URL + 'images/star-fill.svg' } alt='star' />
      <img style={ styles } src={ rating === 5 ? process.env.PUBLIC_URL + 'images/star-half.svg' : rating < 5 ? process.env.PUBLIC_URL + 'images/star.svg' : process.env.PUBLIC_URL + 'images/star-fill.svg' } alt='star' />
      <img style={ styles } src={ rating === 7 ? process.env.PUBLIC_URL + 'images/star-half.svg' : rating < 7 ? process.env.PUBLIC_URL + 'images/star.svg' : process.env.PUBLIC_URL + 'images/star-fill.svg' } alt='star' />
      <img style={ styles } src={ rating === 9 ? process.env.PUBLIC_URL + 'images/star-half.svg' : rating < 9 ? process.env.PUBLIC_URL + 'images/star.svg' : process.env.PUBLIC_URL + 'images/star-fill.svg' } alt='star' />
    </div>
  )
}

export default StarRating;