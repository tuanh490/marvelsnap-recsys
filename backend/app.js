import express from 'express';
import { spawn } from 'child_process';
import cors from 'cors'
import axios from 'axios'

const app = express();

const corsOption = {
    origin: ['http://localhost:5173']
}

app.use(cors(corsOption))
app.use(express.json());

app.post('/predict', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5000/predict', req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling FastAPI:', error.message);
        res.status(500).send('Error in FastAPI');
    }
});

app.use('/', (req, res) => {
    res.json({ hello: 'World' })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
