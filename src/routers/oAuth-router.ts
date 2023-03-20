import { postSingIn, getTokenOAuth } from "@/controllers";
import { validateBody } from "@/middlewares";
import { oAuth, token } from "@/schemas";
import { Router } from "express";

const oAuthRouter = Router();

oAuthRouter.post("/token", validateBody(oAuth), getTokenOAuth).post("/sign-in", validateBody(token), postSingIn);

export { oAuthRouter };
