import { getServerURL } from "./task1.js";  //importando funcion desde task1

// entra un objeto y sale una cadena en la funcion formatUser
function formatUser(user) {
  return `{\n  id: ${user.id},\n  first_name: '${user.first_name}',\n  last_name: '${user.last_name}',\n  email: '${user.email}'\n}`;
}

export async function listUsers() {
  // funcion asincrona que espere respuesta del GET
  const serverURL = getServerURL();

  // solicitud GET
  const response = await fetch(`${serverURL}/users`);

  const users = await response.json();

  
  const formattedUsers = users.map(formatUser);

  const output = `[\n${formattedUsers.join(",\n")}\n]`;

  
  console.log(output);
}

