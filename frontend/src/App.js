import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import { useEffect, useState } from "react";
import ImageCard from "./components/ImageCard";
import { Col, Container, Row } from "react-bootstrap";
import Welcome from "./components/Welcome";
import axios from "axios";
import { motion } from "framer-motion";

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
      console.log(res.data.errors[0].includes('OAuth error'))
      if (res.data.errors[0].includes('OAuth error')){
        setStatus('oauth-error')
        return;
      }
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
      setStatus("saved");
      setImageID(id);

      setTimeout(() => {
        setStatus("");
        setImageID(null);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImage = async (id) => {
    setImages(images.filter((image) => image.id !== id));
    try {
      await axios.delete(`${API_URL}/images/${id}`);
      setStatus("deleted");
      setImageID(id);

      setTimeout(() => {
        setStatus("");
        setImageID(null);
      }, 3000);
      console.log("Obraz o id ", id, " usuniety");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Header title="Images Gallery - AEH project" />
      <Search text={text} setText={setText} handleSubmit={handleSearchSubmit} />
      <div className="p-2 flex h-[50px] justify-center items-center">
        {status === "saved" ? (
          <motion.span
            className="text-green-600 bg-green-200 border-green-400 border-1 rounded-md font-bold py-1 px-2"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          >
            Picture has been saved!
          </motion.span>
        ) : status === "deleted" ? (
          <motion.span
            className="text-red-600 bg-red-200 border-red-400 border-1 rounded-md font-bold py-1 px-2"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          >
            Picture has been deleted!
          </motion.span>
        ) : status === "oauth-error" ? (
          <motion.span
            className="text-red-600 bg-red-200 border-red-400 border-1 rounded-md font-bold py-1 px-2"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          >
            Error! Check Unsplash API key!
          </motion.span>
        ) : (
          ""
        )}
      </div>
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