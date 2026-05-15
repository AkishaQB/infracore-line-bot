import { Body, Controller, Post } from '@nestjs/common';
import { LineService } from 'src/line/line.service';

interface LineWebhookMessage {
  type?: string;
  text?: string;
}

interface LineWebhookEvent {
  type: string;
  replyToken?: string;
  message?: LineWebhookMessage;
}

interface LineWebhookBody {
  events: LineWebhookEvent[];
}

@Controller('webhook')
export class WebhookController {
  constructor(private readonly lineService: LineService) {}

  @Post()
  async handleWebhook(@Body() body: LineWebhookBody) {
    if (!body.events || body.events.length === 0) {
      return 'OK';
    }

    const event = body.events[0];

    if (
      event.type === 'message' &&
      event.message?.type === 'text' &&
      typeof event.message.text === 'string' &&
      typeof event.replyToken === 'string'
    ) {
      const userMessage = event.message.text;

      await this.lineService.replyMessage(
        event.replyToken,
        `InfraCore received: ${userMessage}`,
      );
    }

    return 'OK';
  }
}
