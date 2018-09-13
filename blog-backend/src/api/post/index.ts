import Router from 'koa-router';
import * as postCtrl from './post.ctrl';

const posts = new Router();

posts.get('/', postCtrl.list);
posts.get('/:id', postCtrl.checkObjectId, postCtrl.read);

posts.post('/', postCtrl.checkLogin, postCtrl.write);

posts.patch(
  '/:id',
  postCtrl.checkLogin,
  postCtrl.checkObjectId,
  postCtrl.update
);
posts.delete(
  '/:id',
  postCtrl.checkLogin,
  postCtrl.checkObjectId,
  postCtrl.remove
);

export default posts;
