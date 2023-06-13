const env = process.env.NODE_ENV || "development";

const development = {
  api: {
    url: "http://192.168.56.1:8080",
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
