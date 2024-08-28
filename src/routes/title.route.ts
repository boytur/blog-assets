import { Router } from "express";
import {
  getTitles,
  getTitle,
  addTitle,
  updateTitleById,
  deleteTitleById,
} from "../controllers/title.controller";

const router = Router();

router.get("/titles", getTitles);
router.get("/titles/:id", getTitle);
router.post("/titles", addTitle);
router.put("/titles/:id", updateTitleById);
router.delete("/titles/:id", deleteTitleById);

export default router;
