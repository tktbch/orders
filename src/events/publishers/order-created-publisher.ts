import {AbstractPublisher, Subjects, OrderCreatedEvent} from "@tktbitch/common";


export class OrderCreatedPublisher extends AbstractPublisher<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
}
