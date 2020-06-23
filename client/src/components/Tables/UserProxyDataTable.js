import React, { Component } from 'react'
import { Table, Button } from 'reactstrap'
import ModalForm from '../Modals/AddProxyModal'

class DataTable extends Component {
    constructor(props) {
        super(props)
    }

    deleteItem = item => {
        let confirmDelete = window.confirm('Delete Proxy forever?')
        if (confirmDelete) {
            const user = JSON.parse(localStorage.getItem('user'));
            fetch('http://localhost:5000/api/test/deleteUserProxy', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': user.accessToken
                },
                body: JSON.stringify({
                    id: item.ID
                })
            })
                .then(response => response.json())
                .then(response => {
                    if (response.status == "success") {
                        this.props.deleteItemFromState(item.ID)
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
                <tr key={item.ID}>
                    <th scope="row">{item.ID}</th>
                    <td>{item.IP}</td>
                    <td>{item.PORT}</td>
                    <td>{item.USERNAME}</td>
                    <td>{item.PASSWORD}</td>
                    <td>{item.DAYS}</td>
                    <td>
                        <div>
                            <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState} userid={this.props.userid} />
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
                        <th>Port</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Days</th>
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