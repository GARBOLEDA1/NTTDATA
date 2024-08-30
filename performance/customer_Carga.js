import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Rate } from 'k6/metrics';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { generalSummary } from '../summaryConfig.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
//let ErrorRate = new Rate('error_rate');
//let ErrorRate = new Rate('error_rate');
export const options = {
  stages: [
  //  { target: 30, duration: '30s' }, //Configuración de RumpUp
  //  { target: 30, duration: '60m' }, // Tiempo de ejecución 
  //  { target: 0, duration: '30s' },  //Configuración Ramp Down
  { target: 1, duration: '1s' },
  { target: 1, duration: '15s' },
  { target: 0, duration: '1s' },
  ],

  //vus:1,
  //iterations:1,
  
  thresholds: {
    "http_req_duration": ["avg <= 4000"],//http req duration con percentil o con que average, duración máxima
    "iterations": ["rate >= 0.01"], //Corresponde a TPS testing 3 años lo que me da la matriz
    "http_req_failed": ["rate <= 0.03"],//comparar con http failed
  },
};

function toUrlEncoded(params) {
  return Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');
}


export default function () {
  // Define the URL endpoint
  const url = 'https://bxi-qa.csbservicios.com/puc/security/login';
  const urlCustomerProducts = 'https://bxi-qa.csbservicios.com/puc/resources/customer-products?customerId=170&accountType=DEP';
  const urlLogout = 'https://bxi-qa.csbservicios.com/puc/security/logout';


  // Define the headers
  const headers = {
    'User-Agent': 'Postman',
    'X-GeoPosition': '10:10',
    'X-CallerIP': '192.168.100.5',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic cGxhdGFmb3JtYV91bmljYV9jbGllbnRlczpzZWNyZXQ='
  };

  // Define the payload
  const payload = {
    username: '3113823864',
    password: 'PedroPablo1',
    grant_type: 'password',
    scope: 'read',
    device_id: '9067d52d7980baed'
  };


  const payloadEncoded = toUrlEncoded(payload);


  // Perform the HTTP POST request
  const responseLogin = http.post(url, payloadEncoded, { headers });
  if (check(responseLogin, {'responseLogin status was 200': (r) => r.status == 200  })){} else {console.log(`responseLogin: ${responseLogin.body}`)};  //Imprimir error solo cuando suceda
  console.log(`responseLogin : ${responseLogin}`);

  const tokenData = JSON.parse(tokenResponse.body);
  const accessToken = tokenData.access_token;

  const headersCustomerProducts = {
    'x-user-device': '1234',
    'X-GEOPOSITION': '10:10',
    'X-CallerIP': '10.10.20.10',
    'Authorization': `Bearer ${accessToken}`,
  };


  const responseCustomerProducts = http.get(urlCustomerProducts, { headersCustomerProducts });
  if (check(responseCustomerProducts, {'responseCustomerProducts status was 200': (r) => r.status == 200  })){} else {console.log(`responseCustomerProducts: ${responseCustomerProducts.body}`)}; 
  console.log(`responseCustomerProducts : ${responseCustomerProducts}`);

  const headersLogout = {
    'User-Agent': 'Postman',
    'X-GeoPosition': '10:10',
    'X-CallerIP': '192.168.100.5',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${accessToken}`,
  };

  const responseLogout = http.post(urlLogout, null, { headersLogout });
  if (check(responseLogout, {'responseLogout status was 200': (r) => r.status == 200  })){} else {console.log(`responseLogout: ${responseLogout.body}`)}; 
  console.log(`responseLogout : ${responseLogout}`);

  sleep(randomIntBetween(2, 4)); //configuración de esperas

}

export function handleSummary(data) {
    return generalSummary(data) //Datos para la generación de reportes
}
