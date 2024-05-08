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
    
    { target: 20, duration: '20s' },
    { target: 20, duration: '60m' },
    { target: 0, duration: '20s' },
  
  ],
  thresholds: {
    "http_req_duration": ["avg <= 6000"],//http req duration con percentil o con que average, duración máxima
    "iterations": ["rate >= 0.22"], //Corresponde a TPS testing 3 años lo que me da la matriz
    "http_req_failed": ["rate <= 0.03"],//comparar con http failed
  },
};
const csvDataUsuariosArquetipo = new SharedArray('cif', function () {    //Leer archivo CSV con data
  return papaparse.parse(open('../data/dataUsuariosArquetipo.csv'), {
    header: true,
  }).data;
});

let req_Arquetipo = JSON.parse(open('../request/requestScriptArquetipo.json')); //Variable que almacena archivo JSON
export default function () {
  const base_url = 'https://petstore.swagger.io'
  const urlArquetipo = `${base_url}/v2/user/createWithList`; //path que se agrega al dominio dl servicio
  
  const paramsArquetipo = { //Configuración de headers
    headers: {
      'Content-Type': 'application/json',
      'x-guid':'3ead2f23-bbfd-4428-a3c5-9461c734b2dop1'
    },
  };

  const index = Math.floor(Math.random() * csvDataUsuariosArquetipo.length);  //Recorrer archivo csv
  console.log(` CSV: ${JSON.stringify(csvDataUsuariosArquetipo)}`); //impresión de variable para validación

  const name = parseFloat(csvDataUsuariosArquetipo[index]['name']);//Variable que almacena el dato obtenido desde archivo csv
  console.log(` firs name: ${name}`);
  req_Arquetipo[0].firstName = name;    //Setear nombre desde csv al archivo json

  const payload_ScriptArquetipo = JSON.stringify(req_Arquetipo);  //Crear Payload para consumo de servicio
  console.log(`payload script arquetipo: ${payload_ScriptArquetipo}`);
  const response_ScriptArquetipo = http.post(urlArquetipo, payload_ScriptArquetipo, paramsArquetipo);   //Consumo de servicio utilizando método Post, se agrega como parámetro URL, Payload y Headers

  if (check(response_ScriptArquetipo, {'response_ScriptArquetipo status was 200': (r) => r.status == 200  })){} else {console.log(`response_ScriptArquetipo: ${response_ScriptArquetipo.body}`)};  //Imprimir error solo cuando suceda
sleep(randomIntBetween(50, 60)); //configuración de esperas
}
export function handleSummary(data) {
    return generalSummary(data) //Datos para la generación de reportes
}