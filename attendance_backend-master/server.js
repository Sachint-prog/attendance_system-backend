const express = require('express')
const app = express()
const PORT = 2121

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (request, response) => {
    response.render('register.ejs', { message: "data" })
})

app.get('/login', (request, response) => {
    response.render('login.ejs', { info: "noError" })
})


app.get('/scanner', (request, response) => {
    async function scan_subjects() {
        const mysql = require('mysql2/promise');
        const pool = mysql.createPool({ host: "127.0.0.1", user: "root", password: "debian", database: "test" });
        let data = await Promise.all([
            pool.query(`select * from subjects`),
        ]);
        console.log(data[0][0])
        await pool.end();
        response.render('scanner.ejs', { subjects: data[0][0] })
    }
    scan_subjects()

})


app.get('/faculty_home', (request, response) => {
    response.render('faculty_home.ejs', { message: "data" })
})

app.get('/hod_home', (request, response) => {
    response.render('hod_home.ejs', { message: "data" })
})

app.get('/create_subject', (request, response) => {
    response.render('create_subjects.ejs', { message: "data" })
})

app.get('/update_subject', (request, response) => {
    response.render('update_subject.ejs', { message: "data" })
})


app.get('/delete_subject', (request, response) => {
    response.render('delete_subject.ejs', { message: "data" })
})

app.get('/delete_attendance', (request, response) => {
    response.render('delete_attendance.ejs', { message: "data" })
})


app.get('/show_attendance', (request, response) => {
    async function get_date_subject() {
        if (request.body == {}) {
            // console.log(request.body)
        }
        // console.log(request.body)
        const mysql = require('mysql2/promise');
        const pool = mysql.createPool({ host: "127.0.0.1", user: "root", password: "debian", database: "test" });
        let data = await Promise.all([
            pool.query(`SELECT distinct date_format(date, "%Y-%m-%d") as date from table_5;`),
            pool.query(`select distinct subject from table_5;`),
        ]);
        console.log(data[0])
        // console.log(data[1])
        let distinct_date = data[0][0]
        let distinct_subject = data[1][0]
        await pool.end();
        response.render('show_attendance.ejs', { distinct_date: distinct_date, distinct_subject: distinct_subject , result_attendance: "no"})
    }
    get_date_subject()
})

app.post('/showAttendance', (request, response) => {
    async function get_date_subject() {
        const mysql = require('mysql2/promise');
        const pool = mysql.createPool({ host: "127.0.0.1", user: "root", password: "debian", database: "test" });
        if (request.body.subject != "" && request.body.date != "") {

            let data = await Promise.all([
                pool.query(`SELECT distinct date_format(date, "%Y-%m-%d") as date from table_5;`),
                pool.query(`select distinct subject from table_5;`),
                pool.query(`select id, date_format(date, "%Y-%m-%d") as date, time, subject, present from table_5 where date = '${request.body.date}' AND subject = '${request.body.subject}';`)
            ]);

            let distinct_date = data[0][0]
            let distinct_subject = data[1][0]
            let result_attendance = data[2][0]
            console.log(result_attendance, request.body.subject, request.body.date)
            await pool.end();
            response.render('show_attendance.ejs', { distinct_date: distinct_date, distinct_subject: distinct_subject, result_attendance: result_attendance })


        }else if (request.body.subject != "") {

            let data = await Promise.all([
                pool.query(`SELECT distinct date_format(date, "%Y-%m-%d") as date from table_5;`),
                pool.query(`select distinct subject from table_5;`),
                pool.query(`select id, date_format(date, "%Y-%m-%d") as date, time, subject, present from table_5 where subject = '${request.body.subject}';`)
            ]);

            let distinct_date = data[0][0]
            let distinct_subject = data[1][0]
            let result_attendance = data[2][0]
            console.log(result_attendance)
            await pool.end();
            response.render('show_attendance.ejs', { distinct_date: distinct_date, distinct_subject: distinct_subject, result_attendance: result_attendance })


        }else if (request.body.date != "") {

            let data = await Promise.all([
                pool.query(`SELECT distinct date_format(date, "%Y-%m-%d") as date from table_5;`),
                pool.query(`select distinct subject from table_5;`),
                pool.query(`select id, date_format(date, "%Y-%m-%d") as date, time, subject, present from table_5 where date = '${request.body.date}';`)
            ]);

            let distinct_date = data[0][0]
            let distinct_subject = data[1][0]
            let result_attendance = data[2][0]
            console.log(result_attendance)
            await pool.end();
            response.render('show_attendance.ejs', { distinct_date: distinct_date, distinct_subject: distinct_subject, result_attendance: result_attendance })

            
        }else{
            let data = await Promise.all([
                pool.query(`SELECT distinct date_format(date, "%Y-%m-%d") as date from table_5;`),
                pool.query(`select distinct subject from table_5;`),
            ]);
            let distinct_date = data[0][0]
            let distinct_subject = data[1][0]
            await pool.end();
            response.render('show_attendance.ejs', { distinct_date: distinct_date, distinct_subject: distinct_subject , result_attendance: "no"})
        }
    }
    get_date_subject()

    console.log(request.body.date)
})

