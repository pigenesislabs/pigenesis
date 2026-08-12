import { NavLink } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const menuItems = [
  { name: "Dashboard", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Products", path: "/products" },
  { name: "Services", path: "/services" },
  { name: "Settings", path: "/settings" },
];

function Sidebar({ isOpen, onClose }: Props) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-60
          border-r border-slate-700 bg-slate-900 p-6
          transform transition-transform duration-200
          md:static md:z-auto md:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">
            Navigation
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white md:hidden"
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>

        <nav className="mt-8 space-y-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `block w-full rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;