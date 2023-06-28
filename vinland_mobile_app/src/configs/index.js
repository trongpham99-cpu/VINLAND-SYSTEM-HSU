const env = process.env.NODE_ENV || "development";

const development = {
  api: {
    url: "http://172.16.10.107:8080",
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
