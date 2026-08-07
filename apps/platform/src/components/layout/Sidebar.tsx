import { theme } from "../../styles/theme";

const menuItems = [
  "Dashboard",
  "Projects",
  "Products",
  "Services",
  "Settings",
];

function Sidebar() {
  return (
    <aside
      style={{
        width: theme.layout.sidebarWidth,
        borderRight: `1px solid ${theme.colors.border}`,
        padding: theme.spacing.lg,
        background: theme.colors.surface,
      }}
    >
      <h3 style={{ marginBottom: theme.spacing.lg }}>Navigation</h3>

      {menuItems.map((item) => (
        <div
          key={item}
          style={{
            padding: "12px 0",
            cursor: "pointer",
            color: theme.colors.textSecondary,
          }}
        >
          {item}
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;