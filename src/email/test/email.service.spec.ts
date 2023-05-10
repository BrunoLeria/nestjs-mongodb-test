import { Test, TestingModule } from '@nestjs/testing';
import EmailService from '../email.service';
import { ConfigModule } from '@nestjs/config';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [EmailService],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('sendEmail', () => {
  //   it('should send an email', async () => {
  //     const options = {
  //       from: '${process.env.EMAIL_USER}',
  //       to: 'brunovolpatol@hotmail.com',
  //       subject: 'Welcome to NestJS',
  //       text: 'Welcome to NestJS',
  //     };

  //     const result = await service.sendEmail(options);

  //     expect(result).toEqual({ success: true });
  //   });
  // });
});
