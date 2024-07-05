// vue.config.js
const dotenv = require('dotenv');

module.exports = () => {
  const env = dotenv.config().parsed;

  // Define las variables de entorno para Vue.js
  const environmentVariables = {};
  for (const key in env) {
    environmentVariables[`process.env.${key}`] = JSON.stringify(env[key]);
  }

  return {
    pluginOptions: {
      define: environmentVariables
    }
  };
};
