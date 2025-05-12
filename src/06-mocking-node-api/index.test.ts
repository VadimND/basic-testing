// Uncomment the code below and write your tests

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs/promises';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeoutSpy).toHaveBeenLastCalledWith(callback, timeout);
    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(setIntervalSpy).toHaveBeenLastCalledWith(callback, interval);
    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(3000);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

jest.mock('fs/promises');

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'text.txt';
    const joinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);

    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
    joinSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'nonexistent.txt';
    (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found')); // ���������, ��� readFile - ��� ���-�������

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'test.txt';
    const fileContent = 'Hello, world!';

    (fs.readFile as jest.Mock).mockResolvedValue(fileContent);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(fileContent);
  });
});
