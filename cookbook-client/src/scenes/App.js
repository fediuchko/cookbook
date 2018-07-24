import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import createStore from './../store';
import history from '../store/history';
import RecipeCreation from './../containers/RecipeCreation/RecipeCreation';
import Recipes from './../containers/Recipes/Recipes';
import RecipeEditing from './../containers/RecipeEditing/RecipeEditing';
import './App.css'

const store = createStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact render={() => <Redirect to='recipes' />} />
            <Route path='/recipes/new' component={RecipeCreation} exact />
            <Route path='/recipes/:id' component={RecipeEditing} />
            <Route path='/recipes' component={Recipes} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}


export default App;
