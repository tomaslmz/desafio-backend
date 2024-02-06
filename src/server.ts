import app from './app';
import env from './schemas/env';

const port = env.NODE_PORT;

app.listen(port, () => {
  console.log('O servidor está rodando em http://localhost:' + port);
});