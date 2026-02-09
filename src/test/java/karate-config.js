function fn() {
  var env = karate.env; // get system property 'karate.env'
  karate.log('karate.env system property was:', env);
  karate.log('PRIMERO');

  if (env === 'pre') {
    karate.log('ENV PRE >>>>>>>>>>>>>');
  } else if (env === 'des') {
    karate.log('ENV DES >>>>>>>>>>>>>');
  }

  var petstore = 'https://petstore.swagger.io';
  // var petstore = karate.properties['url'];

  var config = {
    env: env,
    myVarName: 'someValue',
    petstore: petstore
  }

  return config;
}