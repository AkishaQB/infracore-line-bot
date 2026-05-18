import { Body, Controller, Post } from '@nestjs/common';
import { LineService } from 'src/line/line.service';
import { UsersService } from '../users/users.service';
import { SessionsService } from 'src/sessions/sessions.service';
import { TicketsService } from 'src/tickets/tickets.service';

interface LineWebhookMessage {
  type?: string;
  text?: string;
}

interface LineWebhookSource {
  userId?: string;
}

interface LineWebhookEvent {
  type: string;
  replyToken?: string;
  source?: LineWebhookSource;
  message?: LineWebhookMessage;
}

interface LineWebhookBody {
  events: LineWebhookEvent[];
}

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly lineService: LineService,
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
    private readonly ticketsService: TicketsService,
  ) {}

  @Post()
  async handleWebhook(@Body() body: LineWebhookBody) {
    if (!body.events || body.events.length === 0) {
      return 'OK';
    }

    const event = body.events[0];

    const userId = event.source?.userId;
    console.log('Received event from userId:', userId);
    if (typeof userId !== 'string') {
      return 'OK';
    } else {
      const profile = await this.lineService.getProfile(userId);
      console.log('User profile:', profile);
      await this.usersService.saveLineUser(profile, userId);
      const session = await this.sessionsService.getSession(userId);

      if (
        event.type === 'message' &&
        event.message?.type === 'text' &&
        typeof event.message.text === 'string' &&
        typeof event.replyToken === 'string'
      ) {
        const userMessage = event.message.text;
        if (userMessage === 'book service') {
          await this.sessionsService.startSession(userId);

          await this.lineService.replyMessage(
            event.replyToken,
            'Which device needs service?',
          );

          return 'OK';
        }
        if (session?.step === 'ASK_DEVICE') {
          await this.sessionsService.updateSession(userId, 'ASK_ISSUE', {
            deviceType: event.message?.text,
          });

          await this.lineService.replyMessage(
            event.replyToken,
            'Please describe the issue.',
          );

          return 'OK';
        }
        await this.lineService.replyMessage(
          event.replyToken,
          `InfraCore received: ${userMessage}`,
        );
      }
    }
    return 'OK';
  }
}
