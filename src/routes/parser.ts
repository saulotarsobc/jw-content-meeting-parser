import { Router } from "express";
import { contentParser } from "../utils";

export const ParserRouter = Router();

ParserRouter.post("/", (req, res) => {
  res.status(200).json({
    erro: false,
    data: contentParser(req.body.content),
  });
});
