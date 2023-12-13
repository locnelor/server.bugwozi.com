import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // @ts-ignore
      useFactory: (config: ConfigService) => {
        return ({
          ttl: config.get("CACHE_TTL"),
          store: async () => {

            return await redisStore({
              socket: {
                host: config.get("REDIS_HOST"),
                port: config.get("REDIS_PORT")
              },
              password: config.get("REDIS_PASSWORD"),
              database: config.get("REDIS_DB")
            })
          },
          port: config.get("REDIS_PORT"),
          host: config.get("REDIS_HOST"),
          auth_pass: config.get("REDIS_PASSWORD"),
          db: config.get("REDIS_DB"),// 目标库,
        })
      }
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService]
})
export class RedisCacheModule { }
