import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Ticket } from '@prisma/client';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async createTicket(
    userId: string,
    deviceType: string,
    issue: string,
  ): Promise<Ticket> {
    const ticket = await this.prisma.ticket.create({
      data: {
        userId,
        deviceType,
        issue,
      },
    });
    return ticket;
  }

  async getTicketsByUserId(userId: string): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
