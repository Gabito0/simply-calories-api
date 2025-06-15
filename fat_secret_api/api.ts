import {} from 

export class FatSecretApi {
  token = null;
  expires_in = null;
  static async getToken() {
    try {
      const resp = await axios({
        method: 'post',
        url: 'https://oauth.fatsecret.com/connect/token',
        auth: {
          username: FATSECRET_CLIENT_ID,
          password: FATSECRET_CLIENT_SECRET,
        },
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: new URLSearchParams({
          grant_type: 'client_credentials',
          scope: 'barcode',
        }).toString(),
      });
      this.token = resp.data.access_token;
      this.expires_in = resp.data.expires_in;
      // console.log(this.token);
      return true;
    } catch (error) {
      console.error(
        'Error in fatSecret function:',
        error.response ? error.response.data : error.message,
      );
      throw error;
    }
  }

  static async getId(barcodeNum) {
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
            Authorization: `Bearer ${this.token}`,
          },
        },
      );
      return res.data.food_id.value;
    } catch (error) {
      console.error(res.error ? error.response.data : error.message);
      throw error;
    }
  }

  static async getFoodInfo(barcode) {
    try {
      await this.getToken();
      const foodId = await this.getId(barcode);

      const res = await axios.post(
        'https://platform.fatsecret.com/rest/server.api',
        new URLSearchParams({
          method: 'food.get.v4',
          food_id: foodId,
          format: 'json',
        }),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${this.token}`,
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
