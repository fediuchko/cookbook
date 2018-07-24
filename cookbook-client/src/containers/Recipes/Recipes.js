import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Grid, Image, Segment,Search,Icon, Input, Dropdown } from 'semantic-ui-react';
import { fetchAllRecipes, deleteRecipe } from './RecipesActions';
import { allRecipes, isRecipesFetching } from './RecipesReducer';
import logo from '../../assets/logo.png';
import RecipeList from '../../components/RecipeList/RecipeList';
import RecipeListHeader from '../../components/RecipeList/RecipeListHeader';
import EmptyRecipeList from '../../components/RecipeList/EmptyRecipeList';
import RecipeModal from '../../components/RecipeModal/RecipeModal';
import './Recipes.css';

class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeRecipe: null };
    }

    componentDidMount() {
        this.props.actions.fetchAllRecipes();
    }
    handleDelete=id=> {
        this.props.actions.deleteRecipe(id);
    }
    handleEdit = id => {
        this.props.history.push(`/recipes/${id}`);
    }
    handleRecipeCreate = () => {
        this.props.history.push(`/recipes/new`);
    }
    toggleResipeModal = id => {
        this.setState({ activeRecipe: this.props.allRecipes.find(r => r._id === id) });
    }
    handleModalClose() {
        this.toggleResipeModal(null);
    }

    handleRating = (value, recipeId) => {
        this.handleEdit(recipeId)
    }
    render() {
        const { isFetching, allRecipes } = this.props;
        const { activeRecipe } = this.state;
        const { isLoading, value, results } = this.state;

        console.log ("allRecipes render - "+  allRecipes);
        return (
            <Container>
                <Grid columns={2} divided>
                <Grid.Row stretched>
                 <Grid.Column>
                 <Segment>   <Image src={logo} centered></Image > </Segment>
                 <Segment>   <Input icon={<Icon name='search' inverted circular link />} placeholder='Search...' />
)                            </Segment>
          <Segment> <Dropdown text='Sort by' icon='filter' floating labeled button className='icon'>
    <Dropdown.Menu>
      <Dropdown.Header icon='tags' content='Sort by' />
      <Dropdown.Item>Rating</Dropdown.Item>
      <Dropdown.Item>Default</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  </Segment>
                 </Grid.Column>
                        <Grid.Column>
                            <Segment
                                raised
                                padded
                                textAlign='center'
                                loading={isFetching}>
                                {!(allRecipes && allRecipes.length) && !isFetching
                                    ? <EmptyRecipeList
                                        onCreate={this.handleRecipeCreate} />
                                    : <Fragment>
                                        <RecipeListHeader
                                            onCreate={this.handleRecipeCreate}
                                            listLength={allRecipes.length} />
                                        <RecipeList
                                            recipes={allRecipes}
                                            onView={this.toggleResipeModal.bind()}
                                            onDelete={this.handleDelete.bind()}
                                            onEdit={this.handleEdit.bind()} 
                                            onRate={this.handleRating}/>
                                    </Fragment>
                                }
                            </Segment>
                        </Grid.Column>
                        {/* <Grid.Column width={4}>
                        <Image src={logo} ></Image >
                         {/*  */}
          </Grid.Row>   
                </Grid>
                <RecipeModal
                    recipe={activeRecipe}
                    onClose={this.handleModalClose} />
            </Container>
        )
    }
}
Recipes.propTypes = {
    allRecipes: PropTypes.array,
    isFetching: PropTypes.bool,
    actions: PropTypes.object
}
const mapStateToProps = state => ({
    allRecipes: allRecipes(state),
    isFetching: isRecipesFetching(state)
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ fetchAllRecipes, deleteRecipe }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Recipes)