import {Message} from "node-nats-streaming";
import {AbstractListener, Subjects, TicketCreatedEvent} from "@tktbitch/common";

export class TicketCreatedListener extends AbstractListener<TicketCreatedEvent> {

    readonly subject = Subjects.TicketCreated;
    queueGroupName = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log('Event data!', data);

        msg.ack();
    }

}
