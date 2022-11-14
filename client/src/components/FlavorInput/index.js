import { Switch } from '@mui/material';
import Slider from '@mui/material/Slider';

import styles from './FlavorInput.module.css';

const sliderStyle = {
  Slider: {
    color: 'black',
    fontSize: '2rem',
    width: '10rem'
  },
  Toggle: {
    color: 'black'
  }
}

const FlavorInput = ( { flavorProfile, handleFlavorChange, handleDislikeChange } ) => {
  const flavors = [
    { label: 'Cereal', name: 'cereal' },
    { label: 'Burnt', name: 'burnt' },
    { label: 'Tobacco', name: 'tobacco' },
    { label: 'Nutmeg', name: 'nutmeg' },
    { label: 'Cinnamon', name: 'cinnamon' },
    { label: 'Clove', name: 'clove' },
    { label: 'Pepper', name: 'pepper' },
    { label: 'Pungent', name: 'pungent' },
    { label: 'Nutty', name: 'nutty' },
    { label: 'Chocolate', name: 'chocolate' },
    { label: 'Dark Chocolate', name: 'darkChocolate' },
    { label: 'Honey', name: 'honey' },
    { label: 'Caramel', name: 'caramel' },
    { label: 'Maple Syrup', name: 'mapleSyrup' },
    { label: 'Molasses', name: 'molasses' },
    { label: 'Vanilla', name: 'vanilla' },
    { label: 'Overall Sweet', name: 'overallSweet' },
    { label: 'Sweet Aromatics', name: 'sweetAromatics' },
    { label: 'Floral', name: 'floral' },
    { label: 'Black Tea', name: 'blackTea' },
    { label: 'Berry', name: 'berry' },
    { label: 'Dried Fruit', name: 'driedFruit' },
    { label: 'Citrus Fruit', name: 'citrusFruit' },
    { label: 'Other Fruit', name: 'otherFruit' },
    { label: 'Sour', name: 'sour' },
    { label: 'Fermented', name: 'fermented' },
    { label: 'Olive Oil', name: 'oliveOil' },
    { label: 'Raw', name: 'raw' },
    { label: 'Vegetative', name: 'vegetative' },
    { label: 'Beany', name: 'beany' },
    { label: 'Papery / Musty', name: 'paperyMusty' },
    { label: 'Chemical', name: 'chemical' }
  ];

  const sliderModule = ( flavor ) => {
    return (
      <div className='Card' key={ flavor.name }>
      <Slider
        name={ flavor.name }
        size="small"
        style={ sliderStyle.Slider }
        defaultValue={0}
        aria-label={ flavor.label }
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={5}
        value={flavorProfile[flavor.name].value}
        onChange={handleFlavorChange}
      />
      <div className={ styles.Label }>
        { flavor.label }
      </div>
      <div className={ flavorProfile[flavor.name].value ?  styles.Label : styles.Hidden }>
        Like 
        <Switch 
          name={ flavor.name }
          size="small"
          color='default'
          checked={flavorProfile[flavor.name].dislike}
          onChange={handleDislikeChange}
          style={ sliderStyle.Toggle } 
          aria-label="Dislike"
        />
        Dislike
        </div>
    </div>
    )
  }

  return (
    <div>
      <div className={ styles.Container }>
        <h3 className={ styles.Header }>Flavors</h3>
        <p className={ styles.Subheading }>
          Select all the flavors you tasted in this coffee.
        </p>
        <p className={ styles.Subheading }>
          0 - None Tasted.<br />
          1 - Hint of Flavor Presence.<br />
          3 - Moderate Flavor Presence.<br />
          5 - Strong Flavor Presence.
        </p>
        <p>
          Don't forget to flip the switch that appears to the Dislike position if you did not like any particular flavor.
        </p>
      </div>
      <div className={ styles.FlavorInput }>
        { flavors.map( ( flavor ) => sliderModule( flavor ) ) }
      </div>
    </div>
  )
}

export default FlavorInput;