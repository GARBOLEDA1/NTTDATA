#performance-test
Performance para fakestore


Sentencia de ejecución de script Customer Products y generación de reporte. Se debe correr en Command Prompt, no funciona la generación de los reportes en otra consola de comandos. 

set "K6_WEB_DASHBOARD=true" && set "K6_WEB_DASHBOARD_EXPORT=reports\load-test-fakestore.html" && k6 run performance\fakestore.js


