import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="not-found-card text-center p-5">
            <Card.Body>
              <div className="not-found-icon mb-3">🧭</div>
              <h2 className="fw-bold mb-2">404 - Page Not Found</h2>
              <p className="text-secondary mb-4">
                The botanical page you are looking for doesn&apos;t exist or has
                been moved.
              </p>
              <Link to="/" className="btn btn-botanical">
                ← Return to Fruit Explorer
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
