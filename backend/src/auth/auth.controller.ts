import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(email, password);

    // SET COOKIE CORRECTAMENTE
    res.cookie("Authentication", result.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return { message: "ok" };
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request & { user: any }) {
    return this.authService.getProfile(req.user.sub);
  }
}