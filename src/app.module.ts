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
import { TestModule } from './test/test.module';
import { PostsModule } from './posts/posts.module';
import { KgnbModule } from './kgnb/kgnb.module';
import { CommentModule } from './comment/comment.module';
import { GroupModule } from './group/group.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';


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
        CACHE_TTL: Joi.number().default(6 * 60 * 60),
        REDIS_DB: Joi.number()
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
      // plugins: [{
      //   plugin: Cache,
      //   options: {
      //     ttl: 10,
      //     policy: {
      //       Query: {
      //         add: true
      //       }
      //     }
      //   }
      // }]
    }),
    RedisCacheModule,
    AuthModule,
    PrismaModule,
    UserModule,
    TestModule,
    PostsModule,
    KgnbModule,
    // DynamicModule,
    CommentModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
