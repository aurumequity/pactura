import { Controller, Get, Req } from '@nestjs/common';
import { OrgsService } from './orgs.service';

@Controller('orgs')
export class OrgsController {
  constructor(private readonly orgsService: OrgsService) {}

  @Get()
  async getOrgs(@Req() req: any) {
    return this.orgsService.getOrgsForUser(req.raw.user.uid);
  }
}
