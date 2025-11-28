import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // 1) Leer token desde encabezado Authorization
        ExtractJwt.fromAuthHeaderAsBearerToken(),

        // 2) Leer token desde la cookie llamada "token"
        (req: Request) => {
          return req?.cookies?.token ?? null;
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return payload; 
  }
}
