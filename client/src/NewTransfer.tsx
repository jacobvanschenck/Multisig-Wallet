import { ChangeEvent, useState } from 'react';
import { PrimaryButton } from './components/PrimaryButton';

type NewTransferProps = {
    createTransfer: (transfer: { amount: string; to: string }) => Promise<void>;
};

function NewTransfer({ createTransfer }: NewTransferProps) {
    const [transfer, setTransfer] = useState<{
        amount: string | undefined;
        to: string | undefined;
    }>({ amount: undefined, to: undefined });

    const updateTransfer = (
        e: ChangeEvent<HTMLInputElement>,
        field: string
    ) => {
        const value = e.target.value;
        setTransfer({ ...transfer, [field]: value });
    };

    return (
        <div className="rounded-md bg-slate-100 border-[1px] border-slate-200 px-8 py-4">
            <h2 className="text-slate-600 font-bold text-lg pb-1">
                Create Transfer
            </h2>
            <div className="flex flex-col gap-2">
                <label className="text-slate-500" htmlFor="amount">
                    Amount (wei)
                </label>
                <input
                    id="amount"
                    className="rounded-md"
                    type="text"
                    onChange={(e) => updateTransfer(e, 'amount')}
                />
                <label className="text-slate-500" htmlFor="to">
                    To
                </label>
                <input
                    id="to"
                    className="rounded-md"
                    type="text"
                    onChange={(e) => updateTransfer(e, 'to')}
                />
                <PrimaryButton
                    action={async () => {
                        if (!transfer || !transfer.to || !transfer.amount)
                            return;
                        await createTransfer(transfer);
                    }}
                >
                    Submit
                </PrimaryButton>
            </div>
        </div>
    );
}

export default NewTransfer;
