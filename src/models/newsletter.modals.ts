import { model, models, Schema } from "mongoose";

const newsletterSchema = new Schema(
  {
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, require: true, unique: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);



export const Newsletter = models.Newsletter || model("Newsletter", newsletterSchema)
