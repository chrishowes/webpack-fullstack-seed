if (process.env.NODE_ENV !== "production") {
  require('./devserver.js');
  require('./poll.js');
}

const koa = require('koa');

let app = koa();

app.use(function *() {
  this.body = 'Hello worl';
});

const HOST = process.env.SERVER_HOST || "0.0.0.0";
const PORT = process.env.SERVER_PORT || 8080;

app.listen(PORT, HOST, () => {
});

if (module.hot) {
  module.hot.decline();
};
