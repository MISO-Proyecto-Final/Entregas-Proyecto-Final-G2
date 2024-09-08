import pandas as pd

# Creación de la tabla de datos
data = {
    "Escenario": range(1, 30),
    "Fuente del Estímulo": [
        "Servicio Externo", "Usuario", "Actor no autorizado", "Actor malintencionado", 
        "Fallo de transacción", "Fallo temporal en servicio", "Aumento repentino de carga", 
        "Solicitud de orquestación", "Usuario", "Actividad sospechosa", 
        "Excepción en operación", "Fallo de rendimiento", "Condición de fallo", 
        "Solicitud de alta carga", "Solicitud de servicio", "Usuario o sistema externo", 
        "Usuario", "Usuario autorizado", "Usuario", "Actividad crítica", 
        "Cambio de configuración", "Fallo de servicio", "Degradación de rendimiento", 
        "Condición de error", "Solicitud concurrente", "Solicitud de alta carga", 
        "Requerimiento de orquestación", "Solicitud de servicio común", "Solicitud de orquestación"
    ],
    "Estímulo": [
        "Solicitud de comunicación con otro servicio", "Entrada de datos en el formulario", 
        "Intento de acceso a recursos restringidos", "Solicitud externa maliciosa", 
        "Operación distribuida falla en uno de los pasos", "Servicio backend no responde o falla temporalmente", 
        "Alto volumen de solicitudes", "Requerimiento de coordinar múltiples servicios backend", 
        "Acción crítica como transacción o cambio de configuración", "Intento de acceso no autorizado", 
        "Error o excepción durante la operación del sistema", "Degradación en tiempos de respuesta o latencia", 
        "Error en la ejecución de servicios", "Alta concurrencia en el sistema", 
        "Requerimiento de servicio común en diferentes componentes", "Solicitud de acceso al sistema", 
        "Intento de acceso al sistema", "Solicitud de realizar acción sensible", 
        "Múltiples intentos de inicio de sesión fallidos", "Solicitud de acción crítica o transacción", 
        "Modificación de configuraciones sensibles", "Error en la ejecución de una solicitud", 
        "Aumento en latencia o reducción en tiempos de respuesta", "Fallo en la lógica de aplicación", 
        "Procesamiento de múltiples eventos asíncronos", "Exceso de solicitudes a los servicios backend", 
        "Necesidad de coordinar múltiples servicios backend", "Uso de servicios comunes desacoplados", 
        "Coordinación de servicios backend necesarios"
    ],
    "Artefacto": [
        "Integration Service, API Gateway", "Customer Portal, Client Admin Dashboard, Mobile App", 
        "Mediadores (Integration, Portal, Admin Dashboard, Mobile)", 
        "Mediadores (Integration, Portal, Admin Dashboard, Mobile)", 
        "Mediadores (Integration, Portal, Admin Dashboard, Mobile)", 
        "Mediadores (Integration, Portal, Admin Dashboard, Mobile)", 
        "Mediadores (Integration, Portal, Admin Dashboard, Mobile)", 
        "Mediadores (Integration, Portal, Admin Dashboard, Mobile)", "Audit Service", "Audit Service", 
        "Logging Service", "Monitoring Service", "Monitoring Service", 
        "Logging, Monitoring, Notification Service", "Common Services", 
        "Todas las interfaces de usuario y servicios de seguridad", "Authentication Service", 
        "Authorization Service", "Todas las interfaces de usuario", "Audit Service", 
        "Audit Service", "Logging Service", "Monitoring Service", "Monitoring Service", 
        "Logging Service, Monitoring Service, Notification Service", 
        "Mediadores (Integration, Portal, Admin Dashboard, Mobile)", 
        "Mediadores (Integration, Portal, Admin Dashboard, Mobile)", "Common Services", 
        "Mediadores (Integration, Portal, Admin Dashboard, Mobile)"
    ],
    "Entorno": ["Operación Normal"] * 29,
    "Respuesta": [
        "Utiliza estándares como REST, JSON, OAuth para la comunicación", 
        "Validar la entrada de datos en el frontend antes de enviar al backend", 
        "Control de acceso a través de mediadores, permitiendo solo lo necesario", 
        "Filtra solicitudes para exponer solo la información necesaria", 
        "Implementar Sagas para coordinar transacciones y ejecutar Rollback si es necesario", 
        "Reintenta la operación fallida y utiliza Circuit Breakers para manejar fallos consecutivos", 
        "Aplica Rate Limiting para controlar el número de solicitudes procesadas", 
        "Orquesta interacciones entre servicios backend para completar operaciones coherentes", 
        "Registra todas las acciones críticas con identificadores únicos y detalles relevantes", 
        "Mantiene un registro detallado de las acciones del sistema", 
        "Captura y registra todas las excepciones", 
        "Monitorea en tiempo real y genera alertas para degradación de rendimiento", 
        "Rastrea condiciones específicas de fallos y activa alertas", 
        "Implementa concurrencia para manejar eventos simultáneamente", 
        "Abstrae los servicios comunes para uso desacoplado", 
        "Identifica a los actores antes de permitir el acceso", 
        "Aplica autenticación robusta (contraseñas seguras, 2FA)", 
        "Controla el acceso mediante políticas de autorización", 
        "Restringe los intentos de inicio de sesión y bloquea cuentas temporalmente", 
        "Registra todos los accesos y modificaciones críticas", 
        "Garantiza que todas las modificaciones importantes sean registradas", 
        "Detecta excepciones y registra detalles completos del error", 
        "Supervisa métricas de rendimiento y activa alertas", 
        "Rastrea condiciones de error y activa alertas adecuadas", 
        "Implementa concurrencia para manejar solicitudes simultáneas", 
        "Limita la cantidad de solicitudes permitidas por unidad de tiempo (Rate Limiting)", 
        "Coordina interacciones para asegurar operaciones exitosas y coherentes", 
        "Facilita la integración de servicios comunes sin acoplamiento directo", 
        "Asegura que las operaciones que dependen de múltiples servicios se completen con éxito"
    ],
    "Medida de Respuesta": [
        "Tiempo para integrar un nuevo servicio, número de errores de interoperabilidad", 
        "Número de entradas inválidas detectadas y rechazadas antes de llegar al backend", 
        "Número de accesos no autorizados bloqueados, tiempo para detectar intento de acceso no autorizado", 
        "Número de solicitudes maliciosas bloqueadas, tiempo para identificar y bloquear solicitudes maliciosas", 
        "Tiempo para volver a un estado consistente después de un fallo", 
        "Número de reintentos antes de un éxito o fallo permanente, tiempo de inactividad del servicio", 
        "Tiempo de respuesta bajo alta carga, número de solicitudes rechazadas debido a Rate Limiting", 
        "Tiempo para completar operaciones distribuidas, número de operaciones fallidas", 
        "Tiempo para registrar una acción crítica, porcentaje de acciones críticas registradas correctamente", 
        "Tiempo para detectar y registrar una actividad sospechosa, número de actividades sospechosas registradas", 
        "Tiempo para detectar y registrar una excepción, tiempo medio para resolver una excepción", 
        "Tiempo medio de respuesta bajo carga, número de alertas generadas por degradación de rendimiento", 
        "Tiempo para activar una alerta de fallo, porcentaje de fallos detectados antes de impacto crítico", 
        "Número de eventos concurrentes manejados, tiempo medio de respuesta bajo alta concurrencia", 
        "Tiempo para reutilizar un servicio común, número de errores en la reutilización de servicios comunes", 
        "Tiempo para autenticar a un usuario, número de accesos denegados por fallos de autenticación", 
        "Porcentaje de intentos de acceso exitosos por usuarios legítimos, tiempo medio para completar autenticación", 
        "Número de accesos autorizados correctamente, tiempo medio para procesar una solicitud de autorización", 
        "Número de intentos de inicio de sesión fallidos antes del bloqueo, tiempo de bloqueo de cuenta", 
        "Porcentaje de acciones críticas registradas con éxito, tiempo medio para revisar registros de auditoría", 
        "Número de modificaciones registradas correctamente, tiempo para detectar y registrar una modificación sensible", 
        "Tiempo para detectar y registrar el error, número de errores registrados con detalles completos", 
        "Número de alertas de rendimiento generadas, tiempo medio para responder a las alertas de rendimiento", 
        "Tiempo para activar una alerta de condición de error, número de condiciones de error detectadas", 
        "Número de solicitudes manejadas simultáneamente, tiempo medio de procesamiento bajo alta concurrencia", 
        "Número de solicitudes procesadas dentro de los límites, tiempo de respuesta promedio bajo condiciones de alta carga", 
        "Número de operaciones coordinadas exitosamente, tiempo medio para completar operaciones distribuidas", 
        "Tiempo medio para integrar un servicio común, número de integraciones exitosas sin errores de acoplamiento", 
        "Número de operaciones distribuidas completadas con éxito, tiempo medio para coordinar servicios backend"
    ],
    "Atributo de Calidad": [
        "Integrabilidad", "Seguridad", "Seguridad", "Seguridad", 
        "Disponibilidad/Resiliencia", "Disponibilidad/Resiliencia", 
        "Performance", "Integrabilidad", "Seguridad", "Seguridad", 
        "Disponibilidad", "Disponibilidad", "Disponibilidad", 
        "Performance", "Integrabilidad", "Seguridad", 
        "Seguridad", "Seguridad", "Seguridad", "Seguridad", 
        "Seguridad", "Disponibilidad", "Disponibilidad", 
        "Disponibilidad",        "Disponibilidad", "Performance", "Integrabilidad", "Integrabilidad", 
        "Integrabilidad"
    ],
    "Táctica": [
        "Adhere to Standards", "Validate Input", "Limit Access", "Limit Exposure",
        "Saga Pattern (Compensation)", "Retry with Circuit Breaker", "Rate Limiting",
        "Orchestrate", "Audit", "Audit", "Exception Detection", "Monitor",
        "Condition Monitor", "Introduce Concurrency", "Abstract Common Services",
        "Identify Actors", "Authenticate Actors", "Authorize Actors",
        "Restrict Login", "Audit", "Audit", "Exception Handling", "Performance Monitor",
        "Error Handling", "Concurrency Management", "Rate Limiting", "Service Orchestration",
        "Service Abstraction", "Service Coordination"
    ],
    "Componentes Involucrados": [
        "Integration Service, API Gateway", "Customer Portal, Client Admin Dashboard, Mobile App",
        "Mediators (Integration, Portal, Admin Dashboard, Mobile)", "Mediators (Integration, Portal, Admin Dashboard, Mobile)",
        "Mediators (Integration, Portal, Admin Dashboard, Mobile)", "Mediators (Integration, Portal, Admin Dashboard, Mobile)",
        "Mediators (Integration, Portal, Admin Dashboard, Mobile)", "Mediators (Integration, Portal, Admin Dashboard, Mobile)",
        "Audit Service", "Audit Service", "Logging Service", "Monitoring Service",
        "Monitoring Service", "Logging, Monitoring, Notification Service", "Common Services",
        "User Interfaces and Security Services", "Authentication Service", "Authorization Service",
        "User Interfaces", "Audit Service", "Audit Service", "Logging Service",
        "Monitoring Service", "Monitoring Service", "Logging, Monitoring, Notification Service",
        "Mediators (Integration, Portal, Admin Dashboard, Mobile)", "Mediators (Integration, Portal, Admin Dashboard, Mobile)",
        "Common Services", "Mediators (Integration, Portal, Admin Dashboard, Mobile)"
    ]
}

# Crear el DataFrame
df = pd.DataFrame(data)

# Guardar el DataFrame en un archivo Excel
df.to_excel("Escenarios_de_Calidad.xlsx", index=False)

print("Archivo Excel generado con éxito.")

