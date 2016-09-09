const config = {
    urls: {
        articles: 'https://auth0.com/docs/meta/articles',
        synonyms: 'http://datamarket.azure.com/dataset/bing/synonyms'
    },
    env: {
        production: {
            web: {
                port: 80
            }
        },
        development: {
            web: {
                port: 3000
            },
            static: {
                port: 8080
            }
        }
    }
};

module.exports = config;
