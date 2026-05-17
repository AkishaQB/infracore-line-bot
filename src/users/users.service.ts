import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { User } from '../../generated/prisma/client';
import { LineProfile } from '../line/interfaces/line-profile.interface';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async saveLineUser(profile: LineProfile): Promise<User> {
    const user: User = await this.prisma.user.upsert({
      where: {
        lineUserId: profile.userId,
      },

      update: {
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
        statusMessage: profile.statusMessage,
      },

      create: {
        lineUserId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
        statusMessage: profile.statusMessage,
      },
    });
    return user;
  }
}
