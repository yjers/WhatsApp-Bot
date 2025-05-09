# WhatsApp Bot

Este proyecto es un **bot de WhatsApp** que escucha los mensajes de un grupo específico y los reenvía a otro grupo de WhatsApp. Utiliza la librería [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js/) y está diseñado para ser fácil de configurar y ejecutar.

## Requisitos

- Node.js (recomendado: versión 14 o superior)  
- npm (gestor de paquetes de Node.js)  
- Cuenta de WhatsApp activa  
- Acceso a un grupo de WhatsApp para que el bot pueda escuchar los mensajes  

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/whatsapp-bot.git
cd whatsapp-bot
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar el archivo `.env`

Crea un archivo `.env` en la raíz del proyecto para almacenar las variables de entorno necesarias:

```env
GROUP_NAME=mensajes
```

> **Nota:** El valor de `GROUP_NAME` debe ser el nombre del grupo al que el bot escuchará los mensajes. Este grupo debe existir en tu cuenta de WhatsApp.

### 4. Ejecutar el bot

```bash
npm start
```

### 5. Escanear el código QR

La primera vez que ejecutes el bot, se generará un código QR. Escanéalo con tu aplicación de WhatsApp en el móvil para autenticar el bot.

## Funcionamiento

- **Escuchar mensajes**  
  El bot escucha los mensajes en un grupo de WhatsApp especificado (por defecto, el grupo llamado `"mensajes"`).

- **Reenviar mensajes**  
  Si un mensaje se envía desde un grupo o usuario distinto, el bot lo reenviará al grupo destino (el grupo `"mensajes"`).

- **Manejo de medios**  
  Si el mensaje contiene medios (imágenes, videos, documentos, etc.), también los reenviará al grupo destino con un pie de foto si el mensaje contiene texto.

- **Menciones**  
  Si el bot es mencionado en un mensaje, reenviará una notificación al grupo destino indicando quién mencionó al bot.

## Personalización

- **Cambiar el grupo de destino**  
  Puedes cambiar el nombre del grupo al que el bot reenviará los mensajes modificando la variable `GROUP_NAME` en el archivo `.env`.

- **Otros ajustes**  
  Si deseas personalizar el comportamiento del bot, puedes modificar el archivo `index.js`.

## Solución de problemas

| Problema                    | Solución                                                                                                                                        |
|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| El bot no encuentra el grupo | Asegúrate de que el nombre del grupo sea correcto en el archivo `.env` y que el bot esté agregado a ese grupo.                                  |
| Error de autenticación       | Si tienes problemas para escanear el código QR, intenta reiniciar el bot y escanear nuevamente el código QR.                                     |
| Problemas de medios          | Si el bot no puede reenviar medios, asegúrate de que el mensaje contiene un archivo adjunto válido.                                              |
