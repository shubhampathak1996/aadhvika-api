"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const BlogModel_1 = require("../models/BlogModel");
const CategoryModel_1 = require("../models/CategoryModel");
const ServicesModel_1 = require("../models/ServicesModel");
class DashboardController {
    // Get overview statistics for dashboard
    static async getOverviewStats(req, res) {
        try {
            const [totalBlogs, totalCategories, totalServices] = await Promise.all([
                BlogModel_1.BlogModel.countDocuments(),
                CategoryModel_1.CategoryModel.countDocuments(),
                ServicesModel_1.ServiceModel.countDocuments(),
            ]);
            const overviewStats = {
                content: {
                    blogs: totalBlogs,
                },
                management: {
                    categories: totalCategories,
                    services: totalServices,
                },
                totals: {
                    allContent: totalBlogs,
                    allItems: totalBlogs + totalCategories + totalServices,
                },
            };
            res.status(200).json({
                success: true,
                data: overviewStats,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // Get content statistics with status breakdown
    static async getContentStats(req, res) {
        try {
            // Get blog statistics with status breakdown
            const [blogStats] = await Promise.all([
                BlogModel_1.BlogModel.aggregate([
                    {
                        $group: {
                            _id: '$status',
                            count: { $sum: 1 },
                        },
                    },
                ]),
            ]);
            // Format status statistics
            const formatStatusStats = (stats) => {
                const result = { draft: 0, published: 0, scheduled: 0, total: 0 };
                stats.forEach((stat) => {
                    if (stat._id) {
                        result[stat._id] = stat.count;
                    }
                    result.total += stat.count;
                });
                return result;
            };
            const contentStats = {
                blogs: formatStatusStats(blogStats),
            };
            res.status(200).json({
                success: true,
                data: contentStats,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // Get recent activity (latest created items)
    static async getRecentActivity(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const [recentBlogs] = await Promise.all([
                BlogModel_1.BlogModel.find()
                    .select('title createdAt status')
                    .sort({ createdAt: -1 })
                    .limit(limit),
            ]);
            // Combine and sort all recent items
            const allRecentItems = [
                ...recentBlogs.map((item) => ({
                    ...item.toObject(),
                    type: 'blog',
                })),
            ].sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            });
            res.status(200).json({
                success: true,
                data: {
                    recentItems: allRecentItems.slice(0, limit),
                    byType: {
                        blogs: recentBlogs,
                    },
                },
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // Get popular content (for future implementation with view counts)
    static async getPopularContent(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            // For now, we'll get the most recent published content
            const [popularBlogs] = await Promise.all([
                BlogModel_1.BlogModel.find({ status: 'published' })
                    .select('title createdAt status')
                    .sort({ createdAt: -1 })
                    .limit(limit),
            ]);
            res.status(200).json({
                success: true,
                data: {
                    blogs: popularBlogs,
                },
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // Get monthly statistics for charts
    static async getMonthlyStats(req, res) {
        try {
            const year = parseInt(req.query.year) || new Date().getFullYear();
            const startDate = new Date(year, 0, 1);
            const endDate = new Date(year + 1, 0, 1);
            const [blogMonthlyStats] = await Promise.all([
                BlogModel_1.BlogModel.aggregate([
                    {
                        $match: {
                            createdAt: { $gte: startDate, $lt: endDate },
                        },
                    },
                    {
                        $group: {
                            _id: { $month: '$createdAt' },
                            count: { $sum: 1 },
                        },
                    },
                    { $sort: { _id: 1 } },
                ]),
            ]);
            // Create monthly data array (12 months)
            const months = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ];
            const formatMonthlyData = (stats) => {
                const monthlyData = new Array(12).fill(0);
                stats.forEach((stat) => {
                    if (stat._id >= 1 && stat._id <= 12) {
                        monthlyData[stat._id - 1] = stat.count;
                    }
                });
                return monthlyData;
            };
            const monthlyStats = {
                year,
                months,
                data: {
                    blogs: formatMonthlyData(blogMonthlyStats),
                },
            };
            res.status(200).json({
                success: true,
                data: monthlyStats,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // Get summary for quick dashboard view
    static async getDashboardSummary(req, res) {
        try {
            const [overviewStats, contentStats, recentActivity] = await Promise.all([
                DashboardController.getOverviewStatsData(),
                DashboardController.getContentStatsData(),
                DashboardController.getRecentActivityData(5),
            ]);
            res.status(200).json({
                success: true,
                data: {
                    overview: overviewStats,
                    contentStatus: contentStats,
                    recentActivity: recentActivity.slice(0, 5),
                },
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // Helper methods for internal use
    static async getOverviewStatsData() {
        const [totalBlogs, totalCategories] = await Promise.all([
            BlogModel_1.BlogModel.countDocuments(),
            CategoryModel_1.CategoryModel.countDocuments(),
        ]);
        return {
            content: {
                blogs: totalBlogs,
            },
            management: {
                categories: totalCategories,
            },
        };
    }
    static async getContentStatsData() {
        const [blogStats] = await Promise.all([
            BlogModel_1.BlogModel.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
        ]);
        const formatStatusStats = (stats) => {
            const result = { draft: 0, published: 0, scheduled: 0, total: 0 };
            stats.forEach((stat) => {
                if (stat._id) {
                    result[stat._id] = stat.count;
                }
                result.total += stat.count;
            });
            return result;
        };
        return {
            blogs: formatStatusStats(blogStats),
        };
    }
    static async getRecentActivityData(limit = 10) {
        const recentBlogs = await BlogModel_1.BlogModel.find()
            .select('title createdAt status')
            .sort({ createdAt: -1 })
            .limit(limit);
        const allRecentItems = [
            ...recentBlogs.map((item) => ({ ...item.toObject(), type: 'blog' })),
        ].sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
        });
        return allRecentItems;
    }
}
exports.DashboardController = DashboardController;
