# Configuración de Cuotas - Gymnos Frontend

## Descripción

Este módulo implementa la gestión de configuraciones de cuotas en el frontend de Gymnos. Permite crear, listar y gestionar las configuraciones de cuotas del sistema.

## Funcionalidades Implementadas

### ✅ Completadas
- **Creación de configuraciones**: Modal para crear nuevas configuraciones con fee y fecha de inicio
- **Listado paginado**: Visualización de todas las configuraciones con paginación
- **Validación de formularios**: Validación en tiempo real de los campos requeridos
- **Manejo de errores**: Interfaz para mostrar errores de la API
- **Diseño responsive**: Interfaz adaptada para diferentes tamaños de pantalla
- **Modal de creación**: Formulario en modal que se abre con un botón

### 🔄 Pendientes
- **Actualización de configuraciones**: Funcionalidad para editar configuraciones existentes
- **Eliminación de configuraciones**: Funcionalidad para eliminar configuraciones

## Estructura de Archivos

```
src/
├── lib/
│   └── types.ts                    # Tipos TypeScript para las configuraciones
├── services/
│   ├── api/
│   │   └── api-client.ts           # Cliente HTTP personalizado
│   └── quota-configuration/
│       └── quota-configuration.service.ts  # Servicio de configuraciones
├── hooks/
│   └── use-quota-configurations.ts # Hook personalizado para gestión de estado
├── components/
│   ├── create-quota-configuration-modal.tsx  # Modal para crear configuraciones
│   ├── quota-configuration-list.tsx          # Lista de configuraciones
│   └── ui/
│       ├── alert.tsx                         # Componente de alertas
│       └── dialog.tsx                        # Componente de modal
└── app/dashboard/quotas-config/
    └── page.tsx                              # Página principal
```

## Configuración de la API

### Variables de Entorno

El proyecto usa la configuración de `src/config/index.ts` que apunta a:

```typescript
API_URL: process.env.API_URL || 'https://gymnos.onrender.com'
```

Para desarrollo local, puedes crear un archivo `.env.local` en la raíz del proyecto:

```bash
API_URL=http://localhost:3001
NODE_ENV=development
```

### Endpoints de la API

El módulo espera los siguientes endpoints:

#### GET /quota-amount-configuration
Obtiene la lista paginada de configuraciones.

**Parámetros de query:**
- `page`: Número de página (default: 1)
- `page_size`: Elementos por página (default: 10)

**Respuesta:**
```json
{
  "data": [
    {
      "quota_amount_configuration_number": 1,
      "fee": 10.50,
      "start_date": "2024-01-01T00:00:00.000Z",
      "end_date": null
    }
  ],
  "paginate": {
    "page": 1,
    "pageSize": 10,
    "total": 1
  }
}
```

#### POST /quota-amount-configuration
Crea una nueva configuración.

**Body:**
```json
{
  "fee": 10.50,
  "start_date": "2024-01-01T00:00:00.000Z"
}
```

**Respuesta:**
```json
{
  "quota_amount_configuration_number": 1,
  "fee": 10.50,
  "start_date": "2024-01-01T00:00:00.000Z",
  "end_date": null
}
```

## Uso

### Acceso a la Página

La página de configuración de cuotas está disponible en:
```
/dashboard/quotas-config
```

### Crear Nueva Configuración

1. Haz clic en el botón "Nueva Configuración" en la parte superior derecha
2. Completa el formulario en el modal con:
   - **Fee**: Valor numérico positivo (ej: 10.50)
   - **Fecha de Inicio**: Fecha y hora de inicio de la configuración

3. Haz clic en "Crear Configuración"

### Ver Configuraciones

- Las configuraciones se cargan automáticamente al acceder a la página
- Usa los controles de paginación para navegar entre páginas
- Haz clic en "Actualizar" para recargar la lista

## Componentes

### CreateQuotaConfigurationModal

Modal para crear nuevas configuraciones con validación en tiempo real.

**Props:**
- `onSubmit`: Función que se ejecuta al enviar el formulario
- `loading`: Estado de carga del formulario

### QuotaConfigurationList

Lista paginada de configuraciones con controles de navegación.

**Props:**
- `configurations`: Array de configuraciones
- `loading`: Estado de carga
- `pagination`: Información de paginación
- `onPageChange`: Función para cambiar de página
- `onRefresh`: Función para actualizar la lista
- `onCreateConfiguration`: Función para crear nueva configuración

## Hook Personalizado

### useQuotaConfigurations

Hook que maneja todo el estado y lógica de las configuraciones.

**Retorna:**
- `configurations`: Array de configuraciones
- `loading`: Estado de carga
- `error`: Mensaje de error (si existe)
- `pagination`: Información de paginación
- `fetchConfigurations`: Función para cargar configuraciones
- `createConfiguration`: Función para crear configuración
- `updateConfiguration`: Función para actualizar configuración

## Tecnologías Utilizadas

- **Next.js 15**: Framework de React
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos
- **shadcn/ui**: Componentes de UI
- **apiClient**: Cliente HTTP personalizado
- **Lucide React**: Iconos

## Desarrollo

### Instalación

```bash
npm install
```

### Ejecutar en Desarrollo

```bash
npm run dev
```

### Construir para Producción

```bash
npm run build
```

## Notas Importantes

1. **Conexión a la API**: Asegúrate de que la API esté ejecutándose en la URL configurada
2. **Variables de Entorno**: El archivo `.env.local` debe estar configurado correctamente
3. **CORS**: La API debe permitir requests desde el frontend
4. **Autenticación**: Si la API requiere autenticación, se debe implementar en el interceptor de axios

## Solución de Problemas

### Error de Bucle Infinito
Si ves llamadas infinitas a la API, asegúrate de:
1. Tener configurado el archivo `.env.local` con la URL correcta de la API
2. Que la API esté ejecutándose y sea accesible
3. Que los endpoints de la API coincidan con los esperados por el frontend

### API No Disponible
Si la API no está disponible, el frontend mostrará una lista vacía sin errores para facilitar el desarrollo.

### Configuración de Variables de Entorno
El proyecto usa la configuración de `src/config/index.ts`. Para desarrollo local, crea un archivo `.env.local` en la raíz del proyecto:
```bash
API_URL=http://localhost:3001
NODE_ENV=development
```

## Próximos Pasos

1. Implementar funcionalidad de actualización
2. Agregar funcionalidad de eliminación
3. Implementar filtros y búsqueda
4. Agregar confirmaciones antes de acciones destructivas
5. Implementar cache de datos con React Query 