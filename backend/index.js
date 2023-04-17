
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import { app, Datastore } from 'codehooks-js'
import { crudlify } from 'codehooks-crudlify'
import { date, object, string, boolean } from 'yup';
import jwtDecode from 'jwt-decode';

const todoListYup = object({
  title: string().required(),
  content: string().required(),
  createdOn: date().default(() => new Date()).required(),
  done: boolean().required().default(false),
})

const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      const token_parsed = jwtDecode(token);
      req.user_token = token_parsed;
    }
    next();
  } catch (error) {
    next(error);
  }
};
app.use(userAuth);

crudlify(app, {todoList: todoListYup})

export default app.init();
