import { createMiddleware, MiddlewareConfig } from "@rescale/nemo";
import {
  authMiddleware,
  authMiddlewareMatcher,
  blockedPageMiddleware,
  blockedPageMiddlewareMatcher,
  rateLimitMiddleware,
  rateLimitMiddlewareMatcher,
  unauthenticatedMiddleware,
  unauthenticatedMiddlewareMatcher,
} from "./middlewares";

const middlewares: MiddlewareConfig = {
  [rateLimitMiddlewareMatcher]: rateLimitMiddleware,
  [authMiddlewareMatcher]: authMiddleware,
  [blockedPageMiddlewareMatcher]: blockedPageMiddleware,
  [unauthenticatedMiddlewareMatcher]: unauthenticatedMiddleware,
};

export default createMiddleware(middlewares);
