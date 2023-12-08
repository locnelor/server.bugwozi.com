import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from "joi"
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        JWT_SECRET: Joi.string(),
        TITLE: Joi.string().default("title"),
        DESCRIPTION: Joi.string().default("description"),
        VERSION: Joi.string().default("1.0"),
        EXPIRES_IN: Joi.number().default(60 * 60 * 24 * 14),
        REDIS_PORT: Joi.number().default(6379),
        REDIS_HOST: Joi.string().default("localhost"),
        REDIS_PASSWORD: Joi.string(),
        CACHE_TTL: Joi.number().default(6 * 60 * 60)
      })
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      definitions: {
        path: join(__dirname, 'types/graphql.ts'),
      },
      playground: true,
      context: ({ req, connection = {} as any }) => {
        return {
          req: req || connection.context,
          trackErrors(errors) {
            console.log(errors)
          },
        };
      },
    }),
    RedisCacheModule,
    AuthModule,
    PrismaModule,
    UserModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
