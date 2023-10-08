import { PrimaryButton } from './components/PrimaryButton';
import { Transfer } from './utils';

type TransferListProps = {
    transfers: Array<Transfer>;
    approveTransfer: (id: string) => Promise<void>;
};

function TransferList({ transfers, approveTransfer }: TransferListProps) {
    return (
        <div className="py-4 px-8 rounded-md bg-slate-100 border-[1px] border-slate-200">
            <h2 className="pb-4 text-lg font-bold text-slate-600">Transfers</h2>
            <table className="table-auto">
                <thead>
                    <tr className="text-left">
                        <th className="px-1 text-xs text-slate-300">ID</th>
                        <th className="px-1 text-xs text-slate-300">Amount</th>
                        <th className="px-1 text-xs text-slate-300">To</th>
                        <th className="px-1 text-xs text-slate-300">
                            Approvals
                        </th>
                        <th className="px-1 text-xs text-slate-300">Sent</th>
                    </tr>
                </thead>
                <tbody>
                    {transfers.map((transfer: Transfer) => (
                        <tr
                            className="border-b-slate-200 border-b-[1px]"
                            key={transfer.id.toString()}
                        >
                            <td className="px-1 text-slate-500">
                                {transfer.id.toString()}
                            </td>
                            <td className="px-1 text-slate-500">
                                {transfer.amount.toString()}{' '}
                                <span className="text-xs text-slate-400">
                                    wei
                                </span>
                            </td>
                            <td className="px-1 text-slate-500">
                                {transfer.to}
                            </td>
                            <td className="flex gap-2 px-1 text-slate-500">
                                {transfer.approvals.toString()}
                                <PrimaryButton
                                    action={async () =>
                                        await approveTransfer(
                                            transfer.id.toString()
                                        )
                                    }
                                >
                                    approve
                                </PrimaryButton>
                            </td>
                            <td className="px-1 text-slate-500">
                                {transfer.sent ? 'yes' : 'no'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransferList;
