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
import { getErrorMessage } from "../util/util_function";
import logger from "../util/logger";

@controller("/teams")
export default class TeamsController {
  private _teamService: ITeamService;

  constructor(@inject(TYPES.Team) teamService: ITeamService) {
    this._teamService = teamService;
  }

  @httpPost("/add")
  async addTeam(request: Request, response: Response) {
    try {
      const team: ITeam = request.body;
      const newTeam = await this._teamService.addTeam(team);
      return response.status(200).json(newTeam);
    } catch (error) {
      throw error;
    }
  }

  @httpGet("/:id")
  async getTeam(request: Request, response: Response) {
    try {
      const id = request.params.id;
      const team = await this._teamService.getTeam(id);

      if (team === null) return response.status(404);

      return response.status(200).json(team);
    } catch (error) {
      throw error;
    }
  }

  @httpPut("/update/:id")
  async updateTeam(request: Request, response: Response) {
    try {
      const team: ITeam = request.body.team;
      const id: string = request.params.id;
      const createTeam = await this._teamService.updateTeam(team, id);
      return response.status(200).json(createTeam);
    } catch (error) {
      throw error;
    }
  }

  @httpDelete("/delete/:id")
  async deleteTeam(request: Request, response: Response) {
    try {
      const team: ITeam = request.body.team;
      team.isDeleted = true;
      const id: string = request.params.id;
      const createTeam = await this._teamService.updateTeam(team, id);
      return response.status(200).json(createTeam);
    } catch (error) {
      throw error;
    }
  }
}
