import "../styles/Header.css";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="header">
      <div className="left">
        <h2>Portal AEL</h2>
      </div>

      <div className="right">
        <UserMenu />
      </div>
    </header>
  );
}