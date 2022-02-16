import React, { useEffect, useState } from 'react'
import { getWeb3, getWallet } from './utils'
import Header from './Header'
import NewTransfer from './NewTransfer'
import TransferList from './TransferList'

function App() {
    const [web3, setWeb3] = useState(undefined)
    const [accounts, setAccounts] = useState(undefined)
    const [wallet, setWallet] = useState(undefined)
    const [approvers, setApprovers] = useState([])
    const [quorum, setQuorum] = useState(undefined)
    const [transfers, setTransfers] = useState([])
    const [balance, setBalance] = useState(undefined)

    useEffect(() => {
        const init = async () => {
            const web3 = await getWeb3()
            const accounts = await web3.eth.getAccounts()
            const wallet = await getWallet(web3)
            const approvers = await wallet.methods.getApprovers().call()
            const quorum = await wallet.methods.quorum().call()
            const balance = await web3.eth.getBalance(wallet.options.address)
            await getTransfer(wallet, accounts)
            setWeb3(web3)
            setAccounts(accounts)
            setWallet(wallet)
            setApprovers(approvers)
            setQuorum(quorum)
            setBalance(balance)
        }
        init()
    }, [])

    const getTransfer = async (wallet, accounts) => {
        const transfers = await wallet.methods.getTransfers().call()
        await transfers.map(async (transfer) => {
            const isTrasferApprovedByCurrentUser = await wallet.methods
                .approvals(accounts[0], transfer.id)
                .call()
            let newTransferArray = {
                id: transfer.id,
                amount: transfer.amount,
                to: transfer.to,
                approvals: transfer.approvals,
                sent: transfer.sent,
                isTrasferApprovedByCurrentUser: isTrasferApprovedByCurrentUser,
            }

            setTransfers((transfers) => [...transfers, newTransferArray])
        })
    }

    const createTransfer = (transfer) => {
        wallet.methods
            .createTransfer(transfer.amount, transfer.to)
            .send({ from: accounts[0] })
        setTransfers([])
        getTransfer(wallet, accounts)
    }

    const approveTransfer = (transferId) => {
        wallet.methods.approveTransfer(transferId).send({ from: accounts[0] })
        setTransfers([])
        getTransfer(wallet, accounts)
    }

    if (
        typeof web3 === 'undefined' ||
        typeof accounts === 'undefined' ||
        typeof wallet === 'undefined' ||
        approvers.length === 0 ||
        typeof quorum === 'undefined'
    ) {
        return <div>Loading ........</div>
    }

    return (
        <div className="container p-3 ">
            <h1 className="display-4 fw-bold text-center bg-primary text-white p-5">
                Multisig Wallet
            </h1>
            <Header approvers={approvers} quorum={quorum} balance={balance} />
            <NewTransfer createTransfer={createTransfer} />
            <TransferList
                transfers={transfers}
                approveTransfer={approveTransfer}
            />
        </div>
    )
}

export default App
