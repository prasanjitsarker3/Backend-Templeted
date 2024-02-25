import { Schema, model } from "mongoose";
import { TBlogPost, TComment } from "./postInterface";

const userSchema = new Schema<TBlogPost>(
  {
    postTime: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
    },
    location: {
      type: String,
    },
    photo: {
      type: [String],
    },
    video: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    comment: {
      type: [
        new Schema<TComment>({
          comment: { type: String, required: true },
          isDeleted: { type: Boolean, default: false },
        }),
      ],
      default: [],
    },
    like: {
      type: Number,
      default: 0,
    },
    save: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const BlogPost = model<TBlogPost>("BlogPost", userSchema);
