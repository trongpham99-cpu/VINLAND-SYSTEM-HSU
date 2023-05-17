const env = process.env.NODE_ENV || 'development';

const development = {
    api: {
        url: 'http://172.16.10.97:8080',
    },
}

const production = {
    api: {
        url: 'https://vinland-api.herokuapp.com',
    },
}

const config = {
    development: development,
    production: production,
}

export default config[env];