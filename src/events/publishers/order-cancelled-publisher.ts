import {AbstractPublisher, Subjects, OrderCancelledEvent} from "@tktbitch/common";


export class OrderCancelledPublisher extends AbstractPublisher<OrderCancelledEvent>{
    readonly subject = Subjects.OrderCancelled;
}
