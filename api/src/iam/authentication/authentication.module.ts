import { Module, forwardRef } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { IamModule } from '../iam.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Module({
  imports: [
    forwardRef(() => IamModule), // get back iam services
    ConfigModule.forFeature(jwtConfig), // inject jwtConfig.KEY
  ],
  providers: [AuthenticationService, AuthenticationResolver],
})
export class AuthenticationModule {}
