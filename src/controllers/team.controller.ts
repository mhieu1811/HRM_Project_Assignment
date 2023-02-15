import "reflect-metadata";
import { inject } from "inversify";
import {
  controller,
  httpPost,
  httpGet,
  httpPut,
  httpDelete,
} from "inversify-express-utils";
import { Response, Request } from "express";

import { TYPES } from "../util/inversify_config/types";
import { ITeamService } from "../interfaces/team/ITeamService.interface";
import { ITeam } from "../interfaces/team/ITeam.interface";
import { IEmployeeService } from "../interfaces/employee/IEmployeeService.interface";
import container from "../util/inversify_config/inversify.config";
import * as express from "express";
import NotFoundError from "../util/appErrors/errors/notFound.error";
@controller("/teams")
export default class TeamsController {
  private _teamService: ITeamService;
  private _employeeService: IEmployeeService;

  constructor(
    @inject(TYPES.Employee) employeeService: IEmployeeService,
    @inject(TYPES.Team) teamService: ITeamService,
  ) {
    this._teamService = teamService;
    this._employeeService = employeeService;
  }

  @httpPost(
    "/",
    container.get<express.RequestHandler>("isLogin"),
    container.get<express.RequestHandler>("isAdmin"),
  )
  async addTeam(request: Request, response: Response) {
    try {
      const team: ITeam = request.body;
      const empIsLeader: boolean = await this._employeeService.empIsLeader(
        team.leaderID.toString(),
      );
      if (!empIsLeader) throw new Error("Employee not a leader");

      const newTeam = await this._teamService.addTeam(team);

      return response.status(200).json({ newTeam });
    } catch (error) {
      throw error;
    }
  }

  @httpPost(
    "/assignMember",
    container.get<express.RequestHandler>("isLogin"),
    container.get<express.RequestHandler>("isLeader"),
  )
  async assignMember(request: Request, response: Response) {
    try {
      if (!request.body.memberID && !request.body.teamID)
        throw new Error("Params missing");

      const memberID: string = request.body.memberID;
      const teamID: string = request.body.teamID;

      await this._teamService.assignMember(memberID, teamID);

      return response.status(204).json();
    } catch (error) {
      throw error;
    }
  }

  @httpPost(
    "/deleteMember",
    container.get<express.RequestHandler>("isLogin"),
    container.get<express.RequestHandler>("isLeader"),
  )
  async deleteMember(request: Request, response: Response) {
    try {
      if (!request.body.memberID && !request.body.teamID)
        throw new Error("Params missing");

      const memberID: string = request.body.memberID;
      const teamID: string = request.body.teamID;

      await this._teamService.deleteMember(memberID, teamID);

      return response.status(204).json();
    } catch (error) {
      throw error;
    }
  }

  @httpPost(
    "/assignLeader",
    container.get<express.RequestHandler>("isLogin"),
    container.get<express.RequestHandler>("isAdmin"),
  )
  async assignLeader(request: Request, response: Response) {
    try {
      if (!request.body.leaderID && !request.body.teamID)
        throw new Error("Params missing");

      const leaderID: string = request.body.leaderID;
      const teamID: string = request.body.teamID;

      await this._teamService.assignTeamLeader(leaderID, teamID);

      return response.status(204).json();
    } catch (error) {
      throw error;
    }
  }

  @httpGet(
    "/:id",
    container.get<express.RequestHandler>("isLogin"),
    container.get<express.RequestHandler>("isLeader"),
  )
  async getTeam(request: Request, response: Response) {
    try {
      const id = request.params.id;
      const team = await this._teamService.getTeam(id);

      if (team === null) throw new NotFoundError("Team");

      return response.status(200).json(team);
    } catch (error) {
      throw error;
    }
  }

  @httpPut(
    "/:id",
    container.get<express.RequestHandler>("isLogin"),
    container.get<express.RequestHandler>("isAdmin"),
  )
  async updateTeam(request: Request, response: Response) {
    try {
      const team: ITeam = request.body.team;
      const id: string = request.params.id;
      await this._teamService.updateTeam(team, id);
      return response.status(204).json();
    } catch (error) {
      throw error;
    }
  }

  @httpDelete(
    "/:id",
    container.get<express.RequestHandler>("isLogin"),
    container.get<express.RequestHandler>("isAdmin"),
  )
  async deleteTeam(request: Request, response: Response) {
    try {
      const team: ITeam = request.body.team;
      team.isDeleted = true;
      const id: string = request.params.id;
      await this._teamService.updateTeam(team, id);
      return response.status(204).json();
    } catch (error) {
      throw error;
    }
  }

  @httpGet("/")
  async getListTeam(request: Request, response: Response) {
    try {
      const listTeam: Array<ITeam> | null =
        await this._teamService.getTeamList();
      return response.status(200).json({ listTeam });
    } catch (err) {
      throw err;
    }
  }
}
