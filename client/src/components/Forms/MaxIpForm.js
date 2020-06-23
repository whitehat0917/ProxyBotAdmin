import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import ToastAlert from '../Toast/Toast'

class MaxIpForm extends React.Component {
    state = {
        maxIp: this.props.multiIp,
        toastShow: false,
        alertDescription: ""
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitFormAdd = e => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('user'));
        fetch('http://localhost:5000/api/test/setMaxIp', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.accessToken
            },
            body: JSON.stringify({
                count: this.state.maxIp,
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response.status);
                if (response.status == "success") {
                    this.props.addItemToState({ maxIp: this.state.maxIp })
                    this.props.toggle()
                } else {
                    console.log('failure')
                    // this.props.toggle()
                    this.setState({ toastShow: true, alertDescription: response.status })
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.submitFormAdd}>
                    <FormGroup>
                        <Label for="maxIp">Max Ip Count</Label>
                        <Input type="number" name="maxIp" id="maxIp" onChange={this.onChange} value={this.state.maxIp} />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
                <ToastAlert show={this.state.toastShow} description={this.state.alertDescription}></ToastAlert>
            </div>
        );
    }
}
const mapStateToProps = (state) => state.admin;

export default connect(mapStateToProps)(MaxIpForm);