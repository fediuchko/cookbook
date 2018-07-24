import React from 'react';
import dish from "../../assets/dish.jpg";
import { Card, Image, Button, CardContent, Rating } from 'semantic-ui-react';

export default ({ recipes, onEdit, onDelete, onView, onRate }) =>
    recipes && recipes.map((recipe, index) => (
        <Card fluid key={index}>
            <Card.Content>
                <Image
                    size="tiny"
                    floated="left"
                    src={dish}
                />
                <Rating
                    maxRating={5}
                    clearable
                    onRate={(value) => onRate && onRate(value, recipe._id)}
                />
                <Button
                    circular
                    color="red"
                    icon='delete'
                    floated='right'
                    onClick={() => onDelete && onDelete(recipe._id)}
                />
                 <Button
                    circular
                    icon='edit'
                    floated='right'
                    onClick={() => onEdit && onEdit(recipe._id)}
                />
                <Button
                    circular
                    icon='eye'
                    floated='right'
                    onClick={() => onView && onView(recipe._id)}
                
                />
                <Card.Header
                    style={{ marginTop: "1.5rem" }}
                >
                    {recipe.title}
                </Card.Header>
                <Card.Description
                    textAlign='left'
                    className ='recipe-description'>
            {recipe.description}
                </Card.Description>
            </Card.Content>
        </Card>

    ));

