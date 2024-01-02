import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import { useState } from 'react';
import ImageCard from "./components/ImageCard";
import { Col, Container, Row } from "react-bootstrap";
import Welcome from "./components/Welcome";

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

function App() {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://api.unsplash.com/photos/random?query=${text}&client_id=${UNSPLASH_KEY}`
    ).then((res) =>
      res
        .json()
        .then((data) => {
          console.log(data);
          setImages([{ ...data, title: text }, ...images]);
        })
        .catch((err) => {
          console.log(err);
        })
    );

    setText("");
  };
  console.log(images);

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div className="App">
      <Header title="Images Gallery - AEH project" />
      <Search text={text} setText={setText} handleSubmit={handleSearchSubmit} />
      <Container className="mt-4">
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((item, index) => (
              <Col key={index} className="pb-3">
                <ImageCard image={item} deleteImage={handleDeleteImage} />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
}

export default App;
