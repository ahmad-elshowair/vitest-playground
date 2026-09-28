import { useEffect, useState } from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";

const getSavedTheme = (): "dark" | "light" => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      return saved;
    }
  }
  return "dark";
};

const NavBar = () => {
  const [theme, setTheme] = useState<"dark" | "light">(getSavedTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Navbar expand="lg" className="app-navbar sticky-top">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center gap-2">
          <span className="brand-logo">🌿</span>
          <span className="brand-title">Vitest Playground</span>
          <Badge bg="success" pill className="ms-1 px-2 py-1">
            v5.0
          </Badge>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link
              href="https://vitest.dev"
              target="_blank"
              rel="noreferrer"
              className="px-2"
            >
              Vitest Docs ↗
            </Nav.Link>
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle green/beige theme"
            >
              {theme === "dark" ? "🌾 Beige Mode" : "🌲 Forest Mode"}
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
