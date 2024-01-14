import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ImageCard = ({ image, deleteImage, saveImage, status, imageID }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image.urls.small} />
      <Card.Body>
        <Card.Title>{image.title?.toUpperCase()}</Card.Title>
        <Card.Text>{image.description || image.alt_description}</Card.Text>

        {!image.saved && (
          <Button variant="primary" onClick={() => saveImage(image.id)}>
            Save
          </Button>
        )}
        <Button
          className="bg-red-500 outline-none hover:bg-red-700 hover:border-red-900 border-red-700 ml-2"
          onClick={() => deleteImage(image.id)}
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ImageCard;
