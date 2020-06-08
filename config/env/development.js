const port = Number.parseInt(process.env.PORT) || 9001;

export default {
    port: port,
    database: {
        DATABASE: 'hunter',
        USERNAME: 'wisdom',
        PASSWORD: '13JWpgaPal9N1ebE',
        PORT: '3306',
        HOST: '10.204.13.156'
    },
    redis: {
        isRedisCluster: true,
        nodes: [
            { host: '10.204.4.1', port: 6387 },
            { host: '10.204.4.2', port: 6387 },

            { host: '10.204.4.2', port: 6388 },
            { host: '10.204.4.3', port: 6386 },

            { host: '10.204.4.3', port: 6387 },
            { host: '10.204.4.1', port: 6388 }
        ],
        clusterOptions: {
            keyPrefix: '{s}:',
            redisOptions: {
                password: "4lUdIsyC8jRAl8D",
                ttl: 8640000
            }
        }
    }
}