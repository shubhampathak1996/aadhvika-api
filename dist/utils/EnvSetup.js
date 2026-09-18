"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const localEnvFile = '.env.local';
const nodeEnvFile = `.env.${process.env.NODE_ENV || 'development'}`;
if (fs_1.default.existsSync(localEnvFile)) {
    dotenv_1.default.config({ path: localEnvFile });
}
else {
    dotenv_1.default.config({ path: nodeEnvFile });
}
exports.default = dotenv_1.default;
