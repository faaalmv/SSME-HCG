import { useEffect, useState } from 'react';
import apiClient from './lib/axios'; // Importamos nuestro conector

// Un tipo simple para los datos que esperamos
interface User {
  id: number;
  email: string;
  role: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función para obtener los usuarios
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Hacemos la llamada a la API a través de nuestro conector.
        // Axios añadirá automáticamente la URL base 'http://localhost:8888'.
        const response = await apiClient.get('/api/users/'); // Asumiendo que este endpoint existe para listar usuarios
        
        setUsers(response.data);
        console.log("Datos recibidos del backend:", response.data);

      } catch (err) {
        console.error("Error al conectar con el backend:", err);
        setError('No se pudo conectar con el servidor. ¿Está el backend corriendo?');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  if (loading) {
    return <div>Conectando con el backend de SSME...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h1>Conexión Exitosa con el Backend de SSME</h1>
      <h2>Usuarios Registrados:</h2>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.email} - ({user.role})</li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios registrados. Usa la API para crear uno.</p>
      )}
    </div>
  );
}

export default App;
