import { Router } from "express";
import UserController from "../controllers/user/UserController.js";
import multer from 'multer';

// Configure multer to handle file in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpg, .jpeg, .png, and .webp formats are allowed'));
    }
  },
});

const router = Router();

router.post("/chat", upload.none(), UserController.CreateNewChat);

export default router;