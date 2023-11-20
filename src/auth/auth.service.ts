import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private jwtService: JwtService) {}
    
    async registerUser(email: string, password: string, firstName: string, lastName: string): Promise<any> {
        console.log(email, password, firstName, lastName);
        const user = await this.userService.findOne(email);
        const hashed_password = await bcrypt.hash(password, 10);
        if (!user) {
            await this.userService.create(email, hashed_password, firstName, lastName);
        }
    }
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            return true;
            };
        return false;
    }
    async login(user: any) {
        const payload = { email: user.email, sub: user.email};
        if (await this.validateUser(user.email, user.password)) {
            return {
                access_token: this.jwtService.sign(payload),
            };
        }else{
            return null;
        }
    }
}
