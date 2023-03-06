import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketTypes, getTickets, createTicket, getTicketByEnrollmentId } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("/types/:id", getTicketByEnrollmentId)
  .get("", getTickets)
  .post("", createTicket);

export { ticketsRouter };
