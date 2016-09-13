const config = {
    urls: {
        articles: 'https://auth0.com/docs/meta/articles'
    },
    servers: {
        web: {
            production: {
                port: 80
            },
            development: {
                port: 3000
            }
        },
        static: {
            port: 8080
        },
        websocket: {
            port: 8090
        }
    }
};

module.exports = config;
