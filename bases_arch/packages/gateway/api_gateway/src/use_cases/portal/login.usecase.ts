import { Observable } from 'rxjs';
import { PortalUser } from '../../domain/entities/portal_user.entity';
import { IPortalMediatorAuthService } from '../../domain/ports/IportalMediator.auth.service';

export class LoginUseCase {
  constructor(private authService: IPortalMediatorAuthService) {}

  execute(email: string, password: string): Observable<PortalUser> {
    return this.authService.auth_login(email, password);
  }
}
