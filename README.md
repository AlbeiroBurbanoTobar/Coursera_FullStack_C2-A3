# Centro de Relajación y SPA – Módulo 2 Angular

Proyecto Angular 17 que implementa los 10 requisitos del Módulo 2 del curso Full Stack de Coursera.
Tema: **Centro de Relajación y SPA**.

---

## Cómo correr el proyecto

```bash
npm install
npm start
```

Navegar a `http://localhost:4200/`. La aplicación redirige automáticamente a `/servicios`.

---

## Requisitos del Módulo 2 – Dónde encontrarlos

### Requisito 1 – `@Output` + `EventEmitter`

El componente hijo emite un evento al componente padre al agregar un servicio.

Archivo: `src/app/servicio-form/servicio-form.component.ts`

```typescript
@Output() servicioAgregado = new EventEmitter<Servicio>();
// ...
this.servicioAgregado.emit(nuevoServicio);
```

---

### Requisito 2 – Rutas con `redirectTo` y `component`

Configuración de rutas: redirect de `''` a `/servicios` y ruta con componente.

Archivo: `src/app/app.config.ts`

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/servicios', pathMatch: 'full' },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'inicio', component: HomeComponent },
  { path: '**', redirectTo: '/servicios' }
];
```

---

### Requisito 3 – `<router-outlet>` en el componente raíz

El `AppComponent` actúa como shell de enrutamiento con `<router-outlet>`.

Archivo: `src/app/app.component.html`

```html
<!-- Requisito 3: router-outlet como enrutador raíz -->
<router-outlet></router-outlet>
```

---

### Requisito 4 – `FormBuilder` + `FormGroup` con al menos 2 controles

Formulario reactivo creado con `FormBuilder` y al menos 2 controles (`nombre` y `descripcion`).

Archivo: `src/app/servicio-form/servicio-form.component.ts`

```typescript
this.servicioForm = this.fb.group({
  nombre:      ['', [Validators.required, longitudMinimaValidator(4)]],
  descripcion: ['', [Validators.required]]
});
```

---

### Requisito 5 – Inputs vinculados a `formGroup` con `formControlName`

Cada `<input type="text">` usa `formControlName` para vincularse al grupo reactivo.

Archivo: `src/app/servicio-form/servicio-form.component.html`

```html
<form [formGroup]="servicioForm" (ngSubmit)="onSubmit()">
  <input type="text" formControlName="nombre" ... />
  <input type="text" formControlName="descripcion" ... />
</form>
```

---

### Requisito 6 – Componente padre recibe el evento del hijo

`ServiciosComponent` escucha el `@Output` de `ServicioFormComponent` con `(servicioAgregado)`.

Archivo: `src/app/servicios/servicios.component.html`

```html
<app-servicio-form (servicioAgregado)="onServicioAgregado($event)"></app-servicio-form>
```

Archivo: `src/app/servicios/servicios.component.ts`

```typescript
onServicioAgregado(servicio: Servicio): void {
  this.store.dispatch(addServicio({ servicio }));
}
```

---

### Requisito 7 – Validación `required` + validación personalizada parametrizable

El campo `nombre` tiene `Validators.required` y un validador custom `longitudMinimaValidator(n)`.

Archivo: `src/app/servicio-form/validators.ts`
Archivo: `src/app/servicio-form/servicio-form.component.ts`

```typescript
// validators.ts
export function longitudMinimaValidator(min: number): ValidatorFn {
  return (control) => control.value?.length >= min ? null
    : { longitudMinima: { requiredLength: min, actualLength: control.value?.length } };
}

// servicio-form.component.ts
nombre: ['', [Validators.required, longitudMinimaValidator(4)]]
```

---

### Requisito 8 – `*ngIf` + `hasError` para mensajes de validación

Los mensajes de error se muestran condicionalmente con `*ngIf` y `hasError`.

Archivo: `src/app/servicio-form/servicio-form.component.html`

```html
<span *ngIf="servicioForm.get('nombre')?.hasError('required')">
  El nombre es obligatorio.
</span>
<span *ngIf="servicioForm.get('nombre')?.hasError('longitudMinima')">
  El nombre debe tener al menos
  {{ servicioForm.get('nombre')?.getError('longitudMinima')?.requiredLength }} caracteres.
</span>
```

---

### Requisito 9 – Reducer NgRx con al menos 2 actions (agregar / borrar)

El store de NgRx maneja las acciones `addServicio` y `removeServicio`.

Archivo: `src/app/store/servicios.actions.ts`

```typescript
export const addServicio    = createAction('[Servicios] Agregar Servicio', props<{ servicio: Servicio }>());
export const removeServicio = createAction('[Servicios] Eliminar Servicio', props<{ id: number }>());
```

Archivo: `src/app/store/servicios.reducer.ts`

```typescript
export const serviciosReducer = createReducer(
  initialState,
  on(addServicio,    (state, { servicio }) => ({ ...state, items: [...state.items, servicio] })),
  on(removeServicio, (state, { id })       => ({ ...state, items: state.items.filter(i => i.id !== id) }))
);
```

---

### Requisito 10 – Votos a favor / negativo por elemento con Redux

Cada servicio tiene un contador de `votos` gestionado por las actions `upvoteServicio` y `downvoteServicio`.

Archivo: `src/app/store/servicios.actions.ts`

```typescript
export const upvoteServicio   = createAction('[Servicios] Voto Positivo', props<{ id: number }>());
export const downvoteServicio = createAction('[Servicios] Voto Negativo', props<{ id: number }>());
```

Archivo: `src/app/store/servicios.reducer.ts`

```typescript
on(upvoteServicio,   (state, { id }) => ({
  ...state,
  items: state.items.map(item => item.id === id ? { ...item, votos: item.votos + 1 } : item)
})),
on(downvoteServicio, (state, { id }) => ({
  ...state,
  items: state.items.map(item => item.id === id ? { ...item, votos: item.votos - 1 } : item)
}))
```

Archivo: `src/app/servicios/servicios.component.ts`

```typescript
votarAFavor(id: number)   { this.store.dispatch(upvoteServicio({ id })); }
votarEnContra(id: number) { this.store.dispatch(downvoteServicio({ id })); }
```

---

## Estructura del proyecto

```
src/app/
├── app.config.ts              <- Rutas + NgRx Store (Req. 2)
├── app.component.ts/html      <- Shell con <router-outlet> (Req. 3)
│
├── home/
│   └── home.component.ts      <- Página de bienvenida (ruta /inicio)
│
├── servicios/
│   ├── servicios.component.ts <- Padre: recibe @Output, despacha acciones (Req. 6, 9, 10)
│   └── servicios.component.html
│
├── servicio-form/
│   ├── servicio-form.component.ts   <- @Output, FormBuilder, validaciones (Req. 1, 4, 7)
│   ├── servicio-form.component.html <- formControlName, *ngIf+hasError (Req. 5, 8)
│   └── validators.ts                <- Validador custom parametrizable (Req. 7)
│
└── store/
    ├── servicios.actions.ts   <- 4 actions: add, remove, upvote, downvote (Req. 9, 10)
    ├── servicios.reducer.ts   <- Reducer con estado inicial (Req. 9, 10)
    └── servicios.selectors.ts <- Selector selectAllServicios
```

---

## Tecnologías

- Angular 17 (standalone components)
- @ngrx/store 17 – Redux para Angular
- Reactive Forms – FormBuilder, FormGroup, Validators
- Bootstrap 5 + Bootstrap Icons
