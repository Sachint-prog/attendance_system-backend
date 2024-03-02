const express = require('express')
const router = express.Router()
const facultyController = require('../controllers/faculty')

router.get('/', facultyController.getHome)
router.get('/scanner', facultyController.getScanner)
router.get('/show_attendance', facultyController.show_attendance)
// router.get('/update_attendance', facultyController.update_attendance)
router.get('/delete_attendance', facultyController.delete_attendance)
// router.get('/dummy', facultyController.dummy)

router.post('/showAttendance', facultyController.showAttendance)
router.post('deleteAttendance', facultyController.deleteAttendance)
router.post('/addEnrollmentNo', facultyController.addEnrollmentNo)


module.exports = router