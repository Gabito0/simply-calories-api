import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "../entities/user.entity";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { use } from "passport";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  private signToken(user: User) {
    return this.jwt.sign({
      sub: user.id,
      email: user.email,
    });
  }

  async register(dto: RegisterDto) {
    const existing = await this.usersRepo.findOne({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException("Email already in use");

    const password_hash = await bcrypt.hash(dto.password, 12);

    const user = this.usersRepo.create({
      email: dto.email,
      password_hash,
      verified: false,
      subject_identifier: null,
    });

    const saved = await this.usersRepo.save(user);

    return {
      user: {
        id: saved.id,
        email: saved.email,
        verified: saved.verified,
        subject_identifier: saved.subject_identifier,
      },
      acces_token: this.signToken(saved),
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new ConflictException("Invalid credentials");

    const ok = await bcrypt.compare(dto.password, user.password_hash);
    if (!ok) throw new UnauthorizedException("Invalid credentials");

    return {
      user: {
        id: user.id,
        email: user.email,
        verified: user.verified,
        subject_identifier: user.subject_identifier,
      },
      access_token: this.signToken(user),
    };
  }

  async me(userId: string) {
    const user = await this.usersRepo.findOne({
      where: { id: userId },
      relations: { profile: true } as any,
    });
    if (!user) throw new UnauthorizedException("User not found");

    return {
      id: user.id,
      email: user.email,
      verified: user.verified,
      profile: user.profile ?? null,
    };
  }
}
