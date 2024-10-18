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
  [authMiddlewareMatcher]: authMiddleware,
  [rateLimitMiddlewareMatcher]: rateLimitMiddleware,
  [blockedPageMiddlewareMatcher]: blockedPageMiddleware,
  [unauthenticatedMiddlewareMatcher]: unauthenticatedMiddleware,
};

export default createMiddleware(middlewares);
