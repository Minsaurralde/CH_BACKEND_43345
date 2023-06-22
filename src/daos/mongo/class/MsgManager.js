import mongoose from "mongoose";
import { msgModel } from "../models/message.model.js";
import mongoUri from "../constants/mongourl.js";

class MsgManager {
  DBconection = mongoose.connect(mongoUri);

  getAllMsg = async () => {
    let result = await msgModel.find();
    return result;
  };

  getMsgById = async (id) => {
    let result = await msgModel.findOne({ _id: id });
    return result;
  };

  addMsg = async (user, msg) => {
    const newMsg = { user: user, message: msg };

    const result = await msgModel.create(newMsg);
    return result;
  };
}

export default MsgManager;
