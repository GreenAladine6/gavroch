// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './shared/prisma/prisma.module';
import { AuditLogsModule } from './modules/audit-logs/audit-logs.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
//import { OrdersModule } from './modules/orders/orders.module';
//import { FeedbackModule } from './modules/feedback/feedback.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuditLogsModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    
  ],
})
export class AppModule {}