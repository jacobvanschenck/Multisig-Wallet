import { useEffect, useState, useCallback } from 'react';
import { getWallet, getClients, WalletContract, Transfer } from './utils';
import Header from './Header';
import NewTransfer from './NewTransfer';
import TransferList from './TransferList';
import { Address } from 'viem';

export default function App() {
    const [accounts, setAccounts] = useState<Array<Address> | null>(null);
    const [wallet, setWallet] = useState<WalletContract | null>(null);
    const [approvers, setApprovers] = useState<readonly Address[] | null>(null);
    const [quorum, setQuorum] = useState<bigint | null>(null);
    const [transfers, setTransfers] = useState<Array<Transfer>>([]);
    const [balance, setBalance] = useState<bigint | null>(null);

    const getTransfers = useCallback(
        async (wallet: WalletContract, accounts: Array<Address>) => {
            setTransfers([]);
            const transfers = await wallet.read.getTransfers();
            transfers.forEach(async (transfer) => {
                const isTrasferApprovedByCurrentUser =
                    await wallet.read.approvals([accounts[0], transfer.id]);
                return {
                    id: transfer.id,
                    amount: transfer.amount,
                    to: transfer.to,
                    approvals: transfer.approvals,
                    sent: transfer.sent,
                    isTrasferApprovedByCurrentUser:
                        isTrasferApprovedByCurrentUser,
                };
            });
            setTransfers(transfers);
        },
        []
    );

    const init = useCallback(async () => {
        const { walletClient, publicClient } = getClients();
        const accounts = await walletClient.requestAddresses();
        const wallet = await getWallet(walletClient, publicClient);
        const approvers = await wallet.read.getApprovers();
        const quorum = await wallet.read.quorum();
        const balance = await publicClient.getBalance({
            address: wallet.address,
        });
        await getTransfers(wallet, accounts);
        setAccounts(accounts);
        setWallet(wallet);
        setApprovers(approvers);
        setQuorum(quorum);
        setBalance(balance);
    }, [getTransfers]);

    useEffect(() => {
        init();
    }, [init]);

    const createTransfer = async (transfer: { amount: string; to: string }) => {
        if (!wallet) return;
        wallet.write.createTransfer([transfer.amount, transfer.to], {
            account: accounts[0],
        });
        setTransfers([]);
        getTransfers(wallet, accounts);
    };

    const approveTransfer = (transferId: bigint) => {
        if (!wallet) return;
        wallet.write.approveTransfer([transferId], { account: accounts[0] });
        getTransfers(wallet, accounts);
    };

    if (!accounts || !wallet || !quorum || !balance || !approvers) {
        return <div>Loading ........</div>;
    }

    return (
        <div className="w-screen h-screen bg-slate-50">
            <div className="max-w-[700px] mx-auto pt-8 flex flex-col gap-6">
                <h1 className="text-slate-700 text-3xl font-bold">
                    Multisig Wallet
                </h1>
                <Header
                    approvers={approvers}
                    quorum={quorum}
                    balance={balance}
                />
                <NewTransfer createTransfer={createTransfer} />
                <TransferList
                    transfers={transfers}
                    approveTransfer={approveTransfer}
                />
            </div>
        </div>
    );
}
