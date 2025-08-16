import { model, models, Schema } from "mongoose";

const newsletterSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);



export const Newsletter = models.Newsletter || model("Newsletter", newsletterSchema)
