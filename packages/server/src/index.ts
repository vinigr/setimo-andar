import { createServer } from 'http';
import app from './app';

(async () => {
  const server = createServer(app.callback());

  server.listen('4000', () => {
    console.log(`server running at http://localhost:4000`);
  });
})();
