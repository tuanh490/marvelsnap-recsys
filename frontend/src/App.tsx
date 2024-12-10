import axios from "axios";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import marvelSnapLogo from "./assets/logo.png";

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

  return (
    <Container>
      <img src={marvelSnapLogo}></img>
      <h1>Hello World</h1>
      <List>
        {recommendations &&
          recommendations.map((card, index) => (
            <ListItem key={index}>
              <p>{card}</p>
            </ListItem>
          ))}
      </List>
    </Container>
  );
}

export default App;
