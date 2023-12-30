import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Search = ({ text, setText, handleSubmit }) => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={9}>
                <Form.Control
                  type="text"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  placeholder="Type description of image you want find..."
                />
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
