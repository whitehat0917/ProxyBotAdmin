import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/AvailableIpModal'

class DataTable extends Component {

    deleteItem = item => {
        let confirmDelete = window.confirm('Delete item forever?')
        if (confirmDelete) {
            const user = JSON.parse(localStorage.getItem('user'));
            fetch('http://localhost:5000/api/test/deleteIp', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': user.accessToken
                },
                body: JSON.stringify({
                    startIp: item.IPADDRESS,
                    count: 1,
                    subnet: item.SUBNET
                })
            })
                .then(response => response.json())
                .then(response => {
                    if (response.status == "success") {
                        this.props.deleteItemFromState(item.id)
                    } else {
                        console.log('failure')
                    }
                })
                .catch(err => console.log(err))
        }

    }

    render() {
        const items = this.props.items.map(item => {
            return (
                <tr key={item.IPID}>
                    <th scope="row">{item.IPID}</th>
                    <td>{item.IPADDRESS}</td>
                    <td>{item.SUBNET}</td>
                    <td>{item.MUL}</td>
                    <td>{item.FREE_IP}</td>
                    <td>
                        <div>
                            {/* <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState} /> */}
                            {' '}
                            <Button color="danger" onClick={() => this.deleteItem(item)}>Del</Button>
                        </div>
                    </td>
                </tr>
            )
        })

        return (
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>IP Address</th>
                        <th>Subnet IP Address</th>
                        <th>Multi Amount</th>
                        <th>Available Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </Table>
        )
    }
}
export default DataTable