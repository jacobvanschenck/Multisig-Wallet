import React from 'react'

function TransferList({ transfers, approveTransfer }) {
    return (
        <div className="container">
            <h2 className="p-2 bg-primary text-white">Transfers</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>To</th>
                        <th>Approvals</th>
                        <th>Sent</th>
                    </tr>
                </thead>
                <tbody>
                    {transfers.map((transfer) => (
                        <tr key={transfer.id}>
                            <td>{transfer.id}</td>
                            <td>{transfer.amount}</td>
                            <td>{transfer.to}</td>
                            <td>
                                {transfer.approvals}
                                <button
                                    className="btn btn-primary btn-sm m-3"
                                    id="approved"
                                    disabled={
                                        transfer.isTrasferApprovedByCurrentUser
                                    }
                                    onClick={() => approveTransfer(transfer.id)}
                                >
                                    approve
                                </button>
                            </td>
                            <td>{transfer.sent ? 'yes' : 'no'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TransferList
