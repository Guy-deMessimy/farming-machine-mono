import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { APP_INTERCEPTOR } from '@nestjs/core';

// Modules
import { EnginesModule } from './modules/engine/engine.module';
import { EngineModelModule } from './modules/engine-model/engine-model.module';
import { EngineTypesModule } from './modules/engine-type/engine-type.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AuthHeaderInterceptor } from './modules/auth/interceptors/auth-header.interceptor';
import { DynamicInterceptor } from './modules/auth/interceptors/dynamic-interceptor';
import { RefreshTokenHeaderInterceptor } from './modules/auth/interceptors/refresh-token-interceptor';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      installSubscriptionHandlers: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    EnginesModule,
    EngineModelModule,
    EngineTypesModule,
    AuthModule,
    UsersModule,
  ],
  providers: [
    AuthHeaderInterceptor,
    RefreshTokenHeaderInterceptor,
    DynamicInterceptor,
    {
      provide: APP_INTERCEPTOR,
      useClass: DynamicInterceptor,
    },
  ],
  controllers: [],
})
export class AppModule {}
