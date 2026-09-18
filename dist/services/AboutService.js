"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutService = void 0;
const AboutModel_1 = require("../models/AboutModel");
class AboutService {
    static async createAbout(data) {
        const about = new AboutModel_1.AboutModel(data);
        return about.save();
    }
    static async getAbouts(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [abouts, total] = await Promise.all([
            AboutModel_1.AboutModel.find().skip(skip).limit(limit),
            AboutModel_1.AboutModel.countDocuments(),
        ]);
        return {
            abouts,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
    static async getAboutById(id) {
        return AboutModel_1.AboutModel.findOne({ id });
    }
    static async updateAbout(id, data) {
        return AboutModel_1.AboutModel.findOneAndUpdate({ id }, data, {
            new: true,
            runValidators: true,
        });
    }
    static async deleteAbout(id) {
        return AboutModel_1.AboutModel.findOneAndDelete({ id });
    }
}
exports.AboutService = AboutService;
