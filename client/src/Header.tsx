type HeaderProps = {
    approvers: Array<string>;
    quorum: bigint;
    balance: bigint;
};

function Header({ approvers, quorum, balance }: HeaderProps) {
    return (
        <header className="rounded-md bg-slate-100 border-[1px] border-slate-200 px-8 py-4 flex flex-col gap-4">
            <div className="">
                <h2 className="text-slate-600 font-bold text-lg pb-1">
                    Approvers
                </h2>
                <ul className="text-slate-500">
                    {approvers.map((element, i) => (
                        <li key={i}>{element}</li>
                    ))}
                </ul>
            </div>
            <div className="">
                <h2 className="text-slate-600 font-bold text-lg pb-1">
                    Quorum
                </h2>
                <p className="text-slate-500">{quorum.toString()}</p>
            </div>
            <div className="">
                <h2 className="text-slate-600 font-bold text-lg pb-1">
                    Wallet Balance
                </h2>
                <p className="text-slate-500">{balance.toString()} wei</p>
            </div>
        </header>
    );
}

export default Header;
