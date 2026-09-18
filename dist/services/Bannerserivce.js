"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerService = void 0;
const BannerModel_1 = require("../models/BannerModel");
class BannerService {
    static async createBanner(data) {
        const banner = new BannerModel_1.BannerModel(data);
        return banner.save();
    }
    static async getBanners(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [banners, total] = await Promise.all([
            BannerModel_1.BannerModel.find().skip(skip).limit(limit),
            BannerModel_1.BannerModel.countDocuments(),
        ]);
        return {
            banners,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
    static async updateBanner(id, data) {
        return BannerModel_1.BannerModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }
    static async deleteBanner(id) {
        return BannerModel_1.BannerModel.findByIdAndDelete(id);
    }
}
exports.BannerService = BannerService;
