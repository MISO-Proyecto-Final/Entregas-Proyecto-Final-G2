import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PortalMediatorAuthService } from '../../adaptors/portal_mediator/portal_mediator_auth.service';
import { Post, Body } from '@nestjs/common';
import { LoginUseCase } from '../../../use_cases/portal/login.usecase';
import { catchError } from 'rxjs';
import { PortalUser } from 'src/domain/entities/portal_user.entity';
@Controller('portal')
export class PortalController {
  constructor(private authService: PortalMediatorAuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: { email: string; password: string }) {
    const useCase = new LoginUseCase(this.authService);
    return useCase.execute(loginDto.email, loginDto.password).pipe<PortalUser>(
      catchError((error: Error) => {
        throw new HttpException(
          {
            message: error.message,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }),
    );
  }
}
