"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroService = void 0;
const HeroModel_1 = require("../models/HeroModel");
class HeroService {
    static async createHero(data) {
        const hero = new HeroModel_1.HeroModel(data);
        return hero.save();
    }
    static async getHeroes(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [heroes, total] = await Promise.all([
            HeroModel_1.HeroModel.find().skip(skip).limit(limit),
            HeroModel_1.HeroModel.countDocuments(),
        ]);
        return {
            heroes,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
    static async getHeroById(id) {
        return HeroModel_1.HeroModel.findOne({ id });
    }
    static async updateHero(id, data) {
        return HeroModel_1.HeroModel.findOneAndUpdate({ id }, data, {
            new: true,
            runValidators: true,
        });
    }
    static async deleteHero(id) {
        return HeroModel_1.HeroModel.findOneAndDelete({ id });
    }
}
exports.HeroService = HeroService;
