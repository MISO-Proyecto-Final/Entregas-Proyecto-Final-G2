import { Observable } from 'rxjs';
import { PortalUser } from '../entities/portal_user.entity';
/**
 * Interface for the Portal Mediator Authentication Service.
 */
export interface IPortalMediatorAuthService {
  /**
   * Logs a user in.
   *
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns An Observable that emits a PortalUser object if the login is successful, or an error otherwise.
   */
  auth_login(email: string, password: string): Observable<PortalUser>;

  /**
   * Verifies the authenticity of a token.
   *
   * @param token - The token to be verified.
   * @returns An Observable that emits a boolean value indicating whether the token is valid or not.
   */
  auth_verify(token: string): Observable<boolean>;
}
