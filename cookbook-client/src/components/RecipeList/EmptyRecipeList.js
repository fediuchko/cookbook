import chef from "../../assets/chef.jpg";
import React from 'react'
import { Header, Image, Button, Container } from 'semantic-ui-react'

export default ({ onCreate }) => (
  <Container>
    <Image centered rounded src={chef} size='medium'></Image>
    <Header textAlign='center' as='h3'> Your cookbook is empty</Header>
    <Button
      size='big'
      content='Quicly'
      color='green'
      onClick={() => onCreate && onCreate()}
    >
    </Button>
  </Container>
)


