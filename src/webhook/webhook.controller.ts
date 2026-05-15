import { Body, Controller, Headers, Post } from '@nestjs/common';
import { LineService } from '../line/line.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly lineService: LineService) {}

  @Post()
  async handleWebhook(@Body() body: { events: Record<string, any>[] }) {
    if (!body.events || body.events.length === 0) {
      return 'OK';
    }
    const event = body.events[0];

    if (event.type === 'message' && event.message?.type === 'text') {
      const userMessage: string = event?.message?.text as string;

      await this.lineService.replyMessage(
        event.replyToken,
        `InfraCore received: ${userMessage}`,
      );
    }

    return 'OK';
  }
}
