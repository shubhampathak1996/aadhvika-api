"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const basePath_enum_1 = require("../enums/basePath.enum");
const serviceSchema = new mongoose_1.Schema({
    // Banner Section
    bannerTitle: {
        type: String,
        required: true,
        trim: true,
    },
    bannerDescription: {
        type: String,
        required: true,
        trim: true,
    },
    bannerImage: {
        type: String,
        required: true,
    },
    // Main Content
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
    basePath: {
        type: String,
        required: true,
        enum: [basePath_enum_1.BasePathEnum.SERVICES, basePath_enum_1.BasePathEnum.INFERTILITY_OVERVIEW],
        default: basePath_enum_1.BasePathEnum.SERVICES, // Add default for existing services
    },
    // Pointers Title
    pointersTitle: {
        type: String,
        trim: true,
    },
    // Pointer Titles (Array of strings)
    pointers: [
        {
            title: {
                type: String,
                required: true,
            },
        },
    ],
    // Treatment Section
    treatmentStages: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    // Content Section
    content: {
        heading: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        sections: [
            {
                image: {
                    type: String,
                    required: true,
                },
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    // Images Section (Array)
    images: [
        {
            image: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
        },
    ],
    // FAQs Section
    faq: {
        heading: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        items: [
            {
                question: {
                    type: String,
                    required: true,
                    trim: true,
                },
                answer: {
                    type: String,
                    required: true,
                    trim: true,
                },
            },
        ],
    },
    // Status
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft',
    },
}, { timestamps: true });
exports.ServiceModel = mongoose_1.default.model('Service', serviceSchema);
