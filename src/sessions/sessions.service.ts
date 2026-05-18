import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

interface SessionRecord {
  id: string;
  userId: string;
  step: string;
  tempData: Prisma.JsonValue | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async startSession(userId: string): Promise<SessionRecord> {
    const session = await this.prisma.conversationSession.upsert({
      where: {
        userId,
      },

      update: {
        step: 'ASK_DEVICE',
        tempData: {},
      },

      create: {
        userId,
        step: 'ASK_DEVICE',
        tempData: {},
      },
    });
    return session;
  }

  async getSession(userId: string): Promise<SessionRecord | null> {
    const session = await this.prisma.conversationSession.findUnique({
      where: {
        userId,
      },
    });
    return session;
  }

  async updateSession(
    userId: string,
    step: string,
    tempData: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput,
  ): Promise<SessionRecord> {
    const session = await this.prisma.conversationSession.update({
      where: {
        userId,
      },

      data: {
        step,
        tempData,
      },
    });
    return session;
  }

  async clearSession(userId: string): Promise<{ count: number }> {
    return await this.prisma.conversationSession.deleteMany({
      where: {
        userId,
      },
    });
  }
}
