import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { LineService } from '../line/line.service';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService, LineService],
})
export class WebhookModule {}
