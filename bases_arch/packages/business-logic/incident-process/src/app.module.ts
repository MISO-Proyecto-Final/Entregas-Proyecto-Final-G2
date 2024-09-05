import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IncidentModule } from './infrastructure/entry_points/incident/incident.module';
import { DatabasesModule } from './infrastructure/adapters/databases/databases.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentEntity } from "./infrastructure/adapters/databases/entities/incident.entity";
import { CustomerEntity } from "./infrastructure/adapters/databases/entities/customer.entity";

@Module({
  imports: [
    IncidentModule,
    DatabasesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'abcall',
      entities: [IncidentEntity, CustomerEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
