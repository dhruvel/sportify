import express from 'express';

const app = express();
const port = 9009;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Sportify!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
