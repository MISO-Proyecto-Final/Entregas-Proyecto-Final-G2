import asyncio
import websockets
import json
from sentence_transformers import SentenceTransformer
import numpy as np
import requests
import faiss  # Librería para búsqueda de similitud de alta dimensión

# Inicializar el modelo de embeddings
model = SentenceTransformer('all-MiniLM-L6-v2')

# Lista de preguntas y respuestas comunes
questions_answers = [
    {
        "questions": [
            "¿Cuál es el horario de atención?",
            "¿Cuándo abren?",
            "¿A qué hora cierran?",
            "¿Cuál es su horario de operación?"
        ],
        "answer": "Nuestro horario de atención es de 9 am a 6 pm de lunes a viernes."
    },
    {
        "questions": [
            "¿Cómo puedo realizar un pedido?",
            "¿Cuál es el proceso para hacer un pedido?",
            "¿Cómo solicito un producto?",
            "¿Dónde puedo ordenar?"
        ],
        "answer": "Puedes realizar un pedido a través de nuestro sitio web o llamando al número de atención al cliente."
    },
    {
        "questions": [
            "¿Cuál es la política de devoluciones?",
            "¿Cómo puedo devolver un producto?",
            "¿Qué debo hacer para devolver un artículo?",
            "¿Cuáles son las condiciones para las devoluciones?"
        ],
        "answer": "Puedes devolver un producto dentro de los 30 días posteriores a la compra, siempre y cuando esté en perfectas condiciones."
    },
    {
        "questions": [
            "¿Ofrecen envíos internacionales?",
            "¿Pueden enviar productos a otros países?",
            "¿Realizan envíos fuera del país?",
            "¿Cuáles son las opciones de envío internacional?"
        ],
        "answer": "Sí, ofrecemos envíos internacionales a varios países. Por favor, consulta nuestra página de envíos para más detalles."
    },
    {
        "questions": [
            "¿Aceptan pagos con tarjeta de crédito?",
            "¿Puedo pagar con tarjeta?",
            "¿Qué métodos de pago aceptan?",
            "¿Es posible pagar con tarjeta de débito?"
        ],
        "answer": "Aceptamos pagos con tarjeta de crédito, débito, transferencias bancarias y PayPal."
    },
    {
        "questions": [
            "¿Cuál es el tiempo de entrega estimado?",
            "¿Cuánto tiempo tarda en llegar mi pedido?",
            "¿Cuándo recibiré mi pedido?",
            "¿Cuál es la fecha estimada de entrega?"
        ],
        "answer": "El tiempo de entrega estimado es de 3 a 5 días hábiles dentro del país."
    },
    {
        "questions": [
            "¿Cómo puedo contactar al servicio al cliente?",
            "¿Dónde puedo encontrar asistencia?",
            "¿Tienen un número de atención al cliente?",
            "¿Cómo puedo obtener soporte?"
        ],
        "answer": "Puedes contactar al servicio al cliente a través de nuestro chat en vivo, correo electrónico o llamando al número de atención."
    },
    {
        "questions": [
            "¿Dónde están ubicados?",
            "¿Cuál es su dirección?",
            "¿Dónde puedo encontrarlos?",
            "¿Tienen una tienda física?"
        ],
        "answer": "Nuestra tienda principal está ubicada en el centro de la ciudad, pero todas las compras se realizan en línea."
    },
    {
        "questions": [
            "¿Puedo cancelar mi pedido?",
            "¿Cómo cancelo una orden?",
            "¿Es posible cancelar un pedido después de realizarlo?",
            "¿Cuáles son las condiciones para cancelar un pedido?"
        ],
        "answer": "Puedes cancelar tu pedido antes de que sea enviado. Una vez enviado, no podemos cancelar la orden."
    },
    {
        "questions": [
            "¿Qué marcas ofrecen?",
            "¿Qué productos tienen disponibles?",
            "¿Cuáles son las opciones de productos?",
            "¿Puedo ver el catálogo de productos?"
        ],
        "answer": "Ofrecemos una variedad de marcas líderes en el mercado. Puedes ver nuestro catálogo completo en el sitio web."
    },
    {
        "questions": [
            "¿Hay alguna promoción vigente?",
            "¿Tienen descuentos actuales?",
            "¿Cuáles son las ofertas disponibles?",
            "¿Hay alguna venta especial en este momento?"
        ],
        "answer": "Actualmente tenemos una promoción del 20% de descuento en todos los productos de la categoría de verano."
    },
    {
        "questions": [
            "¿Cómo puedo hacer seguimiento a mi pedido?",
            "¿Dónde puedo ver el estado de mi pedido?",
            "¿Es posible rastrear mi envío?",
            "¿Cómo sé dónde está mi paquete?"
        ],
        "answer": "Puedes rastrear tu pedido utilizando el número de seguimiento proporcionado en el correo de confirmación."
    },
    {
        "questions": [
            "¿Ofrecen garantía en sus productos?",
            "¿Cuál es la política de garantía?",
            "¿Cómo puedo reclamar una garantía?",
            "¿Los productos tienen garantía?"
        ],
        "answer": "Todos nuestros productos tienen una garantía de un año contra defectos de fabricación."
    },
    {
        "questions": [
            "¿Cómo puedo suscribirme a su boletín?",
            "¿Dónde me inscribo para recibir noticias?",
            "¿Tienen un boletín informativo?",
            "¿Puedo recibir ofertas y noticias por correo electrónico?"
        ],
        "answer": "Puedes suscribirte a nuestro boletín ingresando tu correo en el formulario al pie de nuestra página web."
    },
    {
        "questions": [
            "¿Cuál es su política de privacidad?",
            "¿Cómo manejan mis datos personales?",
            "¿Qué hacen con mi información?",
            "¿Dónde puedo leer sobre su política de privacidad?"
        ],
        "answer": "Puedes leer nuestra política de privacidad completa en nuestro sitio web, en la sección 'Política de Privacidad'."
    },
    {
        "questions": [
            "¿Ofrecen tarjetas de regalo?",
            "¿Puedo comprar una tarjeta de regalo?",
            "¿Tienen gift cards disponibles?",
            "¿Cómo funcionan las tarjetas de regalo?"
        ],
        "answer": "Sí, ofrecemos tarjetas de regalo digitales que se pueden comprar en nuestro sitio web y enviar por correo electrónico."
    },
    {
        "questions": [
            "¿Puedo cambiar mi dirección de envío?",
            "¿Cómo actualizo mi dirección de entrega?",
            "¿Es posible modificar la dirección después de realizar el pedido?",
            "¿Dónde puedo cambiar la dirección de mi pedido?"
        ],
        "answer": "Puedes cambiar la dirección de envío antes de que el pedido sea enviado contactando a nuestro servicio al cliente."
    },
    {
        "questions": [
            "¿Cómo puedo dejar una reseña?",
            "¿Dónde puedo calificar un producto?",
            "¿Puedo dejar comentarios sobre mi compra?",
            "¿Cómo comparto mi opinión sobre un producto?"
        ],
        "answer": "Puedes dejar una reseña sobre tu compra en la página del producto correspondiente en nuestro sitio web."
    },
    {
        "questions": [
            "¿Puedo pedir una muestra?",
            "¿Ofrecen muestras de productos?",
            "¿Cómo solicito una muestra gratuita?",
            "¿Es posible recibir muestras antes de comprar?"
        ],
        "answer": "No ofrecemos muestras de productos en este momento, pero tenemos una política de devolución fácil si no estás satisfecho."
    },
    {
        "questions": [
            "¿Cómo puedo saber si un producto está en stock?",
            "¿Hay disponibilidad de este artículo?",
            "¿Cómo verifico la existencia de un producto?",
            "¿Está disponible este producto en inventario?"
        ],
        "answer": "Puedes verificar la disponibilidad de cualquier producto directamente en nuestra página web, en la sección del producto."
    }
]

