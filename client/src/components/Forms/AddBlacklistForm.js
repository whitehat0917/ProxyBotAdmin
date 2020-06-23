import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import ToastAlert from '../Toast/Toast'

class AddBlacklistForm extends React.Component {
    state = {
        ID: 0,
        URL: '',
        toastShow: false,
        alertDescription: ""
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitFormAdd = e => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('user'));
        fetch('http://localhost:5000/api/test/addBlacklist', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.accessToken
            },
            body: JSON.stringify({
                url: this.state.URL
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.status == "success") {
                    this.props.addItemToState()
                    this.props.toggle()
                } else {
                    console.log('failure')
                    this.setState({ toastShow: true, alertDescription: response.status })
                    // this.props.toggle()
                }
            })
            .catch(err => console.log(err))
    }

    submitFormEdit = e => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('user'));
        fetch('http://localhost:5000/api/test/editBlacklist', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.accessToken
            },
            body: JSON.stringify({
                id: this.state.ID,
                url: this.state.URL
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.status == "success") {
                    this.props.updateState({ ID: this.state.ID, URL: this.state.URL, created_at: this.props.item.created_at })
                    this.props.toggle()
                } else {
                    console.log('failure')
                    this.setState({ toastShow: true, alertDescription: response.status })
                }
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        // if item exists, populate the state with proper data
        if (this.props.item) {
            const { ID, URL } = this.props.item
            this.setState({ ID, URL })
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                    <FormGroup>
                        <Label for="URL">URL</Label>
                        <Input type="text" name="URL" id="URL" onChange={this.onChange} value={this.state.URL === null ? '' : this.state.URL} />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
                <ToastAlert show={this.state.toastShow} description={this.state.alertDescription}></ToastAlert>
            </div>
        );
    }
}
const mapStateToProps = (state) => state.admin;

export default connect(mapStateToProps)(AddBlacklistForm);