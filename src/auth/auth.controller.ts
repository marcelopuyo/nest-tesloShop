import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from './decorators/raw-headers.decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles.interface';
import { Auth } from './decorators/auth.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status:201, description: 'User was created', type: User })
  @ApiResponse({ status:400, description: 'Bad request' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiResponse({ status:201, description: 'User was logged-in', type: User })
  @ApiResponse({ status:401, description: 'Unauthorized' })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  @ApiResponse({ status:200, description: 'User token revalidated', type: User })
  @ApiResponse({ status:401, description: 'Unauthorized' })
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus(user.id);
  }

  // @Get('private')
  // @UseGuards(AuthGuard())
  // testingPrivateRoute(
  //   @Req() request: Express.Request,
  //   @RawHeaders() rawHeaders: string[],
  //   @GetUser() user?: User,
  //   @GetUser('email') userEmail?: string,
  // ) {
  //   console.log(request);

  //   return rawHeaders;
  // }

  // @Get('private2')
  // //@SetMetadata('roles', ['admin', 'super-user'])
  // @RoleProtected(ValidRoles.superUser, ValidRoles.admin, ValidRoles.user)
  // @UseGuards(AuthGuard(), UserRoleGuard)

  // testingPrivateRoute2(
  //   @Req() request: Express.Request,
  //   //@RawHeaders() rawHeaders: string[],
  //   @GetUser() user?: User,
  //   @GetUser('email') userEmail?: string,
  // ) {

  //   return user;
  // }


  // @Get('private3')
  // @Auth(ValidRoles.admin)
  // testingPrivateRoute3(
  //   @GetUser() user?: User,
  // ) {

  //   return user;
  // }


}
