import mongoose from "mongoose";
import {OrderStatus} from "@tktbitch/common";
import {TicketDoc} from './ticket';
export {OrderStatus} from '@tktbitch/common';

interface OrderAttrs {
    ticket: TicketDoc,
    userId: string,
    status: OrderStatus,
    expiresAt: Date;
}

interface OrderDoc extends mongoose.Document {
    ticket: TicketDoc,
    userId: string,
    status: OrderStatus,
    expiresAt: Date;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}


const orderSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created
    },
    userId: {
        type: String,
        required: true
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});


orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };