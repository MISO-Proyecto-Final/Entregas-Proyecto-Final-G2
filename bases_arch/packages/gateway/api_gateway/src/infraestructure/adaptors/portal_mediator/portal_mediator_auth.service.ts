import { Inject, Injectable } from '@nestjs/common';
import { IPortalMediatorAuthService } from '../../../domain/ports/IportalMediator.auth.service';
import { Observable } from 'rxjs';
import { PortalUser } from '../../../domain/entities/portal_user.entity';
import { ClientGrpc } from '@nestjs/microservices';

interface IPortalMediatorAuthServiceGrpc {
  login(data: { email: string; password: string }): Observable<PortalUser>;
}
@Injectable()
export class PortalMediatorAuthService implements IPortalMediatorAuthService {
  constructor(@Inject('PORTAL_PACKAGE') private client: ClientGrpc) {}
  private portalMediatorAuthServiceGrpc: IPortalMediatorAuthServiceGrpc;

  onModuleInit() {
    this.portalMediatorAuthServiceGrpc =
      this.client.getService<IPortalMediatorAuthServiceGrpc>('AuthService');
  }

  auth_login(email: string, password: string): Observable<PortalUser> {
    return this.portalMediatorAuthServiceGrpc.login({ email, password });
    if (email === 'admin' && password === 'admin') {
      return new Observable((subscriber) => {
        subscriber.next(new PortalUser('1', 'admin', 'token'));
        subscriber.complete();
      });
    }
    return new Observable((subscriber) => {
      subscriber.error(new Error('Invalid credentials'));
      subscriber.complete();
    });
  }

  auth_verify(token: string): Observable<boolean> {
    if (token === 'token') {
      return new Observable((subscriber) => {
        subscriber.next(true);
        subscriber.complete();
      });
    }
    return new Observable((subscriber) => {
      subscriber.error(new Error('Invalid token'));
      subscriber.complete();
    });
  }
}