app.post('/checkUsers', (request, response) => {
    async function checkUsers_from_sql() {
        const mysql = require('mysql2/promise');
        const pool = mysql.createPool({ host: "127.0.0.1", user: "root", password: "debian", database: "test" });
        let data = await Promise.all([
            pool.query(`select distinct * from users`),
        ]);
        // console.log(data[0][0])
        await pool.end();
        let elem = data[0][0]
        for (let i = 0; i < elem.length; i++) {
            const element = data[0][0][i];
            console.log(element)
            if (element.user_name == request.body.Username && element.password == request.body.password && element.role == request.body.role) {
                console.log(request.body)
                if (request.body.role == "hod") {
                    response.redirect("/hod_home")
                }
                else if(request.body.role == "faculty"){
                    response.redirect("/faculty_home")
                }else{
                    request.render('login.ejs', { info: "error" })
                }
            }
        }
        response.render('login.ejs', { info: "error" })
    }
    checkUsers_from_sql()
})

app.post('/add_User', (request, response) => {
    async function addUser_to_sql() {
        const mysql = require('mysql2/promise');
        const pool = mysql.createPool({ host: "127.0.0.1", user: "root", password: "debian", database: "test" });
        let data = await Promise.all([
            pool.query(`insert into users values('${request.body.username}', '${request.body.email}', '${request.body.password}', '${request.body.role}');`),
        ]);
        console.log(request.body)
        await pool.end();
        response.redirect("/login")
    }
    addUser_to_sql()
})

app.post('/addEnrollmentNo', (request, response) => {
    async function addEnrollmentNo() {
        const mysql = require('mysql2/promise');
        const pool = mysql.createPool({ host: "127.0.0.1", user: "root", password: "debian", database: "test" });
        let data = await Promise.all([
            pool.query(`insert into table_5(date, time, subject, present) values(current_date(), current_time(), "${request.body.subject_name_value}", ${request.body.enrollment_no});`),
        ]);
        console.log(request.body)
        await pool.end();
    }
    addEnrollmentNo()
})


app.post('/createSubject', (request, response) => {
    async function createSubjects() {
        const mysql = require('mysql2/promise');
        const pool = mysql.createPool({ host: "127.0.0.1", user: "root", password: "debian", database: "test" });
        let data = await Promise.all([
            pool.query(`insert into subjects values('${request.body.subject_name}');`),
        ]);
        console.log(request.body)
        await pool.end();
        response.render('subject_created.ejs', { subject_name: request.body.subject_name })
    }
    createSubjects()
})

app.get('/show_subject', (request, response) => {
    async function showSubject() {
        const mysql = require('mysql2/promise');
        const pool = mysql.createPool({ host: "127.0.0.1", user: "root", password: "debian", database: "test" });
        let data = await Promise.all([
            pool.query(`select * from subjects;`),
        ]);
        console.log(data[0][0])
        await pool.end();
        response.render('show_subjects.ejs', { result_subjects: data[0][0] })
    }
    showSubject()
})

app.post('/updateSubject', (request, response) => {
    async function uodateSubjects() {
        const mysql = require('mysql2/promise');
        const pool = mysql.createPool({ host: "127.0.0.1", user: "root", password: "debian", database: "test" });
        let data = await Promise.all([
            pool.query(`update subjects set name = '${request.body.new_name}' where name = '${request.body.previous_name}';`),
            pool.query('select * from subjects')
        ]);
        console.log(request.body)
        await pool.end();
        response.render('show_subjects.ejs', { result_subjects: data[1][0] })
    }
    uodateSubjects()
})

app.post('/deleteSubject', (request, response) => {
    async function deleteSubjects() {
        const mysql = require('mysql2/promise');
        const pool = mysql.createPool({ host: "127.0.0.1", user: "root", password: "debian", database: "test" });
        let data = await Promise.all([
            pool.query(`delete from subjects where name = '${request.body.subject_name}';`),
            pool.query('select * from subjects')
        ]);
        console.log(request.body)
        await pool.end();
        response.redirect("/show_subject")
    }
    deleteSubjects()
})

app.post('/deleteAttendance', (request, response) => {
    async function deleteAttendance() {
        const mysql = require('mysql2/promise');
        const pool = mysql.createPool({ host: "127.0.0.1", user: "root", password: "debian", database: "test" });
        let data = await Promise.all([
            pool.query(`delete from table_5 where ${request.body.field} = '${request.body.field_value}';`),
            // pool.query('select * from subjects')
        ]);
        console.log(request.body)
        await pool.end();
        response.redirect("/show_attendance")
    }
    deleteAttendance()
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})