const express = require("express");
const { getNotes } = require("../controllers/noteController");
const { protect } = require("../middlewares/authMiddleware");
const {
  createNote,
  getNoteById,
  UpdateNote,
  DeleteNote,
} = require("../controllers/noteController");
//import createNote from "../controllers/noteController";
const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNote);
router
  .route("/:id")
  .get(getNoteById)
  .put(protect, UpdateNote)
  .delete(protect, DeleteNote);

module.exports = router;