# Crear embeddings y construir un índice Faiss
embeddings = []
answers = []

for qa in questions_answers:
    for question in qa['questions']:
        embedding = model.encode(question)
        embeddings.append(embedding)
        answers.append(qa['answer'])

embeddings = np.array(embeddings).astype('float32')

# Construir el índice de Faiss
dimension = embeddings.shape[1]  # Dimensión de los embeddings
index = faiss.IndexFlatL2(dimension)  # Índice de Faiss para búsquedas L2
index.add(embeddings)  # Añadir los embeddings al índice

# Función para consultar Ollama
def query_ollama(prompt):
    response = requests.post('http://ollama_api_endpoint/generate', json={"prompt": prompt})
    return response.json().get("text", "")

# Función para generar una respuesta utilizando Faiss y Ollama
async def generate_response(user_message):
    # Generar embedding del mensaje del usuario
    user_embedding = model.encode(user_message).astype('float32').reshape(1, -1)

    # Buscar en el índice de Faiss el embedding más cercano
    _, nearest_result_indices = index.search(user_embedding, 1)
    nearest_index = nearest_result_indices[0][0]
    
    # Obtener la respuesta predefinida más cercana
    predefined_answer = answers[nearest_index]
    
    # Refinar la respuesta usando Ollama
    refined_answer = query_ollama(f"{user_message}\n\nContexto: {predefined_answer}")
    return refined_answer

# Configuración del servidor WebSocket
async def chat_handler(websocket, path):
    async for message in websocket:
        data = json.loads(message)
        user_message = data.get("message", "")

        # Procesar la entrada del usuario
        response = await generate_response(user_message)

        # Enviar la respuesta de vuelta al cliente
        await websocket.send(json.dumps({"response": response}))

async def main():
    async with websockets.serve(chat_handler, "localhost", 8765):
        print("Server listening on ws://localhost:8765")
        await asyncio.Future()  # Ejecutar para siempre

if __name__ == "__main__":
    asyncio.run(main())
