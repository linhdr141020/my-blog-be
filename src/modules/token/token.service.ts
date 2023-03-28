import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  generateTokens(user: User) {
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      secret: process.env.JWT_SECRET_KEY,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFESH_EXPIRES_IN,
      secret: process.env.JWT_SECRET_REFESH_KEY,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: number, refreshToken: string) {
    const userWithToken = await this.userService.getById(userId);
    const tokenData = await this.tokenRepository.findOne({
      user: userWithToken,
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return this.tokenRepository.save(tokenData);
    }
    const token = new Token();
    token.user = userWithToken;
    token.refreshToken = refreshToken;
    await this.tokenRepository.save(token);
    return token;
  }

  async removeToken(refreshToken: string) {
    await this.tokenRepository.delete({ refreshToken: refreshToken });
  }

  validateRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.REFRESH_SECRET,
      });
    } catch (e) {
      throw new HttpException('Token is invalid!!!', HttpStatus.UNAUTHORIZED);
    }
  }

  async findToken(refreshToken: string) {
    return await this.tokenRepository.findOne(
      { refreshToken: refreshToken },
      { relations: ['user'] },
    );
  }

  async findRefreshTokenByUserId(userId: number) {
    return await this.tokenRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
}
