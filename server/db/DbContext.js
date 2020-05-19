import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import BasicInfoSchema from "../models/BasicInfo";
import ProfileSchema from "../models/Profile";

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  BasicInfo = mongoose.model("BasicInfo", BasicInfoSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
}

export const dbContext = new DbContext();
