import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import countries from './countries.json';
import { ADD_COFFEE } from '../../utils/mutations';
import { ALL_COFFEE, COFFEE } from '../../utils/queries';

const AddCoffeeDialog = ({ open, onClose, styles }) => {

  const [ errorMessage, setErrorMessage ] = useState( '' );

  const handleClose = () => {
    onClose('');
  };

  const [addCoffee] = useMutation( ADD_COFFEE, {
    refetchQueries: [ ALL_COFFEE, COFFEE ]
  } );

  const [formState, setFormState] = useState(
    {
      brand: '',
      name: '',
      beanType: '',
      roast: '',
      origin: ''
    }
  );

  const handleChange = ( event ) => {
    const { name, value } = event.target;
    setErrorMessage('');
    setFormState(
      {
        ...formState,
        [name]: value,
      }
    );
  };

  const handleFormSubmit = async ( event ) => {
    event.preventDefault();

    if ( !formState.brand ) {
      setErrorMessage( 'You must Enter a Brand / Farm!' );
      return;
    }
    
    if ( !formState.name ) {
      setErrorMessage( 'You must Enter a Name!' );
      return;
    }

    if ( !formState.roast ) {
      setErrorMessage( 'You must Enter a Roast!' );
      return;
    }

    try {
      const { data } = await addCoffee( 
        {
          variables: {
            coffee: { ...formState }
          }
        }
      );
      onClose( data.addCoffee._id );
    } catch ( err ) {
      console.error( err );
    }
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle
        className={ styles.Header }
      >Add Coffee</DialogTitle>
      <form 
        className={ styles.Form }
        style={ { padding: '4rem 8rem', backgroundColor: '#D9D6D1' } }
        onSubmit={handleFormSubmit}
      >
        <div className={ styles.FormGroup }>
          <label className={ styles.Label } htmlFor='brand'>Brand / Farm</label>
          <input
            className={ styles.Input }
            value={formState.brand}
            name='brand'
            type='input'
            onChange={handleChange}
          />
        </div>
        <div className={ styles.FormGroup }>
          <label className={ styles.Label } htmlFor='name'>Coffee Name</label>
          <input
            className={ styles.Input }
            value={formState.name}
            name='name'
            type='input'
            onChange={handleChange}
          />
        </div>
        <div className={ styles.FormGroup }>
          <label className={ styles.Label } htmlFor='beanType'>Bean Type</label>
          <select
            className={ styles.Input }
            value={formState.beanType}
            name='beanType'
            onChange={handleChange}
          >
            <option defaultValue='' hidden>Select Bean Type</option>
            <option value='Arabica'>Arabica - Most Common</option>
            <option value='Robusta'>Robusta - Less Common</option>
            <option value='Excelsa'>Excelsa - Rare</option>
            <option value='Liberica'>Liberica - Rare</option>
          </select>
        </div>
        <div className={ styles.FormGroup }>
          <label className={ styles.Label } htmlFor='roast'>Roast</label>
          <select
            className={ styles.Input }
            value={formState.roast}
            name='roast'
            onChange={handleChange}
          >
            <option defaultValue='' hidden>Select Roast</option>
            <option value='Light'>Light</option>
            <option value='Medium'>Medium</option>
            <option value='Dark'>Dark</option>
            <option value='Extra Dark'>Extra Dark</option>
          </select>
        </div>
        <div className={ styles.FormGroup }>
          <label className={ styles.Label } htmlFor='origin'>Country of Origin</label>
          <select
            className={ styles.Input }
            value={formState.origin}
            name='origin'
            onChange={handleChange}
          >
            <option defaultValue='' hidden>Select Country of Origin</option>
            { countries.map( country => <option value={country} key={country}>{country}</option> ) }
          </select>
        </div>
        <div className={ styles.Error }>
          { errorMessage }
        </div>
        <div>
          <button
            className='Button'
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </Dialog>
  )

}

export default AddCoffeeDialog;