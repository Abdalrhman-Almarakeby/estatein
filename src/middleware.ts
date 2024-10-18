import { createMiddleware, MiddlewareConfig } from "@rescale/nemo";
import {
  authMiddleware,
  authMiddlewareMatcher,
  blockedPageMiddleware,
  blockedPageMiddlewareMatcher,
  rateLimitMiddleware,
  rateLimitMiddlewareMatcher,
} from "./middlewares";

const middlewares: MiddlewareConfig = {
  [authMiddlewareMatcher]: authMiddleware,
  [rateLimitMiddlewareMatcher]: rateLimitMiddleware,
  [blockedPageMiddlewareMatcher]: blockedPageMiddleware,
};

export default createMiddleware(middlewares);
