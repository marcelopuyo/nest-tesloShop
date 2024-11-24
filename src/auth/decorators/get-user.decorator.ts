import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";


export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (req.body.email) {
      return req.body.email;
    }

    if (!user) {
      throw new InternalServerErrorException('User not found');
    }

    return user;
  }
)