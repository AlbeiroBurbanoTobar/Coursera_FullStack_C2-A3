# Centro de Relajación y SPA – Módulo 3 Angular

Proyecto Angular 17 que implementa los 10 requisitos del Módulo 3 del curso Full Stack de Coursera.
Tema: **Centro de Relajación y SPA**.
Autor: **Albeiro**

---

## Cómo correr el proyecto

Este proyecto incluye un servidor local Express y una aplicación Angular.

### 1. Iniciar el Backend (API)
Abre una terminal y ejecuta:
```bash
cd backend
npm install
npm start
```
El API correrá en `http://localhost:3000/api`.

### 2. Iniciar el Frontend (Angular)
En una segunda terminal desde la raíz del proyecto, ejecuta:
```bash
npm install
npm start
```
Navega a `http://localhost:4200/`.

---

## Requisitos del Módulo 3 – Dónde encontrarlos

### Requisito 1 – Guard que verifique estado usando un servicio (`AuthService`)
Se implementó un `AuthService` para guardar el estado de sesión (usando `sessionStorage`) y un `authGuard` que inyecta este servicio.
- Archivos: `src/app/auth/auth.service.ts`, `src/app/auth/auth.guard.ts`

### Requisito 2 – Componente protegido por un Guard en rutas
La ruta `/servicios` está configurada con `canActivate: [authGuard]`. Si un usuario que no está logueado intenta acceder, será redirigido al componente `LoginComponent`.
- Archivos: `src/app/app.config.ts`, `src/app/login/login.component.ts`

### Requisito 3 – Configuración inyectada con un `InjectionToken` propio
Se creó el `APP_CONFIG`, un `InjectionToken` con datos globales (ej. URL del API o nombre de la app/autor), suministrado vía `useValue` en el `app.config.ts`.
- Archivos: `src/app/config/app.config.token.ts`, `src/app/app.config.ts`

### Requisito 4 – DI configurada con `useClass`
La interfaz abstracta `INotificacionService` se provee y se enlaza a la clase concreta `NotificacionService` utilizando `{ provide: INotificacionService, useClass: NotificacionService }`.
- Archivos: `src/app/services/notificacion.service.ts`

### Requisito 5 – DI configurada con `useExisting` (para herencia o compatibilidad)
Se definió un `LoggerService` y un `ApiLoggerService` que hereda de él. Al inyectar el logger base, el sistema devuelve localmente la instancia existente del hijo: `{ provide: LoggerService, useExisting: ApiLoggerService }`.
- Archivos: `src/app/services/logger.service.ts`

### Requisito 6 – API Express simple sin persistencia (Memoria)
Se construyó un micro-servidor Express que gestiona un array temporal de servicios ofreciendo métodos `GET` y `POST` para retornar los datos en formato JSON.
- Archivo: `backend/server.js`

### Requisito 7 – Angular se comunica asíncronamente con el API mediante `HttpClient`
Se inyectó `HttpClient` en Angular. Luego, la clase `ApiServiciosService` hace las peticiones `.get<Servicio[]>()` y `.post<Servicio>()` hacia la URL provista por Express.
- Archivo: `src/app/services/api-servicios.service.ts`

### Requisito 8 – Notificar/Disparar una acción a Redux tras una respuesta afirmativa del POST
Una vez que el observable HTTP recibe el objeto guardado exitosamente desde Node, el servicio intercepta mediante `.pipe(tap(...))` la respuesta e invoca al store de Redux (`this.store.dispatch(addServicio(...))`).
- Archivo: `src/app/services/api-servicios.service.ts`

### Requisito 9 – Base de datos `Dexie` con al menos una entidad, inyectada a un componente o servicio
Se integró `DexieDB` en el `DexieService`, creando un almacén llamado `SPADatabase` y una tabla local indexada para `servicios`. Dicho servicio luego se inyectó en el servicio de API de la app.
- Archivo: `src/app/services/dexie.service.ts`

### Requisito 10 – Agregar entidad a `Dexie` asíncronamente junto al POST de la API
Dentro del mismo interceptor `.tap()` ejecutado tras éxito del POST, se llama al método `this.dexieDB.servicios.add(servicioCreado)` de forma silenciosa para sincronizar localmente la base de datos de navegador.
- Archivo: `src/app/services/api-servicios.service.ts`

---

## Tecnologías

- Angular 17 (Standalone Components)
- Express (Node.js backend simulado)
- Dexie (Wrapper IndexedDB local)
- RxJS (`HttpClient`, inyección y observables)
- NGRX 17 (Redux local persistente)
- Bootstrap 5 + Bootstrap Icons
