import { useState, useCallback } from 'react';
import {
    getWallet,
    getWalletClient,
    getPublicClient,
    WalletContract,
    Transfer,
} from './utils';
import Header from './Header';
import NewTransfer from './NewTransfer';
import TransferList from './TransferList';
import { Address, PublicClient } from 'viem';
import ConnectWallet from './ConnectWallet';

export default function App() {
    const [publicClient, setPublicClient] = useState<PublicClient | null>(null);
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

    const connectWallet = useCallback(async () => {
        const walletClient = getWalletClient();
        const publicClient = getPublicClient();
        const accounts = await walletClient.requestAddresses();
        setAccounts(accounts);
        const wallet = await getWallet(walletClient, publicClient);
        const approvers = await wallet.read.getApprovers();
        const quorum = await wallet.read.quorum();
        const balance = await publicClient.getBalance({
            address: wallet.address,
        });
        await getTransfers(wallet, accounts);
        setPublicClient(publicClient);
        setAccounts(accounts);
        setWallet(wallet);
        setApprovers(approvers);
        setQuorum(quorum);
        setBalance(balance);
    }, [getTransfers]);

    const createTransfer = async (transfer: { amount: string; to: string }) => {
        if (!wallet || !publicClient || !accounts) return;
        const hash = await wallet.write.createTransfer(
            [BigInt(transfer.amount), transfer.to as Address],
            {
                account: accounts[0],
            }
        );
        await publicClient.waitForTransactionReceipt({ hash });
        setTransfers([]);
        getTransfers(wallet, accounts);
    };

    const approveTransfer = async (transferId: string) => {
        if (!wallet || !publicClient || !accounts) return;
        const hash = await wallet.write.approveTransfer([BigInt(transferId)], {
            account: accounts[0],
        });
        await publicClient.waitForTransactionReceipt({ hash });
        getTransfers(wallet, accounts);
    };

    if (!accounts || !wallet || !quorum || !balance || !approvers) {
        return <ConnectWallet connectWallet={connectWallet} />;
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
