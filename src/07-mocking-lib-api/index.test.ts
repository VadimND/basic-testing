import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const relativePath = '/posts/1';
    const mockData = { id: 1, title: 'Test Post' };

    const mockedAxios = axios.create as jest.Mock;
    mockedAxios.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    });

    const result = await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    expect(result).toEqual(mockData);
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts/1';
    const mockData = { id: 1, title: 'Test Post' };

    const mockedAxios = axios.create as jest.Mock;
    mockedAxios.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    });

    const result = await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    expect(mockedAxios().get).toHaveBeenCalledWith(relativePath);
    expect(result).toEqual(mockData);
  });

  test('should return response data', async () => {
    const url = 'https://api.example.com/data';
    const mockData = { id: 1, name: 'Test' };

    const mockedAxios = axios.create as jest.Mock;
    mockedAxios.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    });

    const result = await throttledGetDataFromApi(url);

    expect(result).toEqual(mockData);
    expect(mockedAxios().get).toHaveBeenCalledWith(url);
  });
});
