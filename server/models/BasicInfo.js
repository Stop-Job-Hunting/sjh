import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BasicInfo = new Schema(
  {
    name: { type: String, required: true },
    label: { type: String, required: true },
    phone: { type: String, required: true },
    creatorEmail: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

BasicInfo.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});

export default BasicInfo;