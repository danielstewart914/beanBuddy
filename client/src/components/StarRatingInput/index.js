import Slider from '@mui/material/Slider';
import StarRating from '../StarRating';

const styles = {
  Slider: {
    width: '5.25em',
    color: 'black',
    fontSize: '2rem'
  }
}

const StarRatingInput = ( { rating, setRating } ) => {

  const handleChange = (event, newValue) => {
    setRating( newValue );
  }

  return (
    <div>
      <StarRating rating={ rating } starSize={ 32 } />
      <div>
      <Slider
        style={ styles.Slider }
        size='small'
        aria-label="Rating"
        value={rating}
        step={1}
        marks
        min={1}
        max={10}
        onChange={handleChange}
        />
      </div>
    </div>
  )

}

export default StarRatingInput;