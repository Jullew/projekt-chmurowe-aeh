import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";
import { useState } from "react";


const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

function App() {
  const [text, setText] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://api.unsplash.com/photos/random?query=${text}&client_id=${UNSPLASH_KEY}`
    ).then((res) =>
      res
        .json()
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  };

  return (
    <div className="App">
      <Header title="Images Gallery - AEH project" />
      <Search text={text} setText={setText} handleSubmit={handleSearchSubmit} />
    </div>
  );
}

export default App;
