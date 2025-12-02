import { Controller, Get } from "@nestjs/common";
import { SuperadminService } from "./superadmin.service";

@Controller("superadmin")
export class SuperadminController {
  constructor(private service: SuperadminService) {}

  @Get("stats")
  stats() {
    return this.service.stats();
  }
}
