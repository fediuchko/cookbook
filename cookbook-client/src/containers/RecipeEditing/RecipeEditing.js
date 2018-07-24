import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRecipe, updateRecipe } from '../Recipes/RecipesActions';
import { isRecipesFetching, activeRecipe } from './../Recipes/RecipesReducer';
import RecipeForm from '../../components/RecipeForm/RecipeForm';
import { Container, Grid } from 'semantic-ui-react';

class RecipeEditing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipeToFetch: null
        };
    }

    static getDrivedStateFromProps(props, state) {
        if (state.recipeToFetch !== props.mutch.params.id) {
            return {
                recipeToFetch: props.mutch.params.id
            };
        }
        return null;
    }
    componentDidMount() {
        if (this.state.recipeToFetch) {
            this.props.action.fetchRecipe(this.state.recipeToFetch);
        }
    }
    componentDidUpdate() {
        if (this.state.recipe && (this.state.recipeToFetch !== this.propsrecipe._id)) {
            this.props.action.fetchRecipe(this.state.recipeToFetch);
        }
    }

    handleSubmit = data => {
        this.props.action.updateRecipe({
            ...this.props.recipe,
            ...data
        });
    }


    handleCancel = () => {
        this.props.history.push("/recipes");
    }

    render() {
        const { isFetching, recipe } = this.props;

        return <Container>
            <Grid centered columns={2}>
                <Grid.Column>{
                    !!recipe && <RecipeForm
                        dissable={isFetching}
                        title="Edit recipe"
                        onSubmit={this.handleSubmit}
                        onCancel={this.handleCancel}
                        submitButtonTitle="Update recipe"
                        submitButtonIcon="save outline"
                        initialValues={recipe}
                        cancelButtonTitle='Go back to recipe'
                        cancelButtonIcon="arrow left"
                    />
                }
                </Grid.Column>
            </Grid>
        </Container>
    }
}
const mapDispatchToProps = dispatch => ({
    action: bindActionCreators({ fetchRecipe, updateRecipe }, dispatch)
});
const mapStateToProps = state => ({
    recipe: activeRecipe(state),
    isFetching: isRecipesFetching(state)
});

RecipeEditing.propTypes = {
    recipe: PropTypes.object,
    isFetching: PropTypes.bool,
    action: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEditing);