import express, {Request, Response} from 'express';
import {Order} from "../models/order";
import {NotFoundError, OrderStatus, requireAuth, validateRequest} from "@tktbitch/common";
import {body} from "express-validator";
import {BadRequestError} from "../../../common/build/errors";
import {Ticket} from "../models/ticket";

const router = express.Router();
const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post('/api/orders', requireAuth, [
    body('ticketId')
        .isMongoId()
        .withMessage('ticketId is required')
], validateRequest, async (req:Request, res: Response) => {
    // Get the userId
    const userId = req.currentUser!.id
    // Find the ticket
    const ticket  = await Ticket.findById(req.body.ticketId);
    if (!ticket) {
        throw new NotFoundError();
    }
    // check if the ticket is reserved
    const isReserved = await ticket.isReserved();
    if (isReserved) {
        throw new BadRequestError('Ticket already reserved.')
    }
    // calc expiration
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + EXPIRATION_WINDOW_SECONDS);
    // build the order
    const order = Order.build({
        ticket,
        userId,
        expiresAt,
        status: OrderStatus.Created
    })
    await order.save();
    // publish order:created event

    res.sendStatus(201).send(order)
})

export {router as createOrderRouter}
