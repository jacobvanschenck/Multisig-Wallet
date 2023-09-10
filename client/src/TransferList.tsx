import React from 'react';

function TransferList({ transfers, approveTransfer }) {
    return (
        <div className="rounded-md bg-slate-100 border-[1px] border-slate-200 px-8 py-4">
            <h2 className="text-slate-600 font-bold text-lg pb-4">Transfers</h2>
            <table className="table-auto">
                <thead>
                    <tr className="text-left">
                        <th className="px-1 text-slate-300 text-xs">ID</th>
                        <th className="px-1 text-slate-300 text-xs">Amount</th>
                        <th className="px-1 text-slate-300 text-xs">To</th>
                        <th className="px-1 text-slate-300 text-xs">
                            Approvals
                        </th>
                        <th className="px-1 text-slate-300 text-xs">Sent</th>
                    </tr>
                </thead>
                <tbody>
                    {transfers.map((transfer) => (
                        <tr
                            className="border-b-slate-200 border-b-[1px]"
                            key={transfer.id}
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
                                <button
                                    className="rounded-md bg-cyan-500 text-slate-50 px-3 py-1 disabled:bg-slate-200"
                                    id="approved"
                                    disabled={
                                        transfer.isTrasferApprovedByCurrentUser
                                    }
                                    onClick={() => approveTransfer(transfer.id)}
                                >
                                    approve
                                </button>
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
