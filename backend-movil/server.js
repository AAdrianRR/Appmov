require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth'); // 🟢 Login y registro
const profesorRoutes = require('./routes/profesorRoutes'); // 🟢 Módulo profesor con /mis-clases

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

if (!MONGO_URI || !JWT_SECRET) {
  console.error('❌ Error: MONGO_URI o JWT_SECRET no definidas en .env');
  process.exit(1);
}


const iotRoutes = require('./routes/iotRoutes');
app.use('/iot', iotRoutes);

// 🧩 Middlewares base
app.use(express.json());
app.use(cors());

// 🔐 Rutas institucionales
app.use('/auth', authRoutes);       // /auth/login, /auth/registrar, etc.
app.use('/profesor', profesorRoutes); // /profesor/mis-clases (protegido por authProfesor)
const alumnoRoutes = require('./routes/alumnoRoutes');
app.use('/alumno', alumnoRoutes);

// ⚙️ Conexión a MongoDB local (vía Compass)
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Conectado correctamente a MongoDB local');
  app.listen(PORT, () => {
    console.log(`🚀 Backend móvil corriendo en puerto ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ Error al conectar con MongoDB:', err.message);
});
