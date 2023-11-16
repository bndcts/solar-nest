import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private jwtService: JwtService) {}
    
    async registerUser(email: string, password: string, firstName: string, lastName: string): Promise<any> {
        const user = await this.userService.findOne(email);
        if (!user) {
            return await this.userService.create(email, password, firstName, lastName);
        }
        return null;
    }
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(email);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user: any) {
        const payload = { email: user.email, sub: user.email};
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
}
