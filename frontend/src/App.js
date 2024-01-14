import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import { useEffect, useState } from "react";
import ImageCard from "./components/ImageCard";
import { Col, Container, Row } from "react-bootstrap";
import Welcome from "./components/Welcome";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5050";

function App() {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("");
  const [imageID, setImageID] = useState();

  const retrieveImages = async (e) => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      console.log(res.data);
      setImages(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveImages();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${text}`);
      setImages([{ ...res.data, title: text }, ...images]);
    } catch (error) {
      console.log(error);
    }
    setText("");
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;

    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
      console.log(res.data);
      if (res.data?.inserted_id) {
        images.map((image) =>
          image.id === id ? { ...image, saved: true } : image
        );
      }
      setStatus("Picture has been saved!");
      setImageID(id);

      setTimeout(() => {
        setStatus("");
        setImageID(null);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

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
                <ImageCard
                  image={item}
                  deleteImage={handleDeleteImage}
                  saveImage={handleSaveImage}
                  status={status}
                  imageID={imageID}
                />
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
