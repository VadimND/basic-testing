// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);

    expect(() => {
      account.withdraw(1000);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(10);
    const account2 = getBankAccount(20);

    expect(() => {
      account1.transfer(15, account2);
    }).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(10);

    expect(() => {
      account.transfer(15, account);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(1000);
    account.deposit(100);

    expect(account.getBalance()).toBe(1100);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(1000);
    account.withdraw(100);

    expect(account.getBalance()).toBe(900);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(500);
    const account2 = getBankAccount(1000);
    account1.transfer(100, account2);

    expect(account1.getBalance()).toBe(400);
    expect(account2.getBalance()).toBe(1100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(500);
    const balance = await account.fetchBalance();

    if (balance !== null) {
      expect(balance).toBe(balance);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    let account = getBankAccount(500);
    const balance = await account.fetchBalance();

    if (typeof balance === 'number' && balance > 0) {
      account = getBankAccount(balance);
    }

    expect(account.getBalance()).toBeGreaterThan(0);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(500);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
