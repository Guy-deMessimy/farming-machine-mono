import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { HttpModule } from '@nestjs/axios';
import appConfig from './config/app.config';

// Modules
import { ConfigModule } from '@nestjs/config';
import { EnginesModule } from './engine/engine.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      installSubscriptionHandlers: true,
    }),
    HttpModule,
    EnginesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
