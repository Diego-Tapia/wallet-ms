import { Controller, Get, Response } from "@nestjs/common";
import { HealthService } from "src/healthcheck/service.health";

@Controller('health')
export class HealthController {
  constructor(private readonly serviceHealth: HealthService) { }
  
  @Get()
  async getHealth(@Response() res) {
    try {
      return await this.serviceHealth.isHealthy(res);

    } catch (error) {
      throw new Error(error.message);
    }

  }
}
