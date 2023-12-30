import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";
import { useState } from "react";

function App() {
  const [text, setText] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // console.log(text);
  };

  console.log(text);

  return (
    <div className="App">
      <Header title="Images Gallery - AEH project" />
      <Search text={text} setText={setText} handleSubmit={handleSearchSubmit} />
    </div>
  );
}

export default App;
