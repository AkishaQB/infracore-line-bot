import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { LineService } from '../line/line.service';
import { UsersService } from '../users/users.service';
import { SessionsService } from '../sessions/sessions.service';
import { TicketsService } from '../tickets/tickets.service';

@Module({
  controllers: [WebhookController],
  providers: [
    WebhookService,
    LineService,
    UsersService,
    SessionsService,
    TicketsService,
  ],
})
export class WebhookModule {}
