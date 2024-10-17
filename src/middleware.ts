import { createMiddleware, MiddlewareConfig } from "@rescale/nemo";
import { authMiddleware, authMiddlewareMatcher } from "./middlewares";

const middlewares: MiddlewareConfig = {
  [authMiddlewareMatcher]: authMiddleware,
};

export default createMiddleware(middlewares);
