import exp from "express";
import { getUsers,getUser,updateUser,deleteUser,savePost,profilePosts,getNotificationNumber } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router=exp.Router();

router.get("/",getUsers);
// router.get("/:id",verifyToken, getUser);
router.put("/:id",verifyToken,updateUser);
router.delete("/:id",verifyToken,deleteUser);
router.post("/save",verifyToken,savePost);
router.get("/profilePosts",verifyToken,profilePosts);
router.get("/notification",verifyToken,getNotificationNumber);


export default router;