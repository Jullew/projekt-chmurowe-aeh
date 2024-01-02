import React from "react";
import { Button } from "react-bootstrap";

const Welcome = () => {
  return (
    <section
      id="hello"
      className="w-full flex flex-col gap-6 shadow-sm bg-gray-200 p-10 rounded-2xl "
    >
      <h1>Images Gallery</h1>
      <div className="">
        <p>This application was build for university project.</p>
        <p>Akademia Ekonomiczno-Humanistyczna w Warszawie.</p>
        <p>Author: Julian Lewandowski (index number: 42034)</p>
      </div>
      <p>
        <Button variant="primary" href="https://unsplash.com" target="_blank">
          Więcej informacji o Unsplash API
        </Button>
      </p>
    </section>
  );
};

export default Welcome;
