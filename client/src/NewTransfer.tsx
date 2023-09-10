import { useState } from 'react';

function NewTransfer({ createTransfer }) {
    const [transfer, setTransfer] = useState(undefined);

    const updateTransfer = (e, field) => {
        const value = e.target.value;
        setTransfer({ ...transfer, [field]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        createTransfer(transfer);
    };

    return (
        <div className="rounded-md bg-slate-100 border-[1px] border-slate-200 px-8 py-4">
            <h2 className="text-slate-600 font-bold text-lg pb-1">
                Create Transfer
            </h2>
            <form className="flex flex-col gap-2" onSubmit={(e) => submit(e)}>
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
                <button className="rounded-md px-3 py-1 bg-cyan-500 text-slate-50">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default NewTransfer;
