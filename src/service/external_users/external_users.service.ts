import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ExternalUsersService {
  constructor(private readonly httpService: HttpService) {}

  async getUser(userId: string): Promise<string> {
    const response = this.httpService.axiosRef.get(
      `https://reqres.in/api/users/${userId}`,
    );
    return (await response).data.data;
  }
}
