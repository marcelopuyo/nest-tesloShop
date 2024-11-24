import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService
  ) {};

  async create(createUserDto: CreateUserDto) {

    try {

      const { password, ...rest } = createUserDto;

      const user = this.userRepository.create({
        ...rest,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user);

      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };
      
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {

      const { password, email} = loginUserDto;

      const user = await this.userRepository.findOne({ 
        where: { email },
        select: { email: true, password: true, id: true} 
      });

      //no existe el usuario
      if (!user) throw new UnauthorizedException('Credenciales no validas');

      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('Credenciales no validas');
      };

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };
  }

  async checkAuthStatus(id: string) {

    const user = await this.userRepository.findOne({ 
      where: { id },
      select: { email: true, password: true, id: true, fullName: true} 
    });

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };


  }

  private getJwtToken(payload: JwtPayload) {

    const token = this.jwtService.sign(payload);

    return token;

  }

  private handleDBErrors(error: any): never {

    if (error.code === '23505') {
      throw new BadRequestException(error.detail)
    }


    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  };

}
