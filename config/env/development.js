const port = Number.parseInt(process.env.PORT) || 9001;

export default {
  port: port,
  database: {
    DATABASE: 'hunter',
    USERNAME: 'admin',
    PASSWORD: 'passwd',
    PORT: '3306',
    HOST: '192.168.19.57'
  }
}