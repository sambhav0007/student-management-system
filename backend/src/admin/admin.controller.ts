import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { EnrollmentsService } from '../enrollments/enrollments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  @Get('stats')
  getStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('enrollment-stats')
  getEnrollmentStats() {
    return this.adminService.getEnrollmentStatsByCourse();
  }

  // ✅ THIS POWERS ADMIN ENROLLMENT TABLE
  @Get('enrollments')
  getAllEnrollments() {
    return this.enrollmentsService.getAllEnrollments();
  }
}
