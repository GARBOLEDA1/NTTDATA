function fn() {
  var env = karate.env; // get system property 'karate.env'
  karate.log('karate.env system property was:', env);
  karate.log('PRIMERO');

  if (env === 'pre') {
    karate.log('ENV PRE >>>>>>>>>>>>>');
  } else if (env === 'des') {
    karate.log('ENV DES >>>>>>>>>>>>>');
  }

  // Define la base URL de la API
  var url = 'https://petstore.swagger.io/v2/';

  var config = {
    env: env,
    myVarName: 'someValue',
    url: url
  };

  return config;
}