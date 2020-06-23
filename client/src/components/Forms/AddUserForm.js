import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import ToastAlert from '../Toast/Toast'

class AddUserForm extends React.Component {
    state = {
        USERID: 0,
        USERNAME: '',
        PASSWORD: '',
        toastShow: false,
        alertDescription: ""
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitFormAdd = e => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('user'));
        fetch('http://localhost:5000/api/test/addUser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.accessToken
            },
            body: JSON.stringify({
                username: this.state.USERNAME,
                password: this.state.PASSWORD
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
        fetch('http://localhost:5000/api/test/editUserProxy', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.accessToken
            },
            body: JSON.stringify({
                id: this.state.ID,
                port: this.state.PORT,
                days: this.state.DAYS
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.status == "success") {
                    this.props.updateState({ ID: this.state.ID, IP: this.props.item.IP, PORT: this.state.PORT, USERNAME: this.props.item.USERNAME, PASSWORD: this.props.item.PASSWORD, DAYS: this.state.DAYS })
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
            const { USERID, USERNAME, PASSWORD } = this.props.item
            this.setState({ USERID, USERNAME, PASSWORD })
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                    <FormGroup>
                        <Label for="USERNAME">Username</Label>
                        <Input type="text" name="USERNAME" id="USERNAME" onChange={this.onChange} value={this.state.USERNAME === null ? '' : this.state.USERNAME} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="PASSWORD">Password</Label>
                        <Input type="text" name="PASSWORD" id="PASSWORD" onChange={this.onChange} value={this.state.PASSWORD === null ? '' : this.state.PASSWORD} />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
                <ToastAlert show={this.state.toastShow} description={this.state.alertDescription}></ToastAlert>
            </div>
        );
    }
}
const mapStateToProps = (state) => state.admin;

export default connect(mapStateToProps)(AddUserForm);