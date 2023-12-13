import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  providers: [PostsResolver]
})
export class PostsModule {}
