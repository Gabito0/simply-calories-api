import { Controller, Get, Param } from '@nestjs/common';
import { FatSecretApi } from 'fat_secret_api/api';

@Controller('track-calories-barcode')
export class TrackCaloriesBarcode {
  @Get(':barcode')
  async searchFoodBarcode(@Param('barcode') barcode: string): Promise<string> {
    await FatSecretApi.getToken();
    const foodInfo = await FatSecretApi.getFoodInfo(barcode);
    return foodInfo;
  }
}
