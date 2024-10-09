#En Windows 10/11
* Instalar  [Node.js](https://nodejs.org/en/) (Msi de 64 ó 32 bits)

#En Linux, usando la terminal de comandos
* Instalar  Node.js usando el administrador de paquetes
```
sudo apt-get update
sudo apt-get install nodejs npm
node --version
```


#En MacOS, usando la terminal de comandos
* Instalar  Node.js usando [HomeBrew](https://brew.sh/)
```
brew install node
node --version
```


#General
* 
* Descargar el código en una carpeta de su elección
* Abrir una terminal de comandos 
* Navegar a la carpeta en la terminal
* Ejecutar (sólo una vez) 
```
npm install localtunnel
npm install
```
* Ejecutar el tunnel en otra ventana del terminal (misma ubicación)
```
npx lt --port 3000
```
* Ejecutar la aplicación
```
node index.js
```
*Copiar la url y pegarla en el código de la applicación móbil

* El código incluye comentarios con la explicación del funcionamiento