import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Rate } from 'k6/metrics';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { generalSummary } from '../summaryConfig.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  stages: [
  //  { target: 30, duration: '30s' }, //Configuración de RumpUp
  //  { target: 30, duration: '60m' }, // Tiempo de ejecución 
  //  { target: 0, duration: '30s' },  //Configuración Ramp Down
  { target: 3, duration: '3s' },
  { target: 3, duration: '10s' },
  { target: 0, duration: '3s' },
  ],
  thresholds: {
    "http_req_duration": ["avg <= 3000"],//http req duration con percentil o con que average, duración máxima
    "iterations": ["rate >= 0.01"], //Corresponde a TPS testing 3 años lo que me da la matriz
    "http_req_failed": ["rate <= 0.03"],//comparar con http failed
  },
};
const csvDataNominaDigitalPOST = new SharedArray('cif', function () {    //Leer archivo CSV con data
  return papaparse.parse(open('../data/nominaDigitalPOST.csv'), {
    header: true,
  }).data;
});

let req_NominaDigitalPOST = JSON.parse(open('../request/nominaDigitalPOST.json')); //Variable que almacena archivo JSON
export default function () {
  const base_url = 'https://it-api-gateway.qa.masnominadigital.com'
  const urlNominaDigitalPOST = `${base_url}/biometrics/general/getAllFoliosBiometrics`; //path que se agrega al dominio dl servicio
  
  const paramsNominaDigitalPOST = { //Configuración de headers
    headers: {
      'Content-Type': 'application/json',
      'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQcnVlYmFzIiwiZGVzY3JpcGNpb24iOiJVc3VhcmlvIHBhcmEgaGFjZXIgcHJ1ZWJhcyBkZSBzZXJ2aWNpb3MgZGVzYXJyb2xsYWRvcyIsImlhdCI6MTY0NTg1OTYzM30.3AHLJaCOi12UY9tsvFUMhvrnHI-jZgPgOuBwAj4C7EA'
    },
  };

  const index = Math.floor(Math.random() * csvDataNominaDigitalPOST.length);  //Recorrer archivo csv
  console.log(` CSV: ${JSON.stringify(csvDataNominaDigitalPOST)}`); //impresión de variable para validación

  const searchData = parseFloat(csvDataNominaDigitalPOST[index]['searchData']);//Variable que almacena el dato obtenido desde archivo csv
  //req_NominaDigitalPOST.searchData = searchData;    //Setear nombre desde csv al archivo json

  const payload_ScriptNominaDigitalPOST = JSON.stringify(req_NominaDigitalPOST);  //Crear Payload para consumo de servicio
  console.log(`payload script arquetipo: ${payload_ScriptNominaDigitalPOST}`);
  const response_ScriptNominaDigitalPOST = http.post(urlNominaDigitalPOST, payload_ScriptNominaDigitalPOST, paramsNominaDigitalPOST);   //Consumo de servicio utilizando método Post, se agrega como parámetro URL, Payload y Headers
  if (check(response_ScriptNominaDigitalPOST, {'response_ScriptNominaDigitalPOST status was 200': (r) => r.status == 200  })){} else {console.log(`response_ScriptNominaDigitalPOST: ${response_ScriptNominaDigitalPOST.body}`)};  //Imprimir error solo cuando suceda
  console.log(`response_ScriptNominaDigitalPOST: ${response_ScriptNominaDigitalPOST.body}`);
sleep(randomIntBetween(5, 10)); //configuración de esperas
}
export function handleSummary(data) {
    return generalSummary(data) //Datos para la generación de reportes
}