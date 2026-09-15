type InfoTooltipProps = {
    title: string;
    description: string;
};

function InfoTooltip({
    title,
    description,
}: InfoTooltipProps) {
    return (
        <span className="group relative inline-flex">
            <button
                type="button"
                aria-label={`About ${title}`}
                className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-600 text-base font-semibold text-slate-400 transition hover:border-blue-500 hover:text-blue-400 focus:border-blue-500 focus:text-blue-400 focus:outline-none"
            >
                <span className="text-lg font-bold leading-none">
                    i
                </span>
            </button>

            <span
                role="tooltip"
                className="pointer-events-none absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-lg border border-slate-700 bg-slate-950 p-4 text-left opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
            >
                <span className="block text-sm font-semibold text-white">
                    {title}
                </span>

                <span className="mt-2 block text-xs leading-5 text-slate-400">
                    {description}
                </span>
            </span>
        </span>
    );
}

export default InfoTooltip;