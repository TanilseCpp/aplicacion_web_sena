# Guía de Registro de Usuarios - Business Tracker

## ✅ Funcionalidad Implementada

Se ha implementado completamente el sistema de registro de usuarios en la aplicación Business Tracker. Los usuarios ahora pueden crear cuentas y acceder a la plataforma.

---

## 📋 Características del Registro

### Frontend (Angular)
- **Página de Registro**: Interfaz completa en `/register`
- **Formulario Reactivo**: Con validaciones en tiempo real
  - Usuario: mínimo 3 caracteres
  - Email: validación de formato de correo
  - Contraseña: mínimo 6 caracteres
  - Confirmar Contraseña: debe coincidir con la contraseña
  
- **Mensajes de Retroalimentación**:
  - Errores validando en tiempo real
  - Mensaje de éxito tras registro exitoso
  - Redirección automática al login
  
- **Navegación**: Enlace desde login a registro y viceversa

### Backend (Spring Boot)
- **Endpoint de Registro**: `POST /api/users`
- **Seguridad**: 
  - Contraseñas codificadas con BCrypt
  - Validación de usuario y email únicos
  - CORS configurado para localhost:4200
  - Eliminación automática de parámetros del token JWT
  
- **Almacenamiento**: Usuarios guardados en PostgreSQL con:
  - ID único (auto-incremental)
  - Nombre de usuario único
  - Email único
  - Contraseña encriptada
  - Rol por defecto: USER
  - Timestamps de creación y actualización

---

## 🚀 Cómo Usar el Registro

### Paso 1: Iniciar los Servidores

#### Backend (Spring Boot):
```bash
cd BusinessTrackerBackend/PBpg/api
./mvnw.cmd spring-boot:run
```
El backend estará disponible en `http://localhost:8080`

#### Frontend (Angular):
```bash
cd BusinessTrackerFront
npm start
```
El frontend estará disponible en `http://localhost:4200`

### Paso 2: Acceder a la Página de Registro

1. Abre `http://localhost:4200` en tu navegador
2. Haz clic en "Iniciar Sesión" 
3. Haz clic en "Regístrate aquí"
4. O accede directamente a `http://localhost:4200/register`

### Paso 3: Rellenar el Formulario

Completa los siguientes campos:
- **Usuario**: Elige un nombre único (min. 3 caracteres)
- **Email**: Ingresa un email válido y único
- **Contraseña**: Crea una contraseña segura (min. 6 caracteres)
- **Confirmar Contraseña**: Confirma que las contraseñas coincidan

### Paso 4: Enviar el Registro

Haz clic en "Crear Cuenta" para registrarse. Verás:
- ✅ Mensaje de éxito si el registro es exitoso
- ❌ Mensaje de error si el usuario/email ya existen

### Paso 5: Iniciar Sesión

Serás redirigido al login automáticamente. Usa las credenciales que acabas de crear para iniciar sesión.

---

## 📝 Datos de Prueba

Puedes usar estos datos para probar el registro:

```
Usuario: demo_user
Email: demo@test.com
Contraseña: DemoPass123
```

O crear tus propios usuarios durante la prueba.

---

## 🔧 Solucionar Problemas

### Error 403 (Forbidden) al registrarse:
- Asegúrate que el backend está corriendo
- Verifica que CORS esté habilitado para `http://localhost:4200`
- Reinicia el servidor backend

### El usuario ya existe:
- El usuario o email ya está registrado
- Elige otro nombre de usuario o email

### Contraseñas no coinciden:
- Verifica que las dos contraseñas sean idénticas
- La confirmación debe coincidir exactamente

---

## 📂 Archivos Modificados

### Frontend (Angular):
- `src/app/pages/register/` - Componente de registro (nuevo)
  - `register.ts` - Lógica del componente
  - `register.html` - Template del formulario
  - `register.css` - Estilos
  
- `src/app/services/auth.service.ts` - Método `register()` agregado
- `src/app/app.routes.ts` - Ruta `/register` agregada
- `src/app/pages/login/login.ts` - RouterLink agregado
- `src/app/pages/login/login.html` - Enlace a registro

### Backend (Spring Boot):
- `src/main/java/com/talentotech/api/config/SecurityConfig.java` - CORS y seguridad configurados
- `src/main/java/com/talentotech/api/controller/UserController.java` - Endpoint de creación habilitado
- `src/main/java/com/talentotech/api/service/UserService.java` - Validaciones de usuario único

---

## 🔒 Seguridad

- Las contraseñas se encriptan con **BCrypt**
- El usuario y email deben ser únicos en la base de datos
- CORS está limitado a `localhost:4200`
- El endpoint `/api/users` permite POST sin autenticación (solo para registro)

---

## 📊 Flujo de Registro

```
Usuario accede a /register
         ↓
Completa formulario
         ↓
Envía datos (POST /api/users)
         ↓
Backend valida usuario/email únicos
         ↓
Backend encripta contraseña con BCrypt
         ↓
Backend guarda usuario en BD
         ↓
Frontend muestra mensaje de éxito
         ↓
Frontend redirige a /login después de 2 segundos
         ↓
Usuario inicia sesión con sus nuevas credenciales
```

---

## ✨ Características Adicionales

- Validación de email en tiempo real
- Indicador visual de errores
- Spinner de carga durante el registro
- Deshabilitación de campos durante el procesamiento
- Mensajes de error personalizados

---

## 🎯 Próximos Pasos (Opcional)

Para mejorar el sistema en el futuro:

1. **Recuperación de contraseña**: Implementar reset de password
2. **Confirmación de email**: Enviar enlace de verificación
3. **Captcha**: Agregar protección contra bots
4. **Autenticación social**: Login con Google/GitHub
5. **Perfiles de usuario**: Información adicional del perfil

---

¡El sistema de registro está completamente funcional y listo para usar! 🎉
