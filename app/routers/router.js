
let express = require('express');
let router = express.Router();
 
const customers = require('../controllers/controller.js');
const employee = require('../controllers/controller.employee.js');
const product = require('../controllers/controller.product.js');
const branch = require('../controllers/controller.branch.js');
const book = require('../controllers/controller.book.js');
const PrestamoLibro = require('../controllers/controller.prestamo.js');

router.post('/api/customers/create', customers.create);
router.get('/api/customers/all', customers.retrieveAllCustomers);
router.get('/api/customers/onebyid/:id', customers.getCustomerById);
router.get('/api/customers/filteringbyage', customers.filteringByAge);
router.get('/api/customers/pagination', customers.pagination);
router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
router.put('/api/customers/update/:id', customers.updateById);
router.delete('/api/customers/delete/:id', customers.deleteById);

router.post('/api/employee/create', employee.create);
router.get('/api/employee/all', employee.retrieveAllEmployees);
router.get('/api/employee/onebyid/:id', employee.getEmployeeById);
router.get('/api/employee/filteringbyage', employee.filteringByAge);
router.get('/api/employee/pagination', employee.pagination);
router.get('/api/employee/pagefiltersort', employee.pagingfilteringsorting);
router.put('/api/employee/update/:id', employee.updateById);
router.delete('/api/employee/delete/:id', employee.deleteById);

router.post('/api/product/create', product.create);
router.get('/api/product/all', product.retrieveAllProducts);
router.get('/api/product/onebyid/:id', product.getProductById);
router.get('/api/product/filteringbyprice', product.filteringByPrice);
router.get('/api/product/pagination', product.pagination);
router.get('/api/product/pagefiltersort', product.pagingfilteringsorting);
router.put('/api/product/update/:id', product.updateById);
router.delete('/api/product/delete/:id', product.deleteById);

router.post('/api/branch/create', branch.create);
router.get('/api/branch/all', branch.retrieveAllBranches);
router.get('/api/branch/onebyid/:id', branch.getBranchById);
router.get('/api/branch/pagination', branch.pagination);
router.put('/api/branch/update/:id', branch.updateById);
router.delete('/api/branch/delete/:id', branch.deleteById);

router.post('/api/book/create', book.create);
router.get('/api/book/all', book.retrieveAllBooks);
router.get('/api/book/onebyid/:id', book.getBookById);
router.put('/api/book/update/:id', book.updateById);
router.delete('/api/book/delete/:id', book.deleteById);

router.post('/api/prestamos/create', PrestamoLibro.create);
router.get('/api/prestamos/all', PrestamoLibro.retrieveAllPrestamos);
router.get('/api/prestamos/onebyid/:id', PrestamoLibro.getPrestamoById);
router.put('/api/prestamos/update/:id', PrestamoLibro.updateById);
router.delete('/api/prestamos/delete/:id', PrestamoLibro.deleteById);

module.exports = router;