import React from 'react';
import dish from "../../assets/dish.jpg";
import { Modal, Image, Button } from 'semantic-ui-react';


export default ({ recipe, onClose }) => (
  
  recipe ? <Modal open={recipe} onClose={() => onClose && onClose()}>
    <Modal.Header>{recipe.title} </Modal.Header>
    <Modal.Content scrolling>
      <Image centered src={dish} size='medium'></Image>
      <Modal.Description>{recipe.description} </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button
        content ='Close'
          color="green"
       onClick = {() => onClose && onClose()}>
      </Button>
    </Modal.Actions>
  </Modal> : null

)
