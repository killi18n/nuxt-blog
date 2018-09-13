import { Context } from 'koa';

const { ADMIN_PASS: adminPass } = process.env;

export const login = async (ctx: any) => {
  const { password } = ctx.request.body;
  if (adminPass === password) {
    ctx.body = {
      success: true,
    };
    ctx.session.logged = true;
  } else {
    ctx.body = {
      success: false,
    };
    ctx.status = 401;
  }
};

export const check = async (ctx: any) => {
  ctx.body = {
    logged: !!ctx.session.logged,
  };
};

export const logout = async (ctx: any) => {
  ctx.session = null;
  ctx.status = 204;
};
