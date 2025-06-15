import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats.controller';
import { TrackCaloriesBarcode } from './track-calories-barcode.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, TrackCaloriesBarcode],
  providers: [AppService],
})
export class AppModule {}
