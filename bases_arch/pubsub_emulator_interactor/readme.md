/**
# Guía de instalación - Emulador de Pub/Sub

El emulador de Pub/Sub te permite probar y desarrollar aplicaciones localmente sin interactuar con el servicio real de Pub/Sub. Sigue los pasos a continuación para instalar el emulador:

1. Instala el Cloud SDK: Si aún no lo has hecho, instala el Google Cloud SDK siguiendo las instrucciones en [https://cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install).

2. Instala el emulador de Pub/Sub: Abre una terminal o línea de comandos y ejecuta el siguiente comando:

```
gcloud components install pubsub-emulator
gcloud components update
```

3. configura variables de entorno
```
$(gcloud beta emulators pubsub env-init) 
```
4. Inicia el emulador: Ejecuta el siguiente comando para iniciar el emulador de Pub/Sub:

```
gcloud beta emulators pubsub start --project=my-project
```

Por defecto, el emulador se ejecuta en localhost:8085. Puedes especificar un host y puerto diferente usando la opción `--host-port`.

5. Configura las variables de entorno: Para interactuar con el emulador de Pub/Sub, necesitas configurar la variable de entorno `PUBSUB_EMULATOR_HOST`. Ejecuta el siguiente comando para configurar la variable:

```
export PUBSUB_EMULATOR_HOST=localhost:8085
```

Reemplaza `localhost:8085` con el host y puerto correspondiente si especificaste uno diferente en el paso 3.

5. Prueba tu aplicación: Ahora puedes probar tu aplicación localmente conectándote al emulador de Pub/Sub usando las bibliotecas de cliente o herramientas de tu elección. Recuerda actualizar el código de tu aplicación para usar el host y puerto del emulador en lugar del servicio real de Pub/Sub.


## Uso de cada archivo para interactual con el pubsub local

- **pubsub_create_topic.js**: Este archivo contiene el código para crear un nuevo tema (topic) en el emulador de Pub/Sub. Al ejecutar este archivo, se solicitará al usuario que ingrese el nombre del tema y luego se creará el tema en el emulador.

- **list_topics.js**: Este archivo contiene el código para listar todos los temas (topics) existentes en el emulador de Pub/Sub. Al ejecutar este archivo, se mostrará una lista de todos los temas disponibles en el emulador.

- **subscribe.js**: Este archivo contiene el código para suscribirse a un tema específico en el emulador de Pub/Sub. Al ejecutar este archivo, se mostrará una lista de todos los temas disponibles y se solicitará al usuario que elija un tema y una suscripción existente o cree una nueva suscripción. Luego, se establecerá una escucha para recibir mensajes en la suscripción seleccionada.

- **publish.js**: Este archivo contiene el código para publicar un mensaje en un tema específico en el emulador de Pub/Sub. Al ejecutar este archivo, se mostrará una lista de todos los temas disponibles y se solicitará al usuario que elija un tema. Luego, se solicitará al usuario que ingrese el mensaje a publicar y se publicará en el tema seleccionado.

Utiliza estos archivos para interactuar con el emulador de Pub/Sub y probar tus aplicaciones localmente sin interactuar con el servicio real de Pub/Sub.

Recuerda setear la variable de entorno: 
```
export PUBSUB_EMULATOR_HOST=localhost:8085
```