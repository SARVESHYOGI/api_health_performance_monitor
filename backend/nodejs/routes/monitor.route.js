const express = require('express')
const router = express.Router();
const { runMonitor } = require('../controllers/monitor.controller')
const authMiddleware = require('../middleware/auth.middleware')
const { getHistory } = require("../controllers/history.controller");
const { getDashboardData } = require('../controllers/dashboard.controller');
const { compare } = require('../controllers/compare.controller');


router.post('/run', authMiddleware, runMonitor);
router.get("/history", authMiddleware, getHistory);
router.get("/compare", authMiddleware, compare);
router.get("/dashboard", authMiddleware, getDashboardData);

module.exports = router