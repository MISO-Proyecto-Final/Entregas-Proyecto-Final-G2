import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall, status } from '@grpc/grpc-js';

interface LoginRequest {
  email: string;
  password: string;
}
interface LoginResponse {
  id: string;
  email: string;
  token: string;
}

@Controller('auth')
export class AuthController {
  @GrpcMethod('AuthService', 'login')
  async login(
    data: LoginRequest,
    metadata: Metadata,
    call: ServerUnaryCall<LoginRequest, LoginResponse>,
  ) {
    console.log(metadata);
    console.log(data);

    if (data.email === 'admin' && data.password === 'admin') {
      const responseMetadata = new Metadata();
      responseMetadata.set('ValorMetadata', '1');
      call.sendMetadata(responseMetadata);
      const responseData = {
        id: '1',
        email: data.email,
        token: 'token',
      };
      return responseData;
    } else {
      throw new RpcException({
        code: status.UNAUTHENTICATED,
        message: 'Unauthorized',
      });
    }
  }
}
