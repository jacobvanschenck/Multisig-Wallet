import React from 'react'

function Header({ approvers, quorum, balance }) {
    return (
        <header className="container m-3 mb-4">
            <h2>Approvers</h2>
            <ul>
                {approvers.map((element) => (
                    <li>{element}</li>
                ))}
            </ul>
            <h2>Quorum: {quorum}</h2>
            <h2>Wallet Balance: {balance}</h2>
        </header>
    )
}

export default Header
