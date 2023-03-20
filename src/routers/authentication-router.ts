import { singInPost, singInPostSyncOAuth } from "@/controllers";
import { validateBody } from "@/middlewares";
import { signInSchema, SignWithTokenSchema } from "@/schemas";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter
  .post("/sign-in/syncOAuth", validateBody(SignWithTokenSchema), singInPostSyncOAuth)
  .post("/sign-in", validateBody(signInSchema), singInPost);

export { authenticationRouter };
