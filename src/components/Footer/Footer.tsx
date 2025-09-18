import "./Footer.css";

const d = new Date();
const currentYear = d.getFullYear();

export function Footer() {
  return (
    <footer id="footer">
      &copy; Copyright {currentYear}, Everett Gregory Shourt McIntire
    </footer>
  );
}
