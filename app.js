// IMPORTS
import express from 'express';
import { accountRouter } from './routes/accountRouter.js';
import { db } from './models/index.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexão realizada com sucesso!');
  } catch (error) {
    console.log('Ocorreu um erro ao realizara  conexão!');
  }
})();

const app = express();
app.use(express.json());
app.use(accountRouter);

app.get('/', (req, res) => {
  res.send('Executing API...');
});

app.listen(3000, () => console.log('API Started'));
