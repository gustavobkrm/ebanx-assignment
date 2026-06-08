import { createApp } from "./controller/app.ts";
import { BankOperations } from "./services/bank-operations.ts";

const port = Number(process.env.PORT) || 3000;

const bank = new BankOperations();
const app = createApp(bank);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
