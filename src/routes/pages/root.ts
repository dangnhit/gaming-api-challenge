import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  res.status(200).header('Content-Type', 'text/html').send(`<h4>💊 RESTful API for Backend Development Challenge</h4>`);
});

export default router;
