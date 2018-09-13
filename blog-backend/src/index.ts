require('dotenv').config();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import mongoose from 'mongoose';

import api from './api';

const app = new Koa();
const router = new Router();

const {
  PORT: port = 4000,
  MONGO_URI: mongoURI,
  COOKIE_SIGN_KEY: signKey,
} = process.env as any;

mongoose.Promise = global.Promise;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch(e => {
    console.error(e);
  });

router.use('/api', api.routes());

app.use(bodyParser());

const sessionConfig = {
  maxAge: 1000 * 60 * 60 * 24,
};

app.use(session(sessionConfig, app));

app.keys = [signKey as string];

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log('app is listening port', port);
});
