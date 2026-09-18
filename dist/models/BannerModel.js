"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerModel = void 0;
const mongoose_1 = require("mongoose");
const BannerSchema = new mongoose_1.Schema({
    bannerImage: { type: String, required: true },
    mobileBannerImage: { type: String, required: true },
    link: { type: String },
}, {
    timestamps: true,
});
exports.BannerModel = (0, mongoose_1.model)('Banner', BannerSchema);
