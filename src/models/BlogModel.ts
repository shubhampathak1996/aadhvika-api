import { Schema, model, models } from 'mongoose';

/* -------------------------------------------------------------------------- */
/*                               FAQ SCHEMA                                   */
/* -------------------------------------------------------------------------- */
const FAQSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
  },
  { _id: false },
);

/* -------------------------------------------------------------------------- */
/*                             COMMENT SCHEMA                                 */
/* -------------------------------------------------------------------------- */
const CommentSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    content: { type: String, required: true, trim: true },
    approved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

/* -------------------------------------------------------------------------- */
/*                                BLOG SCHEMA                                 */
/* -------------------------------------------------------------------------- */
const BlogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    altText: { type: String, trim: true },
    // Tiptap / Rich Editor JSON
    content: { type: Schema.Types.Mixed, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    faqs: [FAQSchema],
    status: {
      type: String,
      enum: ['draft', 'published', 'scheduled'],
      default: 'draft',
    },
    author: { type: String, required: true, trim: true },
    comments: [CommentSchema],
    schemaMarkup: { type: String },
    ogTitle: { type: String, trim: true },
    ogDescription: { type: String, trim: true },
    ogImage: { type: String },
    twitterTitle: { type: String, trim: true },
    twitterDescription: { type: String, trim: true },
    twitterImage: { type: String },
    canonicalUrl: { type: String, trim: true },
    publishedDate: { type: Date },
  },
  { timestamps: true },
);

export const BlogModel = models.Blog || model('Blog', BlogSchema);
