import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import ToastAlert from '../Toast/Toast'

class AddProxyForm extends React.Component {
    state = {
        ID: 0,
        PORT: '',
        DAYS: '',
        toastShow: false,
        alertDescription: ""
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitFormAdd = e => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('user'));
        fetch('http://localhost:5000/api/test/addUserProxy', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.accessToken
            },
            body: JSON.stringify({
                userid: this.props.userid,
                port: this.state.PORT,
                days: this.state.DAYS
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
            const { ID, PORT, DAYS } = this.props.item
            this.setState({ ID, PORT, DAYS })
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                    <FormGroup>
                        <Label for="PORT">Port</Label>
                        <Input type="text" name="PORT" id="PORT" onChange={this.onChange} value={this.state.PORT === null ? '' : this.state.PORT} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="DAYS">Days</Label>
                        <Input type="number" name="DAYS" id="DAYS" onChange={this.onChange} value={this.state.DAYS === null ? '' : this.state.DAYS} />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
                <ToastAlert show={this.state.toastShow} description={this.state.alertDescription}></ToastAlert>
            </div>
        );
    }
}
const mapStateToProps = (state) => state.admin;

export default connect(mapStateToProps)(AddProxyForm);