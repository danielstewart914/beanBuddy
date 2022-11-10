import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// import { useMutation } from "@apollo/client";
// import { ADD_REVIEW } from "../utils/mutations";

const AddReview = () => {
  const [formState, setFormState] = useState({
    coffee: "",
    coffeeRating: "",
    grind: "",
    brewMethod: "",
    reviewText: "",
    image: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <main>
      <div className="flex-row justify-center mb-4">
        <div className="col-12 col-md-10 mb-3 p-3">
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Label htmlFor="coffee">Coffee</Form.Label>
              <Form.Control
                type="text"
                name="coffee"
                placeholder="Coffee"
                value={formState.coffee}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="coffeeRating">Coffee Rating</Form.Label>
              <Form.Select
                name="coffeeRating"
                value={formState.coffeeRating}
                onChange={handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="grind">Grind</Form.Label>
              <Form.Control
                type="text"
                name="grind"
                placeholder="Grind"
                value={formState.grind}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="brewMethod">Brew Method</Form.Label>
              <Form.Control
                type="text"
                name="brewMethod"
                placeholder="Brew Method"
                value={formState.brewMethod}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="reviewText">Review Text</Form.Label>
              <Form.Control
                as={"textarea"}
                rows={3}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="image">Image</Form.Label>
              <Form.Control
                type="file"
              />
            </Form.Group>
            <Button

              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default AddReview;