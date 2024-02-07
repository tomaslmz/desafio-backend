import app from './appTest.setup';
import env from './schemas/envTest';

const port = env.NODE_PORT;

app.listen(port, () => {
  console.log('O servidor está rodando em http://localhost:' + port);
});