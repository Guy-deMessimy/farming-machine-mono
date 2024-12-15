import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { EngineService } from './engine.service';
import { Engine } from './engine.entity';
import { AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

describe('EngineService', () => {
  let service: EngineService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EngineService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EngineService>(EngineService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getEngineList', () => {
    it('should return an array of engines', (done) => {
      const mockEngines: Engine[] = [
        { id: 1, brandName: 'Brand1', modelName: 'Model1' } as Engine,
        { id: 2, brandName: 'Brand2', modelName: 'Model2' } as Engine,
      ];

      const mockHeaders = new AxiosHeaders();
      mockHeaders.set('Content-Type', 'application/json');

      const mockConfig: InternalAxiosRequestConfig = {
        headers: mockHeaders,
        url: '',
        method: 'post',
      };

      const mockResponse: AxiosResponse = {
        data: {
          data: {
            findAllEngines: mockEngines,
          },
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: mockConfig,
      };

      jest.spyOn(httpService, 'post').mockReturnValueOnce(of(mockResponse));

      const query = '{ findAllEngines { id brandName modelName } }';

      service.findAllEngines({
        graphQlQuery: query,  
        query: {},    
      }).subscribe({
        next: (engines) => {
          expect(engines).toEqual(mockEngines);
          expect(httpService.post).toHaveBeenCalledWith(
            expect.any(String),
            { query },
            expect.any(Object),
          );
          done();
        },
        error: done,
      });
    });

    it('should handle errors', (done) => {
      const errorHeaders = new AxiosHeaders();
      errorHeaders.set('Content-Type', 'application/json');

      const errorConfig: InternalAxiosRequestConfig = {
        headers: errorHeaders,
        url: '',
        method: 'post',
      };
      const errorResponse: AxiosResponse = {
        data: { errors: [{ message: 'API Error' }] },
        status: 400,
        statusText: 'Bad Request',
        headers: errorHeaders,
        config: errorConfig,
      };

      jest
        .spyOn(httpService, 'post')
        .mockReturnValueOnce(throwError(() => ({ response: errorResponse })));

      const query = '{ findAllEngines { id brandName modelName } }';

      service.findAllEngines({
        graphQlQuery: query, 
        query: {},
      }).subscribe({
        next: () => done.fail('Should have thrown an error'),
        error: (error) => {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('Failed to query API');
          done();
        },
      });
    });
  });
});
