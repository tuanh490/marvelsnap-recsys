import axios from "axios";
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

async function fetchAPI() {
  const res = await axios.get("http://localhost:3000");
  console.log(res.data.hello);
}

async function sendData() {
  const data = { data: 1.0 };
  axios
    .post("http://localhost:3000/predict", data)
    .then((res) => {
      console.log(res.data.predictions);
    })
    .catch((err) => {
      console.log(err);
    });
}

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetchAPI();
    sendData();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
