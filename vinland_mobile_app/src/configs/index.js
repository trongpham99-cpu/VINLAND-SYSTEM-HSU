const env = process.env.NODE_ENV || "development";

const development = {
    api: {
        url: "http://192.168.0.105:8080",
    },
};

const production = {
    api: {
        url: "https://vinland-api.herokuapp.com",
    },
};

const config = {
    development: development,
    production: production,
};

export default config[env];
