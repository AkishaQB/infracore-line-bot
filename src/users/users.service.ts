import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { User } from '@prisma/client';
import { LineProfile } from '../line/interfaces/line-profile.interface';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async saveLineUser(profile: LineProfile, userId: string): Promise<User> {
    const user: User = await this.prisma.user.upsert({
      where: {
        lineUserId: userId,
      },

      update: {
        displayName: profile.displayName ?? null,
        pictureUrl: profile.pictureUrl ?? null,
        statusMessage: profile.statusMessage ?? null,
      },

      create: {
        lineUserId: userId,
        displayName: profile.displayName ?? null,
        pictureUrl: profile.pictureUrl ?? null,
        statusMessage: profile.statusMessage ?? null,
      },
    });
    return user;
  }
}
