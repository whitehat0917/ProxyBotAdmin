import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from "react-router-dom";

class DataTable extends Component {

    deleteItem = item => {
        let confirmDelete = window.confirm('Delete User forever?')
        if (confirmDelete) {
            const user = JSON.parse(localStorage.getItem('user'));
            fetch('http://localhost:5000/api/test/deleteUser', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': user.accessToken
                },
                body: JSON.stringify({
                    userid: item.USERID
                })
            })
                .then(response => response.json())
                .then(response => {
                    if (response.status == "success") {
                        this.props.deleteItemFromState(item.USERID)
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
                <tr key={item.USERID}>
                    <th scope="row">{item.USERID}</th>
                    <td>{item.USERNAME}</td>
                    <td>{item.PASSWORD}</td>
                    <td>{item.TYPE == 'R' ? 'Random' : 'Manual'}</td>
                    <td>{item.PROXY_COUNT}</td>
                    <td>
                        <div>
                            <Link to={'/userProxy/' + item.USERID}>
                                <Button color="success">Show</Button>
                            </Link>
                            {' '}
                            <Button color="danger" onClick={() => this.deleteItem(item)}>Del</Button>
                        </div>
                    </td>
                </tr >
            )
        })

        return (
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>User Type</th>
                        <th>Proxy Count</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </Table >
        )
    }
}
export default DataTable