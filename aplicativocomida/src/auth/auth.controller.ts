import {Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";





@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
        constructor(private readonly authService: AuthService) {}




@Post('login/email')
async loginemail (@Body() data: CreateAuthDto){
    return this.authService.validateUserEmail(data)
}


@Post('login/Cpf')
