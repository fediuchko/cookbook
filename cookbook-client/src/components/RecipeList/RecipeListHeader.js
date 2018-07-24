import React from 'react';
import { Conteiner, Statistic, Button, Container } from 'semantic-ui-react';

export default ({ onCreate, listLenght }) => (
  <Container style={{ display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
    <Statistic size="mini">
      <Statistic.Value>{listLenght}</Statistic.Value>
      <Statistic.Label>{listLenght === 1 ? 'recipe' : 'recipes'}</Statistic.Label>
    </Statistic>
    <Button
      content ='Add recipe'
        color="green"
        icon='plus'
       onClick = {() => onCreate && onCreate()}>
    </Button>
  </Container>
)


