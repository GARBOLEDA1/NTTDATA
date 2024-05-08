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
  { target: 3, duration: '1m' },
  { target: 0, duration: '3s' },
  ],
  thresholds: {
    "http_req_duration": ["avg <= 3000"],//http req duration con percentil o con que average, duración máxima
    "iterations": ["rate >= 0.01"], //Corresponde a TPS testing 3 años lo que me da la matriz
    "http_req_failed": ["rate <= 0.03"],//comparar con http failed
  },
};


export default function () {
  const base_url = 'https://it-api-gateway.qa.masnominadigital.com'
  const urlNominaDigitalGET = `${base_url}/convenios/getInputs/10000`; //path que se agrega al dominio dl servicio
  
  const paramsNominaDigitalGET = { //Configuración de headers
    headers: {
      'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJRQS1hdXQiLCJkZXNjcmlwY2lvbiI6IlVzdWFyaW8gcGFyYSBwcnVlYmFzIGF1dG9tYXRpemFkYXMiLCJpYXQiOjE3MDc5MjU0ODd9.uskEt4hbc0lJYEhxNfqF_1bEDIGHLpoONn4e-9F-y-g'
    },
  };

  const response_ScriptparamsNominaDigitalGET = http.get(urlNominaDigitalGET, paramsNominaDigitalGET);   //Consumo de servicio utilizando método Post, se agrega como parámetro URL, Payload y Headers
  if (check(response_ScriptparamsNominaDigitalGET, {'response_ScriptparamsNominaDigitalGET status was 200': (r) => r.status == 200  })){} else {console.log(`response_ScriptparamsNominaDigitalGET: ${response_ScriptparamsNominaDigitalGET.body}`)};  //Imprimir error solo cuando suceda
sleep(randomIntBetween(5, 10)); //configuración de esperas
}
export function handleSummary(data) {
    return generalSummary(data) //Datos para la generación de reportes
}