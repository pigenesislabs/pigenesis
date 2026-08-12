type Props = {
  onMenuClick: () => void;
};

function Header({ onMenuClick }: Props) {
  return (
    <header className="flex h-17.5 items-center border-b border-slate-700 bg-slate-900 px-5 md:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="mr-4 rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white md:hidden"
        aria-label="Open navigation"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
          />
        </svg>
      </button>

      <h2 className="text-xl font-bold text-white md:text-2xl">
        PiGenesis
      </h2>
    </header>
  );
}

export default Header;