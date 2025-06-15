import { Controller, Get, Param } from '@nestjs/common';

@Controller('track-calories-barcode')
export class TrackCaloriesBarcode {
  @Get(':bardcode')
  searchFoodBarcode(@Param('barcode') barcode: string) {
    return `display food info from using its barcode.`;
  }
}
