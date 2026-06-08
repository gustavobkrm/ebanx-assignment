# EBANX API

EBANX assignment.

## Getting started
```bash
npm install
npm start
```

Server runs on port 3000 (or set `PORT` environment variable).

## Endpoints

| Method | Route                      | Description                              |
|--------|----------------------------|------------------------------------------|
| POST   | `/reset`                   | Resets all accounts                      |
| GET    | `/balance?account_id=<id>` | Returns account balance (404 if missing) |
| POST   | `/event`                   | Handles deposit, withdraw or transfer    |

### Event examples

```json
{"type": "deposit", "destination": "100", "amount": 10}
{"type": "withdraw", "origin": "100", "amount": 5}
{"type": "transfer", "origin": "100", "destination": "300", "amount": 15}
```

## Project structure

```
src/
├── model/
│   └── account.ts          # Simple account type     
├── services/
│   └── bank-operations.ts  # Business Logic 
├── controller/
│   └── app.ts              # Routes
└── index.ts                # Entry point
```

## Scripts

- `npm start` - start the server
- `npm run dev` - start with auto-reload (--watch)
- `npm run typecheck` - type-check with tsc
