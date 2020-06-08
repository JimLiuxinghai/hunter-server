const port = Number.parseInt(process.env.PORT) || 9050;

export default {
  port: port,
  database: {
    DATABASE: 'hunter',
    USERNAME: 'username',
    PASSWORD: 'password',
    PORT: '3306',
    HOST: '127.0.0.1',
    dateStrings: 'DATE'
  }
}