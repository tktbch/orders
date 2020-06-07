import express, {Request, Response} from 'express';
import {Order, OrderStatus} from "../models/order";
import {NotAuthorizedError, NotFoundError, requireAuth} from "@tktbitch/common";

const router = express.Router();

router.put('/api/orders/:orderId', requireAuth, async (req:Request, res: Response) => {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
        throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError('Unauthorized');
    }
    order.status = OrderStatus.Cancelled;
    await order.save();
    res.send(order);
})

export {router as cancelOrderRouter}
