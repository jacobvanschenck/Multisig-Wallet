import { ReactNode, useState } from 'react';
import { PulseLoader } from 'react-spinners';

type PrimaryButtonProps = {
    children: ReactNode;
    disabled?: boolean;
    action?: () => Promise<void>;
};
export function PrimaryButton({
    action,
    disabled,
    children,
}: PrimaryButtonProps) {
    const [loading, setLoading] = useState(false);
    return loading ? (
        <div className="flex justify-center items-center w-full">
            <PulseLoader size="10px" color="lightgray" />
        </div>
    ) : (
        <button
            className="flex justify-center items-center py-1 px-4 bg-cyan-500 rounded-md text-slate-50 disabled:bg-slate-200"
            disabled={loading || disabled}
            onClick={async () => {
                if (!action) return;
                setLoading(true);
                await action();
                setLoading(false);
            }}
        >
            {children}
        </button>
    );
}
