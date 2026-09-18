"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DashboardController_1 = require("../controllers/DashboardController");
const router = (0, express_1.Router)();
/**
 * @route GET /api/dashboard/overview
 * @desc Get overview statistics (total counts for all content types)
 * @access Public/Private (depending on your auth requirements)
 */
router.get('/overview', DashboardController_1.DashboardController.getOverviewStats);
/**
 * @route GET /api/dashboard/content-stats
 * @desc Get content statistics with status breakdown (draft/published/scheduled)
 * @access Public/Private
 */
router.get('/content-stats', DashboardController_1.DashboardController.getContentStats);
/**
 * @route GET /api/dashboard/recent-activity
 * @desc Get recent activity (latest created items across all content types)
 * @query limit: number (default: 10)
 * @access Public/Private
 */
router.get('/recent-activity', DashboardController_1.DashboardController.getRecentActivity);
/**
 * @route GET /api/dashboard/popular-content
 * @desc Get popular content (most recent published content for now)
 * @query limit: number (default: 10)
 * @access Public/Private
 */
router.get('/popular-content', DashboardController_1.DashboardController.getPopularContent);
/**
 * @route GET /api/dashboard/monthly-stats
 * @desc Get monthly statistics for charts
 * @query year: number (default: current year)
 * @access Public/Private
 */
router.get('/monthly-stats', DashboardController_1.DashboardController.getMonthlyStats);
/**
 * @route GET /api/dashboard/summary
 * @desc Get complete dashboard summary (overview + content stats + recent activity)
 * @access Public/Private
 */
router.get('/summary', DashboardController_1.DashboardController.getDashboardSummary);
exports.default = router;
