import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../utils/mutations";

import StarRatingInput from "../components/StarRatingInput";
import FlavorInput from "../components/FlavorInput";
import { formatFlavor } from "../utils/flavorUtils";

import styles from './AddReview.module.css';

const AddReview = () => {
  const [formState, setFormState] = useState({
    coffee: "",
    grind: "Espresso",
    brewMethod: "Drip",
    reviewText: "",
    image: "",
  });
  
 const [rating, setRating] = useState(1);
 const [ flavorProfile, setFlavorProfile ] = useState(
  {
    cereal: { value: 0, dislike: false },
    burnt: { value: 0, dislike: false },
    tobacco: { value: 0, dislike: false },
    nutmeg: { value: 0, dislike: false },
    cinnamon: { value: 0, dislike: false },
    clove: { value: 0, dislike: false },
    pepper: { value: 0, dislike: false },
    pungent: { value: 0, dislike: false },
    nutty: { value: 0, dislike: false },
    chocolate: { value: 0, dislike: false },
    darkChocolate: { value: 0, dislike: false },
    honey: { value: 0, dislike: false },
    caramel: { value: 0, dislike: false },
    mapleSyrup: { value: 0, dislike: false },
    molasses: { value: 0, dislike: false },
    vanilla: { value: 0, dislike: false },
    overallSweet: { value: 0, dislike: false },
    sweetAromatics: { value: 0, dislike: false },
    floral: { value: 0, dislike: false },
    blackTea: { value: 0, dislike: false },
    berry: { value: 0, dislike: false },
    driedFruit: { value: 0, dislike: false },
    citrusFruit: { value: 0, dislike: false },
    otherFruit: { value: 0, dislike: false },
    sour: { value: 0, dislike: false },
    fermented: { value: 0, dislike: false },
    oliveOil: { value: 0, dislike: false },
    raw: { value: 0, dislike: false },
    vegetative: { value: 0, dislike: false },
    beany: { value: 0, dislike: false },
    paperyMusty: { value: 0, dislike: false },
    chemical: { value: 0, dislike: false },
  }
);

  const [addReview] = useMutation(ADD_REVIEW);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleChangeFlavorChange = ( event ) => {
    const { name, value } = event.target;
    setFlavorProfile( 
      {
        ...flavorProfile,
        [name]: { value, dislike: flavorProfile[name].dislike } 
      } );
  }

  const handleDislikeChange = ( event ) => {
    const { name, checked } = event.target;
    setFlavorProfile(
      {
        ...flavorProfile,
        [name]: { dislike: checked, value: flavorProfile[name].value }
      }
    )
    
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const newReview = {
        coffeeId: "636ab830620708dc1b9ec94b",
        newReview: {
          coffeeRating: rating,
          flavorProfile: {
            blackTea: formatFlavor( flavorProfile.blackTea ),
            cocoa: {
              chocolate: formatFlavor( flavorProfile.chocolate ),
              darkChocolate: formatFlavor( flavorProfile.darkChocolate ),
            },
            fermented: formatFlavor( flavorProfile.fermented ),
            floral: formatFlavor( flavorProfile.floral ),
            fruity: {
              berry: formatFlavor( flavorProfile.berry ),
              citrusFruit: formatFlavor( flavorProfile.citrusFruit ),
              driedFruit: formatFlavor( flavorProfile.driedFruit ),
              otherFruit: formatFlavor( flavorProfile.otherFruit ),
            },
            green: {
              beany: formatFlavor( flavorProfile.beany ),
              oliveOil: formatFlavor( flavorProfile.oliveOil ),
              raw: formatFlavor( flavorProfile.raw ),
              vegetative: formatFlavor( flavorProfile.vegetative ),
            },
            nutty: formatFlavor( flavorProfile.nutty ),
            other: {
              chemical: formatFlavor( flavorProfile.chemical ),
              paperyMusty: formatFlavor( flavorProfile.paperyMusty ),
            },
            roasted: {
              burnt: formatFlavor( flavorProfile.burnt ),
              cereal: formatFlavor( flavorProfile.cereal ),
              tobacco: formatFlavor( flavorProfile.tobacco ),
            },
            sour: formatFlavor( flavorProfile.sour ),
            spices: {
              cinnamon: formatFlavor( flavorProfile.cinnamon ),
              clove: formatFlavor( flavorProfile.clove ),
              nutmeg: formatFlavor( flavorProfile.nutmeg ),
              pepper: formatFlavor( flavorProfile.pepper ),
              pungent: formatFlavor( flavorProfile.pungent ),
            },
            sweet: {
              caramel: formatFlavor( flavorProfile.caramel ),
              honey: formatFlavor( flavorProfile.honey ),
              mapleSyrup: formatFlavor( flavorProfile.mapleSyrup ),
              molasses: formatFlavor( flavorProfile.molasses ),
              overallSweet: formatFlavor( flavorProfile.overallSweet ),
              sweetAromatics: formatFlavor( flavorProfile.sweetAromatics ),
              vanilla: formatFlavor( flavorProfile.vanilla ),
            }
          },
          grind: formState.grind,
          reviewText: formState.reviewText,
          brewMethod: formState.brewMethod
        }
      }

      const { data } = await addReview({
        variables: { ...newReview },
      });
      console.log( data );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className={ styles.Main }>
      <form 
        onSubmit={handleFormSubmit}
        className={ styles.Form }
      >
        <div className={ styles.Row }>
          <div className={ styles.Col }>
            <div className={ styles.FormGroup }>
              <label className={ styles.Label } htmlFor="coffee">Coffee</label><br />
              <Form.Control
                type="text"
                name="coffee"
                placeholder="Coffee"
                value={formState.coffee}
                onChange={handleChange}
              />
            </div>
            <div className={ styles.FormGroup }>
            <Form.Label className={ styles.Label } htmlFor="rating">Rating</Form.Label><br />
              <StarRatingInput rating={rating} setRating={setRating}/>
            </div>
            <div className={ styles.FormGroup }>
              <Form.Label className={ styles.Label } htmlFor="grind">Grind</Form.Label><br />
              <Form.Select
                className={ styles.Input }
                name="grind"
                value={formState.grind}
                onChange={handleChange}
              >
                <option value="Espresso">Espresso</option>
                <option value="Fine">Fine</option>
                <option value="Medium">Medium</option>
                <option value="Course">Course</option>
              </Form.Select>
            </div>
            <div className={ styles.FormGroup }>
              <Form.Label className={ styles.Label } htmlFor="brewMethod">Brew Method</Form.Label><br />
              <Form.Select
                className={ styles.Input }
                name="brewMethod"
                value={formState.brewMethod}
                onChange={handleChange}
              >
                <option value="Drip">Drip</option>
                <option value="Espresso">Espresso</option>
                <option value="French Press">French Press</option>
                <option value="Siphon">Siphon</option>
                <option value="Cold Brew">Cold Brew</option>
                <option value="Pour Over">Pour Over</option>
              </Form.Select>
            </div>
            <div className={ styles.FormGroup }>
              <Form.Label className={ styles.Label } htmlFor="reviewText">Review Text</Form.Label><br />
              <Form.Control
                className={ styles.TextArea }
                as={"textarea"}
                value={formState.reviewText}
                name='reviewText'
                onChange={handleChange}
              />
            </div>
            <div className={ styles.FormGroup }>
              <Form.Label className={ styles.Label } htmlFor="image">Image</Form.Label><br />
              <Form.Control
                type="file"
              />
            </div>
          </div>
          <FlavorInput 
            flavorProfile={flavorProfile} 
            handleChangeFlavorChange={handleChangeFlavorChange} 
            handleDislikeChange={handleDislikeChange}
          />
        </div>
        <div className={ styles.Footer }>
          <button
            className='Button'
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddReview;