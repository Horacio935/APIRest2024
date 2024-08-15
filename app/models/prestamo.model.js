module.exports = (sequelize, Sequelize) => {
    const PrestamoLibro = sequelize.define('prestamo_libro', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      codigo_libro: {
        type: Sequelize.STRING,
        allowNull: false
      },
      codigo_usuario: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fecha_salida: {
        type: Sequelize.DATE,
        allowNull: false
      },
      fecha_maxima_devolucion: {
        type: Sequelize.DATE,
        allowNull: false
      },
      fecha_devolucion: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  
    return PrestamoLibro;
  };
  