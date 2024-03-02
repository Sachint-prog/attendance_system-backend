const express = require('express')
const router = express.Router()
const hodController = require('../controllers/hod')
const facultyController = require('../controllers/faculty')


router.get('/', hodController.getHome)

router.get('/scanner', facultyController.getScanner)
router.get('/show_attendance', facultyController.show_attendance)
// router.get('/update_attendance', facultyController.update_attendance)
router.get('/delete_attendance', facultyController.delete_attendance)
// router.get('/dummy', facultyController.dummy)

router.post('/showAttendance', facultyController.showAttendance)
router.post('deleteAttendance', facultyController.deleteAttendance)
router.post('/addEnrollmentNo', facultyController.addEnrollmentNo)


router.get('/create_subject', hodController.create_subject)
router.get('/show_subject', hodController.show_subject)
router.get('/update_subject', hodController.update_subject)
router.get('/delete_subject', hodController.delete_subject)


router.post('/createSubject', hodController.createSubject)
router.post('/updateSubject', hodController.updateSubject)
router.post('/deleteSubject', hodController.deleteSubject)

module.exports = router