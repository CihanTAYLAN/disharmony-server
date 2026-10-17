import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserService } from "../user/user.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

	async register(registerDto: RegisterDto) {
		const existingUser = await this.userService.findByEmail(registerDto.email);
		if (existingUser) {
			throw new UnauthorizedException("Email already exists");
		}

		const hashedPassword = await bcrypt.hash(registerDto.password, 10);
		const user = await this.userService.create({
			email: registerDto.email,
			name: registerDto.name,
			password: hashedPassword,
		});

		const token = this.jwtService.sign({ sub: user.id });

		return {
			user,
			token,
		};
	}

	async login(loginDto: LoginDto) {
		const user = await this.userService.findByEmail(loginDto.email);
		if (!user) {
			throw new UnauthorizedException("Invalid credentials");
		}

		const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException("Invalid credentials");
		}

		const token = this.jwtService.sign({ sub: user.id });

		const { password: _, ...userWithoutPassword } = user;
		return {
			user: userWithoutPassword,
			token,
		};
	}
}
