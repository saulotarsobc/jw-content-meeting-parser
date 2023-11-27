import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import cors from "cors";

import { ParserRouter } from "./routes/parser";

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));

app.use("/parser", ParserRouter);

const PORT = process.env.PORT || 3033;

app.listen(PORT, () => {
  console.log(`Server up: ${PORT}`);
});
