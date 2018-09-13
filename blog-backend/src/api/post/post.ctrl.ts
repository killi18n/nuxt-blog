import Post from 'models/post';
import Joi from 'joi';
import { Types } from 'mongoose';

const { ObjectId } = Types;

export const checkObjectId = async (ctx: any, next: any) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  return next();
};

export const checkLogin = async (ctx: any, next: any) => {
  if (!ctx.session.logged) {
    ctx.status = 401;
    return null;
  }

  return next();
};

export const list = async (ctx: any) => {
  const page = parseInt(ctx.query.page || 1, 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  const { tag } = ctx.query;
  const query = tag
    ? {
        tags: tag,
      }
    : {};

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const postCount = await Post.count(query).exec();
    const limitBodyLength = (post: any) => ({
      ...post,
      body:
        post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
    });
    ctx.body = {
      posts: posts.map(limitBodyLength),
      lastPage: Math.ceil(postCount / 10),
    };
    // ctx.set('Last-Page', Math.ceil(postCount / 10));
  } catch (e) {
    ctx.throw(e, 500);
  }
};

export const write = async (ctx: any) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required(),
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;

  const post = new Post({
    title,
    body,
    tags,
  });

  try {
    await post.save();
    ctx.body = post;
    ctx.status = 201;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

export const read = async (ctx: any) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

export const update = async (ctx: any) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

export const remove = async (ctx: any) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(e, 500);
  }
};
