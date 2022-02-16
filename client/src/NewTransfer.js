import React, { useState } from 'react'

function NewTransfer({ createTransfer }) {
    const [transfer, setTransfer] = useState('undefined')

    const updateTransfer = (e, field) => {
        const value = e.target.value
        setTransfer({ ...transfer, [field]: value })
    }

    const submit = (e) => {
        e.preventDefault()
        createTransfer(transfer)
    }

    return (
        <div className="container">
            <h2 className="p-2 bg-primary text-white">Create Transfer</h2>
            <form className="container" onSubmit={(e) => submit(e)}>
                <label className="form-label" htmlFor="amount">
                    Amount
                </label>
                <input
                    id="amount"
                    className="form-control mb-3"
                    type="text"
                    onChange={(e) => updateTransfer(e, 'amount')}
                />
                <label htmlFor="to">To</label>
                <input
                    id="to"
                    className="form-control mb-3"
                    type="text"
                    onChange={(e) => updateTransfer(e, 'to')}
                />
                <button className="btn btn-primary mb-5">Submit</button>
            </form>
        </div>
    )
}

export default NewTransfer
