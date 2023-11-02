import 'dotenv/config'; // env파일 사용
import cors from 'cors';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 8088;

app.use(cors()); // CORS 이슈 해결
app.use(express.urlencoded({ extended: true })); // query 받기
app.use(express.json()); // body 받기

const router = express.Router();
router.get('/api', (req, res, next) => {
  res.json({ message: 'welcome!' });
});

app.use('/', router);
app.listen(PORT, () => {
  console.log(`
  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃   Server listening on port: ${PORT}    ┃
  ┃     http://localhost:${PORT}/api       ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  `);
});
