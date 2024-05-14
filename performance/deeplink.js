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
  { target: 3, duration: '3s' },
  { target: 3, duration: '3m' },
  { target: 0, duration: '3s' },
  ],
  thresholds: {
    "http_req_duration": ["avg <= 3000"],//http req duration con percentil o con que average, duración máxima
    "iterations": ["rate >= 0.01"], //Corresponde a TPS testing 3 años lo que me da la matriz
    "http_req_failed": ["rate <= 0.03"],//comparar con http failed
  },
};
/*const csvDataUsuariosArquetipo = new SharedArray('cif', function () {    //Leer archivo CSV con data
  return papaparse.parse(open('../data/dataUsuariosArquetipo.csv'), {
    header: true,
  }).data;
});*/

let req_Arquetipo = JSON.parse(open('../request/deeplink.json')); //Variable que almacena archivo JSON
export default function () {
  const base_url = 'https://apic.consubanco.com'
  const urlArquetipo = `${base_url}/csb/qa/cxn-offering-x-api/v1/getOfferingDeepLink`; //path 
  
  const paramsArquetipo = { //Configuración de headers
    headers: {
      'X-IBM-Client-Id':'a251bdb4c23d7b34b45f5ecdfd9a89a7',
      'Content-Type':'application/json',
      'Accept':'application/json',
      'Cookie':'0f64ea607ea127be876814b5b38b0d94=51de81dc318f38a25f39f1aa7b176cff'
    },
  };

  let randomCustomerBp = randomIntBetween(1000000001, 9000000001);
  let randomCellphoneNumber = randomIntBetween(3000000000, 8000000000);
  let randomOfferingId = randomIntBetween(1000, 9000);
  

  //const index = Math.floor(Math.random() * csvDataUsuariosArquetipo.length);  //Recorrer archivo csv
  //console.log(` CSV: ${JSON.stringify(csvDataUsuariosArquetipo)}`); //impresión de variable para validación

  //const name = parseFloat(csvDataUsuariosArquetipo[index]['name']);//Variable que almacena el dato obtenido desde archivo csv
  //console.log(` firs name: ${name}`);
  req_Arquetipo.customerBp = randomCustomerBp;    
  req_Arquetipo.cellphoneNumber = randomCellphoneNumber;    
  req_Arquetipo.offeringId = randomOfferingId;    

  const payload_ScriptArquetipo = JSON.stringify(req_Arquetipo);  //Crear Payload para consumo de servicio
//  console.log(`payload script arquetipo: ${payload_ScriptArquetipo}`);
  const response_ScriptArquetipo = http.post(urlArquetipo, payload_ScriptArquetipo, paramsArquetipo);   //Consumo de servicio utilizando método Post, se agrega como parámetro URL, Payload y Headers
//  console.log(`response_ScriptArquetipo: ${response_ScriptArquetipo.body}`)
  if (check(response_ScriptArquetipo, {'response_ScriptArquetipo status was 200': (r) => r.status == 200  })){} else {console.log(`response_ScriptArquetipo: ${response_ScriptArquetipo.body}`)};  //Imprimir error solo cuando suceda
sleep(randomIntBetween(5, 10)); //configuración de esperas
}
export function handleSummary(data) {
    return generalSummary(data) //Datos para la generación de reportes
}