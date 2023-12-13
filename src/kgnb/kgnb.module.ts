import { Module } from '@nestjs/common';
import { KgnbResolver } from './kgnb.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [KgnbResolver]
})
export class KgnbModule { }
