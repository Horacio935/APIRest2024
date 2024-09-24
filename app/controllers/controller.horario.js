

const db = require('../config/db.config.js');
const Horario = db.Horario;

exports.create = (req, res) => {
    let horario = {};

    try{
        // Building Horario object from upoading request's body
        horario.idCatedratico = req.body.idCatedratico;
        horario.Curso = req.body.Curso;
        horario.HoraInicio = req.body.HoraInicio;
        horario.HoraFin = req.body.HoraFin;
    
        // Save to MySQL database
        Horario.create(horario).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Horario with id = " + result.id,
                horario: result,
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
    // find all Horario information from 
    Horario.findAll()
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
  // find all Horario information from 
  let catedraticoId = req.params.id;
  Horario.findByPk(catedraticoId)
      .then(horario => {
          res.status(200).json({
              message: " Successfully Get a Horario with id = " + catedraticoId,
              catedraticos: horario
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
        let horario = await Horario.findByPk(catedraticoId);
    
        if(!horario){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a horario with id = " + catedraticoId,
                horario: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                idCatedratico: req.body.idCatedratico,
                Curso: req.body.Curso,
                HoraInicio: req.body.HoraInicio,
                HoraFin: req.body.HoraFin
            }
            let result = await Horario.update(updatedObject, {returning: true, where: {id: catedraticoId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a horario with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Horario with id = " + catedraticoId,
                horario: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a horario with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let catedraticoId = req.params.id;
        let horario = await Horario.findByPk(catedraticoId);

        if(!horario){
            res.status(404).json({
                message: "Does Not exist a Horario with id = " + catedraticoId,
                error: "404",
            });
        } else {
            await horario.destroy();
            res.status(200).json({
                message: "Delete Successfully a Horario with id = " + catedraticoId,
                horario: horario,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a horario with id = " + req.params.id,
            error: error.message,
        });
    }
}