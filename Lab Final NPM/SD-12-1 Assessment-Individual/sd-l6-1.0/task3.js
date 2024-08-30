import { getServerURL } from "./task1.js";

// Function para agregar  usuario
export async function addUser(first_name, last_name, email) {
  // Recupera la URL base para la API desde un módulo externo
  const url = getServerURL();

  // Obténer los usuarios existentes para determinar el último ID usado
  const response = await fetch(url + "/users"); // Envía una solicitud GET al endpoint "/users"
  const users = await response.json(); // Analiza la respuesta JSON para obtener la lista de usuarios

  //  Determina el ID máximo entre los usuarios existentes
  const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
  // Itera sobre el array de usuarios, encontrando el ID más alto usando la función reduce

  //  Incrementa el ID máximo en 1 para asignar un nuevo ID único al nuevo usuario
  const newUserId = maxId + 1;

  // Crea el objeto del nuevo usuario con el ID asignado dinámicamente
  const newUser = {
    id: newUserId.toString(), // Convierte el ID a una cadena (asumiendo que la API espera IDs en cadena)
    first_name,
    last_name, 
    email, 
  };

  //  Realiza una solicitud POST para agregar el nuevo usuario a la base de datos
  const postResponse = await fetch(url + "/users", {
    method: "POST", // Especifica el método HTTP como POST para crear un nuevo recurso
    headers: {
      "Content-Type": "application/json", // Establece el tipo de contenido como JSON ya que estamos enviando datos JSON
    },
    body: JSON.stringify(newUser), // Convierte el objeto newUser a una cadena JSON para el cuerpo de la solicitud
  });

  //  Convierte la respuesta al objeto del usuario agregado
  const addedUser = await postResponse.json();
  // Analiza la respuesta JSON para obtener los datos del usuario agregado, confirmando que el usuario se creó correctamente

    // Formatea e imprime el objeto del usuario en un formato específico
  // Línea 46: Asegúrate de que el ID se imprima como un número
  // Línea 47: Muestra el nombre con comillas simples
  // Línea 48: Muestra el apellido con comillas simples
  // Línea 49: Muestra el correo electrónico con comillas simples
  const output = `{
  id: ${Number(addedUser.id)},
  first_name: '${addedUser.first_name}',
  last_name: '${addedUser.last_name}',
  email: '${addedUser.email}'
}`;

  console.log(output); // Muestra la información del usuario formateada en la consola
}


