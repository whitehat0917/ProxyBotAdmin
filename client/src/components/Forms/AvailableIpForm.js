import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

class AddEditForm extends React.Component {
    state = {
        IPID: 0,
        IPADDRESS: '',
        count: '',
        subnet: ''
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitFormAdd = e => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('user'));
        fetch('http://localhost:5000/api/test/addIp', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.accessToken
            },
            body: JSON.stringify({
                id: this.state.IPID,
                startIp: this.state.IPADDRESS,
                count: this.state.count,
                subnet: this.state.subnet
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log("123-" + this.props.multiIp);
                if (response.status == "success") {
                    console.log(this.props.multiIp);
                    this.props.addItemToState({ IPID: this.state.IPID, IPADDRESS: this.state.IPADDRESS, SUBNET: this.state.subnet, MUL: this.props.multiIp, FREE_IP: this.props.multiIp })
                    this.props.toggle()
                } else {
                    console.log('failure')
                    this.props.toggle()
                }
            })
            .catch(err => console.log(err))
    }

    submitFormEdit = e => {
        e.preventDefault()
        fetch('http://localhost:3000/crud', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                phone: this.state.phone,
                location: this.state.location,
                hobby: this.state.hobby
            })
        })
            .then(response => response.json())
            .then(item => {
                if (Array.isArray(item)) {
                    // console.log(item[0])
                    this.props.updateState(item[0])
                    this.props.toggle()
                } else {
                    console.log('failure')
                }
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        // if item exists, populate the state with proper data
        if (this.props.item) {
            const { IPID, IPADDRESS, SUBNET } = this.props.item
            this.setState({ IPID, IPADDRESS, SUBNET })
        }
    }

    render() {
        return (
            <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                <FormGroup>
                    <Label for="IPADDRESS">Start IP Address</Label>
                    <Input type="text" name="IPADDRESS" id="IPADDRESS" onChange={this.onChange} value={this.state.IPADDRESS === null ? '' : this.state.IPADDRESS} />
                </FormGroup>
                <FormGroup>
                    <Label for="count">Count</Label>
                    <Input type="number" name="count" id="count" onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="subnet">Subnet Address</Label>
                    <Input type="text" name="subnet" id="subnet" onChange={this.onChange} value={this.state.SUBNET === null ? '' : this.state.SUBNET} />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}
const mapStateToProps = (state) => state.admin;

export default connect(mapStateToProps)(AddEditForm);