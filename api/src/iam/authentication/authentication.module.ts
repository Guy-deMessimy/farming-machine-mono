import { Module, forwardRef } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { IamModule } from '../iam.module';

@Module({
  imports: [forwardRef(() => IamModule)],
  providers: [AuthenticationService, AuthenticationResolver],
})
export class AuthenticationModule {}
