

const db = require('../config/db.config.js');
const Ingreso = db.Ingreso;

exports.create = (req, res) => {
    let ingreso = {};

    try{
        // Building Ingreso object from upoading request's body
        ingreso.idCatedratico = req.body.idCatedratico;
        ingreso.FechaHoraIngreso = req.body.FechaHoraIngreso;
        ingreso.FechaHoraSalida = req.body.FechaHoraSalida;
        ingreso.Estatus = req.body.Estatus;
    
        // Save to MySQL database
        Ingreso.create(ingreso).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Ingreso with id = " + result.id,
                ingreso: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllCatedraticos = (req, res) => {
    // find all Ingreso information from 
    Ingreso.findAll()
        .then(catedraticoInfos => {
            res.status(200).json({
                message: "Get all Catedraticos' Infos Successfully!",
                catedraticos: catedraticoInfos
            });
        })
        . catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

exports.getCatedraticoById = (req, res) => {
  // find all Ingreso information from 
  let catedraticoId = req.params.id;
  Ingreso.findByPk(catedraticoId)
      .then(ingreso => {
          res.status(200).json({
              message: " Successfully Get a Ingreso with id = " + catedraticoId,
              catedraticos: ingreso
          });
      })
      . catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
      });
}

exports.updateById = async (req, res) => {
    try{
        let catedraticoId = req.params.id;
        let ingreso = await Ingreso.findByPk(catedraticoId);
    
        if(!ingreso){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a ingreso with id = " + catedraticoId,
                ingreso: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                idCatedratico: req.body.idCatedratico,
                FechaHoraIngreso: req.body.FechaHoraIngreso,
                FechaHoraSalida: req.body.FechaHoraSalida,
                Estatus: req.body.Estatus
            }
            let result = await Ingreso.update(updatedObject, {returning: true, where: {id: catedraticoId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a ingreso with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Ingreso with id = " + catedraticoId,
                ingreso: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a ingreso with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let catedraticoId = req.params.id;
        let ingreso = await Ingreso.findByPk(catedraticoId);

        if(!ingreso){
            res.status(404).json({
                message: "Does Not exist a Ingreso with id = " + catedraticoId,
                error: "404",
            });
        } else {
            await ingreso.destroy();
            res.status(200).json({
                message: "Delete Successfully a Ingreso with id = " + catedraticoId,
                ingreso: ingreso,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a ingreso with id = " + req.params.id,
            error: error.message,
        });
    }
}