import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Form, Image, Header, Button } from 'semantic-ui-react';
import dish from '../../assets/dish.jpg';

class RecipeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.innitialeValues.title,
            description: props.innitialeValues.description,
        };
    }

    handleFieldChange = ({ target }) => {
        this.setState(state => ({
            ...state,
            [target.name]: target.value
        }));
    }

    handleCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    handleSubmit = () => {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state);
        }
    }

    isSubmitAllowed = () => {
        return this.state.title && this.state.description;
    }

    render() {
        const { disabled, submitButtonTitle, submitButtonIcon, cancelButtonIcon, cancelButtonTitle, title: formTitle } = this.props;
        const { title, description } = this.state;
        return (<Segment.Group raised>
            <Header block attached="top" as="h3">
                {formTitle}
            </Header>

            <Segment attached>
                <Image centered src={dish} size="small" />
                <Form>
                    <Form.Input
                        label='Title'
                        name='title'
                        value={title}
                        autoComplete='off'
                        placeholder='Some fancy title'
                        onChange={this.handleFieldChange}
                        disabled={disabled}
                    />
                    <Form.TextArea
                        label='Description'
                        name='description'
                        value={description}
                        placeholder='Defalt description'
                        onChange={this.handleFieldChange}
                        disabled={disabled}
                    />
                </Form>
            </Segment>
            <Segment attached textAlign='right'>
                <Button icon={cancelButtonIcon} content={cancelButtonTitle} onClick={this.handleCancel} />
                <Button icon={submitButtonIcon} color='green' content={submitButtonTitle} onClick={this.handleSubmit} disabled={!this.isSubmitAllowed()} />
            </Segment>
        </Segment.Group>)
    }
}

RecipeForm.defaultProps = {
    innitialeValues: {
        title: '',
        description: ''
    }
};

RecipeForm.propTypes = {
    disabled: PropTypes.bool,
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitButtonIcon: PropTypes.string.isRequired,
    submitButtonTitle: PropTypes.string.isRequired,
    cancelButtonIcon: PropTypes.string.isRequired,
    cancelButtonTitle: PropTypes.string.isRequired,
    innitialeValues: PropTypes.shape({
        title: PropTypes.string,
        defaultProps: PropTypes.string
    })
}

export default connect()(RecipeForm);