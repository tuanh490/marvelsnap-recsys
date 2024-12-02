import express from 'express';
import { spawn } from 'child_process';
import cors from 'cors'

const app = express();

const corsOption = {
    origin: ['http://localhost:5173']
}

app.use(cors(corsOption))

// Middleware to parse JSON requests
app.use(express.json());

app.post('/predict', (req, res) => {
    const inputData = req.body; // Input features from client

    // Spawn the Python process
    const pythonProcess = spawn('python', ['script.py']);

    // Send input data to Python process
    pythonProcess.stdin.write(JSON.stringify(inputData));
    pythonProcess.stdin.end();

    let result = '';

    // Capture Python stdout
    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    // Handle process exit
    pythonProcess.on('close', () => {
        try {
            const predictions = JSON.parse(result); // Parse Python output
            res.json({ predictions }); // Send predictions to client
        } catch (error) {
            res.status(500).json({ error: 'Error parsing prediction output' });
        }
    });

    // Handle Python errors
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python error: ${data.toString()}`);
        res.status(500).json({ error: 'Error from Python script' });
    });
});

app.use('/', (req, res) => {
    res.json({ hello: 'World' })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
