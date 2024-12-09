import axios from "axios";
import { useEffect, useState } from "react";

async function fetchAPI() {
  const res = await axios.get("http://localhost:3000");
  console.log(res.data.hello);
  return res.data.hello;
}

async function sendData() {
  const cards = { cards: ["Magik"] };
  return axios
    .post("http://localhost:3000/predict", cards)
    .then((res) => {
      console.log(res.data.recommendations);
      return res.data.recommendations;
    })
    .catch((err) => {
      console.log(err);
    });
}

function App() {
  const [recommendations, setRecommendations] = useState<string[] | undefined>(
    undefined
  );

  useEffect(() => {
    fetchAPI();
    sendData().then((data) => setRecommendations(data));
  }, []);

  return <h1>{recommendations}</h1>;
}

export default App;
