import type { ChangeEvent } from "react";

import { useEffect, useState } from "react";
import {
  Badge,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  ProgressBar,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../app/store";

import { clearFruit, fetchFruit } from "../features/fruits/fruitsSlice";

const PRESET_FRUITS = [
  { emoji: "🍎", name: "Apple" },
  { emoji: "🍌", name: "Banana" },
  { emoji: "🍊", name: "Orange" },
  { emoji: "🍓", name: "Strawberry" },
  { emoji: "🥭", name: "Mango" },
];

const FruitSearch = () => {
  const dispatch: AppDispatch = useDispatch();

  const fruit = useSelector((state: RootState) => state.fruits.fruit);
  const status = useSelector((state: RootState) => state.fruits.status);
  const error = useSelector((state: RootState) => state.fruits.error);

  const [fruitName, setFruitName] = useState<string>("");

  const isLoading = status === "loading";
  const errorMessage = status === "failed" ? error : null;

  useEffect(() => {
    const trimmed = fruitName.trim();
    if (!trimmed) {
      dispatch(clearFruit());
      return;
    }

    const promise = dispatch(fetchFruit(trimmed));

    return () => {
      promise.abort();
    };
  }, [dispatch, fruitName]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFruitName(e.target.value);
  };

  const currentEmoji =
    PRESET_FRUITS.find(
      (p) => p.name.toLowerCase() === fruit?.name.toLowerCase(),
    )?.emoji ?? "🍏";

  return (
    <Container className="py-5">
      {/* Hero Header */}
      <Row className="justify-content-center text-center mb-4">
        <Col xs={12} md={10} lg={8}>
          <div className="badge-pill-header mb-3">
            <span className="badge-dot"></span>
            Vitest Testable Component
          </div>
          <h1 className="display-5 fw-bold mb-3 hero-title">
            Fruit Nutrition Explorer
          </h1>
          <p className="text-secondary lead fs-6">
            Search across botanical taxonomy and verified nutritional profiles.
            Backed by deterministic async loaders for reliable Vitest
            assertions.
          </p>
        </Col>
      </Row>

      {/* Quick Select Preset Chips */}
      <Row className="justify-content-center mb-4">
        <Col
          xs={12}
          md={10}
          lg={7}
          className="d-flex flex-wrap justify-content-center gap-2"
        >
          {PRESET_FRUITS.map((item) => {
            const isActive =
              fruitName.toLowerCase() === item.name.toLowerCase();
            return (
              <button
                key={item.name}
                type="button"
                className={`fruit-chip ${isActive ? "active" : ""}`}
                onClick={() => setFruitName(item.name)}
              >
                <span className="me-1">{item.emoji}</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </Col>
      </Row>

      {/* Search Input Bar */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={8} lg={6}>
          <div className="search-bar-wrapper">
            <InputGroup size="lg" className="search-input-group">
              <InputGroup.Text className="search-icon-prefix">
                🔍
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search fruit (e.g. Apple, Banana, Mango)..."
                value={fruitName}
                onChange={handleInputChange}
                className="search-input-field"
                aria-label="Search fruit"
              />
              {fruitName && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setFruitName("")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </InputGroup>
          </div>
        </Col>
      </Row>

      {/* Main Content Area */}
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          {isLoading && (
            <div className="text-center py-5">
              <Spinner
                animation="border"
                variant="success"
                role="status"
                className="mb-2"
              />
              <p className="text-secondary">Searching botanical database...</p>
            </div>
          )}

          {!isLoading && errorMessage && (
            <Card className="not-found-card text-center p-4">
              <Card.Body>
                <div className="not-found-icon mb-3">🔎</div>
                <h4 className="fw-semibold mb-2">Fruit Not Found</h4>
                <p className="text-secondary mb-3">
                  No match found for &ldquo;
                  <span className="text-danger fw-semibold">{fruitName}</span>
                  &rdquo;.
                </p>
                <p className="small text-muted mb-3">
                  Try one of our supported fruits: Apple, Banana, Orange,
                  Strawberry, or Mango.
                </p>
                <button
                  type="button"
                  className="btn-botanical btn-sm"
                  onClick={() => setFruitName("Apple")}
                >
                  Reset to Apple
                </button>
              </Card.Body>
            </Card>
          )}

          {!isLoading && !fruit && !errorMessage && (
            <Card className="placeholder-prompt-card text-center p-5">
              <Card.Body>
                <div className="fs-1 mb-2">🥗</div>
                <h5 className="fw-semibold">Ready to Explore</h5>
                <p className="text-secondary mb-0">
                  Select a fruit chip above or type a name to inspect its
                  nutrition and taxonomy.
                </p>
              </Card.Body>
            </Card>
          )}

          {!isLoading && fruit && (
            <Card className="fruit-detail-card shadow-lg border-0">
              <Card.Body className="p-4 p-md-5">
                {/* Fruit Header */}
                <div className="d-flex flex-column flex-sm-row align-items-center gap-3 mb-4 text-center text-sm-start">
                  <div className="fruit-avatar">{currentEmoji}</div>
                  <div className="flex-grow-1">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start gap-2 mb-1">
                      <h2 className="fruit-name mb-0">{fruit.name}</h2>
                      <Badge bg="success" pill className="px-2 py-1">
                        ID #{fruit.id}
                      </Badge>
                    </div>
                    <div className="d-flex flex-wrap justify-content-center justify-content-sm-start gap-2 mt-2">
                      <span className="taxonomy-tag">
                        <strong>Family:</strong> {fruit.family}
                      </span>
                      <span className="taxonomy-tag">
                        <strong>Genus:</strong> {fruit.genus}
                      </span>
                      <span className="taxonomy-tag">
                        <strong>Order:</strong> {fruit.order}
                      </span>
                    </div>
                  </div>
                </div>

                <hr className="divider my-4" />

                {/* Nutrition Statistics */}
                <div>
                  <h5 className="section-subtitle mb-3">
                    Nutritional Profile (per 100g)
                  </h5>
                  <Row className="g-3">
                    <Col xs={6} sm={3}>
                      <div className="metric-tile calories-tile">
                        <div className="metric-header">
                          <span className="metric-icon">🔥</span>
                          <span className="metric-label">Calories</span>
                        </div>
                        <div className="metric-value">
                          {fruit.nutritious.calories}
                          <span className="metric-unit">kcal</span>
                        </div>
                        <ProgressBar
                          now={Math.min(
                            100,
                            (fruit.nutritious.calories / 150) * 100,
                          )}
                          variant="danger"
                          className="metric-progress"
                        />
                      </div>
                    </Col>

                    <Col xs={6} sm={3}>
                      <div className="metric-tile carbs-tile">
                        <div className="metric-header">
                          <span className="metric-icon">🌾</span>
                          <span className="metric-label">Carbs</span>
                        </div>
                        <div className="metric-value">
                          {fruit.nutritious.carbohydrates}
                          <span className="metric-unit">g</span>
                        </div>
                        <ProgressBar
                          now={Math.min(
                            100,
                            (fruit.nutritious.carbohydrates / 30) * 100,
                          )}
                          variant="warning"
                          className="metric-progress"
                        />
                      </div>
                    </Col>

                    <Col xs={6} sm={3}>
                      <div className="metric-tile protein-tile">
                        <div className="metric-header">
                          <span className="metric-icon">⚡</span>
                          <span className="metric-label">Protein</span>
                        </div>
                        <div className="metric-value">
                          {fruit.nutritious.protein}
                          <span className="metric-unit">g</span>
                        </div>
                        <ProgressBar
                          now={Math.min(
                            100,
                            (fruit.nutritious.protein / 5) * 100,
                          )}
                          variant="info"
                          className="metric-progress"
                        />
                      </div>
                    </Col>

                    <Col xs={6} sm={3}>
                      <div className="metric-tile fat-tile">
                        <div className="metric-header">
                          <span className="metric-icon">💧</span>
                          <span className="metric-label">Fat</span>
                        </div>
                        <div className="metric-value">
                          {fruit.nutritious.fat}
                          <span className="metric-unit">g</span>
                        </div>
                        <ProgressBar
                          now={Math.min(100, (fruit.nutritious.fat / 5) * 100)}
                          variant="success"
                          className="metric-progress"
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FruitSearch;
