import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/BlacklistModal'

class BlacklistDataTable extends Component {

    deleteItem = item => {
        let confirmDelete = window.confirm('Delete URL forever?')
        if (confirmDelete) {
            const user = JSON.parse(localStorage.getItem('user'));
            fetch('http://localhost:5000/api/test/deleteBlacklist', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': user.accessToken
                },
                body: JSON.stringify({
                    url: item.URL,
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
                    <td>{item.URL}</td>
                    <td>{new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                    }).format(new Date(item.created_at))}</td>
                    <td>
                        <div className="d-flex justify-content-center">
                            <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState} />
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
                        <th>URL</th>
                        <th>Created At</th>
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
export default BlacklistDataTable