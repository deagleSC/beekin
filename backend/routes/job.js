import express from "express"
import { getAllJobs, getJobDetails, applyToJob } from "../controllers/job.js"
import { verifyToken } from "../middlewares/verifyToken.js"

const router = express.Router()

router.get("/", getAllJobs)
router.get("/:id", getJobDetails)
router.post("/apply", verifyToken, applyToJob)

export default router