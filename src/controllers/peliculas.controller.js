import { pool } from "../db.js";

// Obtener todas las películas
export const getPeliculas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM peliculas");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: 'No se encontró la consulta',
      error: error.message
    });
  }
};

// Obtener una película por ID
export const getPeliculasByID = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM peliculas WHERE id = ?", [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener película por ID',
      error: error.message
    });
  }
};

// Crear una nueva película
export const createPeliculas = async (req, res) => {
  try {
    const { titulo, duracionmin, clasificacion, alanzamiento } = req.body;

    const [rows] = await pool.query(
      "INSERT INTO peliculas (titulo, duracionmin, clasificacion, alanzamiento) VALUES (?, ?, ?, ?)",
      [titulo, duracionmin, clasificacion, alanzamiento]
    );

    res.status(201).json({
      id: rows.insertId,
      titulo,
      duracionmin,
      clasificacion,
      alanzamiento
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear película",
      error: error.message
    });
  }
};

// Actualizar una película existente
export const updatePeliculas = async (req, res) => {
  try {
    const id = req.params.id;
    const { titulo, duracionmin, clasificacion, alanzamiento } = req.body;

    const querySQL = `
      UPDATE peliculas SET
        titulo = ?,
        duracionmin = ?,
        clasificacion = ?,
        alanzamiento = ?
      WHERE id = ?
    `;

    const [result] = await pool.query(querySQL, [titulo, duracionmin, clasificacion, alanzamiento, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'El ID no existe' });
    }

    res.json({ message: 'Actualización correcta' });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar película",
      error: error.message
    });
  }
};

// Eliminar una película
export const deletePeliculas = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM peliculas WHERE id = ?", [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'No existe registro con este ID' });
    }

    res.sendStatus(204);  // Éxito sin contenido
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar película",
      error: error.message
    });
  }
};
