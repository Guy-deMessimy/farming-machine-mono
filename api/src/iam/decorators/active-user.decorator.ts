import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { REQUEST_USER_KEY } from '../iam.constants';
import { ActiveUserData } from '../authentication/interfaces/active-user-data.interface';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;
    const user: ActiveUserData | undefined = request[REQUEST_USER_KEY];
    // const user = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);
