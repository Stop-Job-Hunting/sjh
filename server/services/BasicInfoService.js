import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BasicInfoService {
  async find(query = {}) {
    let data = await dbContext.BasicInfo.find(query);
    return data;
  }
  async getByUser(email) {
    let data = await dbContext.BasicInfo.find({ creatorEmail: email })
    return data
  }
  async findById(id) {
    let data = await dbContext.BasicInfo.findById(id);
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }

  async create(data) {

    let retData = await dbContext.BasicInfo.create(data);
    return retData
  }
}

export const basicInfoService = new BasicInfoService();