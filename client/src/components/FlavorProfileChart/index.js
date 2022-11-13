
import styles from './FlavorProfileChart.module.css';

import { getFullDataArray, getSimpleDataArray, negativeToNegativeOne } from '../../utils/flavorUtils';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

import { Radar } from 'react-chartjs-2';
import { useQuery } from '@apollo/client';
import { QUERY_USER_FLAVOR_PROFILES } from '../../utils/queries';
import Auth from '../../utils/auth';
import { useState } from 'react';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const FlavorProfileChart = ( { fullCoffeeFlavorProfile, simpleCoffeeFlavorProfile } ) => {
  const { loading, data } = useQuery( QUERY_USER_FLAVOR_PROFILES );
  const user = data?.me || {};

  const [ fullProfile, setFullProfile ] = useState( false );

  const toggleProfile = () => {
    fullProfile ? setFullProfile( false ) : setFullProfile( true );
  }

  const min = -1;

  const options = {
    responsive: true,
    layout: {
      padding: 0
    },
    elements: {
      line: {
        borderWidth: 2,
        tension: 0.125
      }
    },
    scales: {
      r: {
          angleLines: {
              display: true,
              color: 'grey'
          },
          min: min,
          max: 5,
          grid: {
            color: 'grey',
            display: true
          },
          pointLabels: {
            color: 'black',
            font: ( context ) => {
              let width = context.chart.width;
              let size = Math.round( width /  ( fullProfile ? 40 : 32 ) );
              return {
              size: size <= 20 ? size : 20,
              weight: 700
              };
            },
          },
          ticks: {
            
          }
      }
    },
    ticks: {
      stepSize: 1,

    },
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  const coffeeSet = {
    label: 'This Coffee',
    fill: {
      value: min
    },
    backgroundColor: 'rgba(105,42,25,0.25)',
    borderColor: 'rgba(105,42,25)',
    pointBackgroundColor: 'rgba(105,42,25)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(105,42,25)',
  };

  const userSet = {
    label: 'My Flavor Profile',
    fill: {
      value: min
    },
    backgroundColor: 'rgba(0,255,0,0.25)',
    borderColor: 'rgb(0,255,0)',
    pointBackgroundColor: 'rgb(0,255,0)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(0,255,0)'
  }

  const fullData = {
    labels: [
      'Cereal',
      'Burnt',
      'Tobacco',
      'Nutmeg',
      'Cinnamon',
      'Clove',
      'Pepper',
      'Pungent',
      'Nutty',
      'Chocolate',
      ['Dark', 'Chocolate'],
      'Honey',
      'Caramel',
      ['Maple', 'Syrup'],
      'Molasses',
      'Vanilla',
      ['Overall', 'Sweet'],
      ['Sweet', 'Aromatics'],
      'Floral',
      'Black Tea',
      'Berry',
      ['Dried', 'Fruit'],
      ['Citrus', 'Fruit'],
      ['Other', 'Fruit'],
      'Sour',
      'Fermented',
      'Olive Oil',
      'Raw',
      'Vegetative',
      'Beany',
      'Papery / Musty',
      'Chemical'
    ],
    datasets: [
      {
        data: getFullDataArray( fullCoffeeFlavorProfile ),
        ...coffeeSet
      }
    ],
  };

  const simpleData = {
    labels: [
      'Roasted',
      'Spices',
      'Nutty',
      'Cocoa',
      'Sweet',
      'Floral',
      'Black Tea',
      'Fruity',
      'Sour',
      'Fermented',
      'Green',
      'Other'
    ],
    datasets: [
      {
        data: getSimpleDataArray( simpleCoffeeFlavorProfile ),
        ...coffeeSet
      }
    ],
  }

  if ( Auth.loggedIn() && !loading ) {
    simpleData.datasets.push( 
      {
        data: negativeToNegativeOne( getSimpleDataArray( user.simpleFlavorProfile ) ),
        ...userSet
      }
     );
    fullData.datasets.push(
      {
        data: negativeToNegativeOne( getFullDataArray( user.fullFlavorProfile ) ),
        ...userSet
      }
    ) 
  }

  return (
    <div>
    <button className='Button'
      onClick={toggleProfile}
    >
      { fullProfile ? 'Simple  Flavor Profile' : 'Full Flavor Profile' }
    </button>
    <div className={ styles.FlavorProfileChart }>
        { loading ? 'Loading...' : fullProfile ? <Radar data={ fullData } options={ options } /> : <Radar data={ simpleData } options={ options } /> 
        }
    </div>
  </div>
  )
}

export default FlavorProfileChart;