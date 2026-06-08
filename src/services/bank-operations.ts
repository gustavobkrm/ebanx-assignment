import type { Account } from "../model/account.ts";

export class BankOperations {
  private readonly accounts = new Map<string, Account>();

  reset(): void {
    this.accounts.clear();
  }

  getBalance(id: string): number | undefined {
    return this.accounts.get(id)?.balance;
  }

  deposit(destination: string, amount: number): Account {
    const account = this.accounts.get(destination) ?? {
      id: destination,
      balance: 0,
    };
    account.balance += amount;
    this.accounts.set(destination, account);
    return account;
  }

  withdraw(origin: string, amount: number): Account {
    const account = this.accounts.get(origin);
    if (!account) {
      throw new Error(`Account ${origin} does not exist`);
    }

    account.balance -= amount;
    return account;
  }

  transfer(
    origin: string,
    destination: string,
    amount: number,
  ): { origin: Account; destination: Account } {
    const from = this.withdraw(origin, amount);
    const to = this.deposit(destination, amount);
    return { origin: from, destination: to };
  }
}
