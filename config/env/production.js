const port = Number.parseInt(process.env.PORT) || 9050;

export default {
  port: port,
  database: {
    DATABASE: 'hunter',
    USERNAME: 'join_web',
    PASSWORD: 'mysql_joinwisdom',
    PORT: '3306',
    HOST: '10.6.5.137',
    dateStrings: 'DATE'
  }
}