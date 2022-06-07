import cors from "cors";
import express from "express";

const PORT = 9000;

const app = express();
app.use(cors(), express.json());

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
