
import { POST_REFER } from "../Controller/post.js";
import express from 'express';
import { GET_REFER } from "../Controller/get.js";
const router = express.Router();

 const POST = router.post("/post/referrals",POST_REFER);
const GET = router.get("/get/referrals",GET_REFER);
export {POST,GET}