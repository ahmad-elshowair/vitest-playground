import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import NavBar from "../components/Navbar";

const AppLayout = () => {
  return (
    <div className="app-shell d-flex flex-column min-vh-100">
      <NavBar />
      <main id="main-content" className="flex-grow-1" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="app-footer py-3 text-center border-top border-secondary-subtle">
        <Container>
          <small className="text-secondary">
            🌿 Vitest Playground • Built with React 19 & Vitest
          </small>
        </Container>
      </footer>
    </div>
  );
};

export default AppLayout;
