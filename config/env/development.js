const port = Number.parseInt(process.env.PORT) || 9050;

export default {
  port: port,
  database: {
    DATABASE: 'hunter',
    USERNAME: 'jimliu',
    PASSWORD: '123456',
    PORT: '3306',
    HOST: 'localhost'
  }
}