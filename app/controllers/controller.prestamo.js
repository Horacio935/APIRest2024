const db = require('../config/db.config.js');
const PrestamoLibro = db.PrestamoLibro;

exports.create = (req, res) => {
    let prestamoLibro = {};

    try {
        // Construir el objeto PrestamoLibro a partir del cuerpo de la solicitud
        prestamoLibro.codigo_libro = req.body.codigo_libro;
        prestamoLibro.codigo_usuario = req.body.codigo_usuario;
        prestamoLibro.fecha_salida = req.body.fecha_salida;
        prestamoLibro.fecha_maxima_devolucion = req.body.fecha_maxima_devolucion;
        prestamoLibro.fecha_devolucion = req.body.fecha_devolucion;

        // Guardar en la base de datos MySQL
        PrestamoLibro.create(prestamoLibro).then(result => {
            // Enviar mensaje de éxito al cliente
            res.status(200).json({
                message: "Upload Successfully a PrestamoLibro with id = " + result.id,
                prestamoLibro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllPrestamos = (req, res) => {
    // Obtener toda la información de PrestamoLibro
    PrestamoLibro.findAll()
        .then(prestamoInfos => {
            res.status(200).json({
                message: "Get all PrestamoLibros' Infos Successfully!",
                prestamos: prestamoInfos
            });
        })
        .catch(error => {
            // Mostrar en consola
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getPrestamoById = (req, res) => {
    // Encontrar la información de PrestamoLibro por ID
    let prestamoId = req.params.id;
    PrestamoLibro.findByPk(prestamoId)
        .then(prestamo => {
            res.status(200).json({
                message: "Successfully Get a PrestamoLibro with id = " + prestamoId,
                prestamo: prestamo
            });
        })
        .catch(error => {
            // Mostrar en consola
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let prestamoId = req.params.id;
        let prestamo = await PrestamoLibro.findByPk(prestamoId);

        if (!prestamo) {
            // Responder al cliente
            res.status(404).json({
                message: "Not Found for updating a PrestamoLibro with id = " + prestamoId,
                prestamo: "",
                error: "404"
            });
        } else {
            // Actualizar cambios en la base de datos
            let updatedObject = {
                codigo_libro: req.body.codigo_libro,
                codigo_usuario: req.body.codigo_usuario,
                fecha_salida: req.body.fecha_salida,
                fecha_maxima_devolucion: req.body.fecha_maxima_devolucion,
                fecha_devolucion: req.body.fecha_devolucion
            }
            let result = await PrestamoLibro.update(updatedObject, { returning: true, where: { id: prestamoId } });

            // Responder al cliente
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a PrestamoLibro with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a PrestamoLibro with id = " + prestamoId,
                prestamo: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a PrestamoLibro with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let prestamoId = req.params.id;
        let prestamo = await PrestamoLibro.findByPk(prestamoId);

        if (!prestamo) {
            res.status(404).json({
                message: "Does Not exist a PrestamoLibro with id = " + prestamoId,
                error: "404",
            });
        } else {
            await prestamo.destroy();
            res.status(200).json({
                message: "Delete Successfully a PrestamoLibro with id = " + prestamoId,
                prestamo: prestamo,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a PrestamoLibro with id = " + req.params.id,
            error: error.message,
        });
    }
}
