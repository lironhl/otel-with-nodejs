import opentelemetry from '@opentelemetry/api';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { tracer } from './tracing';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    tracer.startActiveSpan('Parent', (parentSpan) => {
      const childSpan = tracer.startSpan(
        'Son',
        {},
        opentelemetry.context.active(),
      );

      setTimeout(() => {
        childSpan.end();
        parentSpan.end();
      }, 5000);
    });
    return this.appService.getHello();
  }
}
