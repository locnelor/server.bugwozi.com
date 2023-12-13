import { Module } from '@nestjs/common';
import { DynamicResolver } from './dynamic.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { DynamicService } from './dynamic.service';

@Module({
    imports: [PrismaService],
    providers: [DynamicResolver, DynamicService]
})
export class DynamicModule { }
