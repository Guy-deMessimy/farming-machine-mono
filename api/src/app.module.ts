import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import appConfig from './config/app.config';

// Modules
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PubSubModule } from './modules/pub-sub/pub-sub.module';
import { EnginesModule } from './modules/engine/engines.module';
import { EngineModelModule } from './modules/engine-model/engine-model.module';
import { EngineTypesModule } from './modules/engine-type/engine-type.module';
import { UsersModule } from './modules/users/users.module';
import { IamModule } from './iam/iam.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      installSubscriptionHandlers: true,
    }),
    PrismaModule,
    PubSubModule,
    EnginesModule,
    EngineModelModule,
    EngineTypesModule,
    UsersModule,
    IamModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
