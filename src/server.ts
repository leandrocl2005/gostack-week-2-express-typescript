import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => res.send('oi, world!'));

app.listen(3333, () => {
  console.log('server starting at port 3333');
});
