const env = process.env.NODE_ENV || "development";

const development = {
  api: {
    url: "http://192.168.1.116:8080",
  },
};

const production = {
  api: {
    url: "https://vinland-hsu-server-ddae33bb8188.herokuapp.com/",
  },
};

const config = {
  development: development,
  production: production,
};

export default config[env];
