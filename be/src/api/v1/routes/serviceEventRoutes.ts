import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import {
  deleteService,
  getService,
  postService,
  updateService,
} from "../controllers/serviceEventController";
import { serviceEventSchema } from "../validations/serviceevent.schema";
import { validateResource } from "../middlewares/validateResource";

const router = Router();

const routes = () => {
  router.post(
    "/v1/service-event",
    verifyToken,
    validateResource(serviceEventSchema),
    postService
  );
  router.get("/v1/service-event", verifyToken, getService);
  router.delete("/v1/service/:id", verifyToken, deleteService);
  router.put(
    "/v1/service-event/:id",
    verifyToken,
    validateResource(serviceEventSchema),
    updateService
  );
  // router.get("/v1/users", getUser);
  return router;
};

export default routes;
