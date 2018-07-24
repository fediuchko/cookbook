import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Container, Grid } from 'semantic-ui-react';
import { isRecipesFetching } from './../Recipes/RecipesReducer';
import { addRecipe } from '../Recipes/RecipesActions';
import RecipeForm from '../../components/RecipeForm/RecipeForm';
// import Recipes from '../Recipes/Recipes';
import { connect } from 'react-redux';

class Recipe extends React.Component {
    handleSubmit = (data) => {
        const { actions } = this.props;
        actions.addRecipe(data);
    }

    handleCancel = () => {
        this.props.history.push('/recipes');
    }

    render() {
        const { isFetching } = this.props;

        return <Container>
            <Grid centered columns={2}>
                <Grid.Column>
                    <RecipeForm
                        disable={isFetching}
                        title="Specife new recipe"
                        onSubmit={this.handleSubmit}
                        onCancel={this.handleCancel}
                        submitButtonTitle="Add recipe"
                        submitButtonIcon="plus"
                        cancelButtonTitle='Go back to recipe'
                        cancelButtonIcon="arrow left"
                    />
                </Grid.Column>
            </Grid>
        </Container>
    }
}

Recipe.propTypes = {
    isFetching:PropTypes.bool,
    actions: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({addRecipe}, dispatch)
});

const mapStateToProps = state => ({
    isFetching: isRecipesFetching(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
