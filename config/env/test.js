const port = Number.parseInt(process.env.PORT) || 5000;

export default {
    port: port,
    database: {
        DATABASE: 'hunter',
        USERNAME: 'username',
        PASSWORD: 'password',
        PORT: '3306',
        HOST: '127.0.0.1',
        dateStrings: 'DATE'
    },
    redis: {
        port: 6379, // Redis port
        host: "127.0.0.1", // Redis host
        family: 4, // 4 (IPv4) or 6 (IPv6)
        password: "auth",
        db: 0
    }
}