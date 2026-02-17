import { Controller, Get, Req } from '@nestjs/common'

@Controller('whoami')
export class WhoAmIController {
  @Get()
  whoami(@Req() req: any) {
    // AuthMiddleware sets req['user'] = { userId: decoded.uid }
    return { userId: req.user?.userId ?? null }
  }
}