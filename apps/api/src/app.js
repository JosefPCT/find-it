import express from 'express';
import { prisma } from "@repo/database"

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ name: "frodo"})
})

app.get('/api', (req, res) => {
  res.json({ message: "Hello from the Node.js backend!" });
});

app.get('/picture', async (req, res) => {
  const picture = await prisma.picture.findFirst();
  console.log(picture);
  res.status(200).json({ pictureId: picture.id, name: picture.name });
})

export { app }

