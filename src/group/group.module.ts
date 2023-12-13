import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupResolver } from './group.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [PrismaModule, MessageModule],
  providers: [GroupService, GroupResolver]
})
export class GroupModule { }
