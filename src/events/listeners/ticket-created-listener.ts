import {Message} from "node-nats-streaming";
import {AbstractListener, Subjects, TicketUpdatedEvent} from "@tktbitch/common";

export class TicketUpdatedListener extends AbstractListener<TicketUpdatedEvent> {

    readonly subject = Subjects.TicketUpdated;
    queueGroupName = 'payments-service';

    onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        console.log('Event data!', data);

        msg.ack();
    }

}
