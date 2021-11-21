import { createServer } from 'http';

(async () => {
  const server = createServer();

  server.listen('4000', () => {
    console.log(`server running at http://localhost:4000`);
  });
})();
