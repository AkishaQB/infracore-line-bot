import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { LineService } from './line/line.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersService } from './users/users.service';
import { TicketsService } from './tickets/tickets.service';
import { SessionsService } from './sessions/sessions.service';

@Module({
  imports: [WebhookModule, PrismaModule],
  controllers: [AppController],
  providers: [
    AppService,
    LineService,
    UsersService,
    TicketsService,
    SessionsService,
  ],
})
export class AppModule {}
