import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { LineProfile } from './interfaces/line-profile.interface';

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

  async getProfile(userId: string): Promise<LineProfile> {
    const response = await axios.get<{
      displayName?: string;
      pictureUrl?: string;
      statusMessage?: string;
    }>(`https://api.line.me/v2/bot/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
      },
    });

    return {
      userId,
      displayName: response.data.displayName,
      pictureUrl: response.data.pictureUrl,
      statusMessage: response.data.statusMessage,
    };
  }
}
