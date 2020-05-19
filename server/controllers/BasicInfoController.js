// import express from "express";
import BaseController from "../utils/BaseController";
import { basicInfoService } from "../services/BasicInfoService";
import { Auth0Provider } from "@bcwdev/auth0provider";


export class BasicInfoController extends BaseController {
  constructor() {
    super("");
    this.router
      .get("", this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("/user", this.getByUser)
      .post("", this.create);
  }
  async getAll(req, res, next) {
    try {
      // make sure that the email coming in is the user that is logged in.
      // req.query.creatorEmail = req.userInfo.email;
      let data = await basicInfoService.find()
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getByUser(req, res, next) {

    try {
      // make sure that the email coming in is the user that is logged in.
      req.query.creatorEmail = req.userInfo.email;
      let data = await basicInfoService.getByUser(req.userInfo.email)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      // req.body.creatorId = req.user.sub;
      // req.body.creatorEmail = req.userInfo.email;

      let data = await basicInfoService.create(req.body)

      res.send(data);
    } catch (error) {
      next(error);
    }
  }
}