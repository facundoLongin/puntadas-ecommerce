import { spawnSync } from "node:child_process";

const result = spawnSync("npx", ["next", "build"], {
  cwd: new URL("../frontend", import.meta.url),
  env: {
    ...process.env,
    NEXT_OUTPUT: "export"
  },
  shell: process.platform === "win32",
  stdio: "inherit"
});

process.exit(result.status ?? 1);
