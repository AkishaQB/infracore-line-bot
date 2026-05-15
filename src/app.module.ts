import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { LineService } from './line/line.service';

@Module({
  imports: [WebhookModule],
  controllers: [AppController],
  providers: [AppService, LineService],
})
export class AppModule {}
