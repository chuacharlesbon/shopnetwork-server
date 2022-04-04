const express = require('express');

const router = express.Router();

const productControllers = require("../controllers/productControllers")

const auth = require("../auth")

const {verify, verifyAdmin} = auth;

router.post('/', verify, verifyAdmin, productControllers.addProduct)

router.get('/', productControllers.getAllProducts)

router.get('/getSingleProduct/:id', productControllers.getSingleProduct)






/*


//Activity 4

router.put('/archive/:id', verify, verifyAdmin, courseControllers.courseArchive)

router.put('/activate/:id', verify, verifyAdmin, courseControllers.courseActivate)

router.get('/getActiveCourses', courseControllers.getActiveCourses)


//update course
router.put('/:id', verify, verifyAdmin, courseControllers.updateCourse)

router.get('/getInactiveCourses', verify, verifyAdmin, courseControllers.getInactiveCourse)

router.post('/findCoursesByName', courseControllers.findCoursesByName)

router.post('/findCoursesByPrice', courseControllers.findCoursesByPrice)

router.get("/getEnrollees/:id", verify, verifyAdmin, courseControllers.getEnrollees)*/

module.exports = router;