# CV Dashboard - José Manuel Ortega García

Dashboard profesional de CV con soporte bilingüe (Inglés/Español) y gráficos interactivos.

## 🌐 Ver Online

**Link permanente:** https://sierranevadita7-hash.github.io/cv-dashboard

## ✨ Características

- ✅ Cambio de idioma Inglés/Español
- ✅ 5 gráficos interactivos (Recharts)
- ✅ Descarga de CV en PDF
- ✅ Diseño responsive y profesional
- ✅ Tema dark mode
- ✅ Componentes UI modernos (shadcn)

## 🚀 Instrucciones de Deployment a GitHub Pages

### Paso 1: Sube este código a GitHub

1. Ve a: https://github.com/new
2. Nombra el repositorio: `cv-dashboard`
3. Marca como **Public**
4. NO selecciones "Initialize with README"
5. Haz clic en "Create repository"

### Paso 2: Sube los archivos

**Opción A - Usando GitHub Web (más fácil):**

1. En tu nuevo repositorio, haz clic en "uploading an existing file"
2. Arrastra TODOS los archivos de esta carpeta (menos node_modules)
3. Haz clic en "Commit changes"

**Opción B - Usando Git desde terminal:**

```bash
cd cv-dashboard
git init
git add .
git commit -m "Initial commit - CV Dashboard"
git branch -M main
git remote add origin https://github.com/sierranevadita7-hash/cv-dashboard.git
git push -u origin main
```

### Paso 3: Configura GitHub Pages

1. Ve a tu repositorio: https://github.com/sierranevadita7-hash/cv-dashboard
2. Haz clic en "Settings" (arriba a la derecha)
3. En el menú izquierdo, haz clic en "Pages"
4. En "Source", selecciona: **GitHub Actions**
5. GitHub detectará automáticamente que es una app React

### Paso 4: Espera el deployment

- GitHub Actions compilará tu app automáticamente
- Tarda 2-5 minutos
- Puedes ver el progreso en la pestaña "Actions"
- Cuando termine, tu CV estará en: https://sierranevadita7-hash.github.io/cv-dashboard

## 📝 Actualizar tu CV

Para actualizar el contenido:

1. Edita el archivo: `src/data/mock.js`
2. Sube los cambios a GitHub
3. GitHub Pages se actualizará automáticamente

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Compilar para producción
npm run build
```

## 📄 Tecnologías Utilizadas

- React 19
- Tailwind CSS
- shadcn/ui
- Recharts
- jsPDF
- React Router
- Lucide Icons

## 👤 Contacto

**José Manuel Ortega García**
- Email: ortega.garcia.jose.manuel@gmail.com
- Teléfono: +34 661 321 101
- ## Version 2 - Testing

---

**© 2026 José Manuel Ortega García. Todos los derechos reservados.**
