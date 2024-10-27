import express from "express";
import {getPoem, deletePoem, pushPoem} from "../controllers/poetryController.js"

const router = express.Router();

router.post("/post", pushPoem);
router.get("/get", getPoem);
router.delete("/delete", deletePoem);

export { router as poetryRouter };