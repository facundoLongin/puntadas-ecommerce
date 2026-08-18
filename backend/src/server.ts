import { createApp } from "./app.js";
import { env } from "./shared/config/env.js";

const app = createApp();

app.listen(env.port, () => {
  console.log(`Puntadas backend listening on http://localhost:${env.port}`);
});
