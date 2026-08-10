import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ name: "frodo"})
})

app.get('/api', (req, res) => {
  res.json({ message: "Hello from the Node.js backend!" });
});

export { app }

