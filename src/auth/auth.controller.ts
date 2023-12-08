import { Controller, ForbiddenException, Get, Post, UseGuards } from "@nestjs/common";
import { CurrentUser, JwtAuthGuard } from "./auth.guard";
import { UserEntity } from "src/user/user.entity";
import { PrismaService } from "src/prisma/prisma.service";
import { cryptoPassword } from "src/libs/hash";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Args } from "@nestjs/graphql";


@Controller("api/auth")
@ApiTags("")
export class AuthController {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly authService: AuthService
    ) { }

    @Get("getInfo")
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "" })
    getInfo(
        @CurrentUser() user: UserEntity
    ) {
        console.log(user)
        return user;
    }
}