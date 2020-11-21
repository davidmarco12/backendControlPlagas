# backendcpa
## Comenzando 🚀
Dejando todo listo para la produccion

### Pre-requisitos 📋
Importante antes que nada, tener instalado nodejs.
Podes descargarlo por [aca](https://nodejs.org/es/) e instalarlo.

_Luego para verificar si lo tenemos instalado en la terminal escribimos node -v._
```
node -v
v12.18.3
```
### Instalación 🔧
 _1 - Clonar/descargar el proyecto_
 
 _2 - Luego en la terminal escribir_
```
- cd backendcpa
- npm i
```
---------------------------------
# 3- Configurar certificados de base de datos
_para DESARROLLO_
Configurar el siguiente archivo .js con los certificados de su base de datos local
```
./config/environments/development.js
```
_para PRODUCCION -> el archivo .env tendra los ejemplos para las variable de entorno para el servidor y todos sus certificados._

primero que nada cambiar 
```
NODE_ENV=production
```
4 - Y por ultimo en la terminal ingresar
```
npm start
```
