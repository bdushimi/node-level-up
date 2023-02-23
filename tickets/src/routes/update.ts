import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { body } from "express-validator";
import {
  validateRequest,
  RouteNotFoundError,
  requireAuth,
  NotAuthorizedError,
} from "@dushberd/common";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),

    body('price')
    .isFloat({gt: 0})
    .withMessage('Price must be greater than 0')

],
validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket){
        throw new RouteNotFoundError
    }

    if(ticket.userId !== req.currentUser!.id){
        throw new NotAuthorizedError()
    }

    ticket.set({
        title: req.body.title,
        price: req.body.price
    })

    res.send(ticket)
  }
);

export { router as updateTicketRouter };
