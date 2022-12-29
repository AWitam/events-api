import { PrismaClient } from "@prisma/client";
import { ParameterizedContext } from "koa";
import { Logger } from "winston";

export interface RequestState {
  db: PrismaClient;
  logger: Logger;
}


export type RequestContext = ParameterizedContext<RequestState>