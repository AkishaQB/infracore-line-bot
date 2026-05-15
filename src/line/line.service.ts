import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LineService {
  async replyMessage(replyToken: string, text: string) {
    await axios.post(
      'https://api.line.me/v2/bot/message/reply',
      {
        replyToken,
        messages: [
          {
            type: 'text',
            text,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
