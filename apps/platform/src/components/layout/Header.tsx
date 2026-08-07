import { theme } from "../../styles/theme";

function Header() {
  return (
    <header
      style={{
        height: theme.layout.headerHeight,
        display: "flex",
        alignItems: "center",
        padding: `0 ${theme.spacing.lg}`,
        borderBottom: `1px solid ${theme.colors.border}`,
        background: theme.colors.surface,
      }}
    >
      <h2>{`PiGenesis`}</h2>
    </header>
  );
}

export default Header;