import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Politico!',
  });
});

app.listen(port);
console.log(`Politico running on port ${port}`);

export default app;
