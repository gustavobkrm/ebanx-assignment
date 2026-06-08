import express from "express";
import type { Request, Response } from "express";
import { BankOperations } from "../services/bank-operations.ts";

export function createApp(bank: BankOperations) {
  const app = express();
  app.use(express.json());

  type EventHandler = (bank: BankOperations, body: any, res: Response) => void;

  const handlers: Record<string, EventHandler> = {
    deposit: (bank, { destination, amount }, res) => {
      res.status(201).json({ destination: bank.deposit(destination, amount) });
    },
    withdraw: (bank, { origin, amount }, res) => {
      res.status(201).json({ origin: bank.withdraw(origin, amount) });
    },
    transfer: (bank, { origin, destination, amount }, res) => {
      res.status(201).json(bank.transfer(origin, destination, amount));
    },
  };

  app.post("/reset", (_req, res) => {
    bank.reset();
    res.status(200).send("OK");
  });

  app.get("/balance", (req, res) => {
    const accountId = String(req.query.account_id);
    const balance = bank.getBalance(accountId);

    if (balance === undefined) {
      res.status(404).send("0");
      return;
    }
    res.status(200).send(String(balance));
  });

  app.post("/event", (req: Request, res: Response) => {
    const handler = handlers[req.body?.type];
    if (!handler) {
      res.status(400).send("unknown event type");
      return;
    }
    try {
      handler(bank, req.body, res);
    } catch (err) {
      if (err instanceof Error && err.message.includes("does not exist")) {
        res.status(404).send("0");
        return;
      }
      throw err;
    }
  });

  return app;
}
