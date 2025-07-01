import axios from 'axios';
import { config } from 'dotenv';
config();

const FATSECRET_CLIENT_ID = process.env.FATSECRET_CLIENT_ID;
const FATSECRET_CLIENT_SECRET = process.env.FATSECRET_CLIENT_SECRET;

export class FatSecretApi {
  static token: string | null = null;
  static expires_in: number | null = null;
  
  static async getToken() {
    try {
      const resp = await axios.post(
        'https://oauth.fatsecret.com/connect/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
          scope: 'barcode',
        }).toString(),
        {
          auth: {
            username: FATSECRET_CLIENT_ID || '',
            password: FATSECRET_CLIENT_SECRET || '',
          },
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }
      );
      FatSecretApi.token = resp.data.access_token;
      FatSecretApi.expires_in = resp.data.expires_in;
      return true;
    } catch (error) {
      console.error(
        'Error in fatSecret function:',
        error.response ? error.response.data : error.message,
      );
      throw error;
    }
  }

  static async getId(barcodeNum: string) {
    try {
      const res = await axios.post(
        'https://platform.fatsecret.com/rest/server.api',
        new URLSearchParams({
          method: 'food.find_id_for_barcode',
          barcode: barcodeNum,
          format: 'json',
        }).toString(),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${FatSecretApi.token}`,
          },
        },
      );
      return res.data.food_id.value;
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      throw error;
    }
  }

  static async getFoodInfo(barcode: string) {
    try {
      await FatSecretApi.getToken();
      const foodId = await FatSecretApi.getId(barcode);

      const res = await axios.post(
        'https://platform.fatsecret.com/rest/server.api',
        new URLSearchParams({
          method: 'food.get.v4',
          food_id: foodId,
          format: 'json',
        }).toString(),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${FatSecretApi.token}`,
          },
        },
      );
      return res.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
