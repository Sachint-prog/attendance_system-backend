const { request, response } = require('express')
const dbs = require('../models/dbs')

module.exports = {
    getHome: (request,response)=>{
        response.render('faculty_home.ejs')
    },

    getScanner: async (request, response)=>{
        let data = await dbs.queries([`select * from subjects;`])
        console.log(data)
        response.render('scanner.ejs', { subjects: data[0] })
    },

    show_attendance: async (request, response) => {
        if (request.body == {}) {
            // console.log(request.body)
        }
        let data = await dbs.queries([`SELECT distinct date_format(date, "%Y-%m-%d") as date from table_5;`, `select distinct subject from table_5;`, `select distinct * from users;`])
        let distinct_date = data[0]
        let distinct_subject = data[1]
        console.log(distinct_date, distinct_subject)
        response.render('show_attendance.ejs', { distinct_date: distinct_date, distinct_subject: distinct_subject , result_attendance: "no"})
    },

    showAttendance: async (request, response) => {
            if (request.body.subject != "" && request.body.date != "") {
                let data = await dbs.queries([
                    `SELECT distinct date_format(date, "%Y-%m-%d") as date from table_5;`, 
                    `select distinct subject from table_5;`, 
                    `select id, date_format(date, "%Y-%m-%d") as date, time, subject, present from table_5 where date = '${request.body.date}' AND subject = '${request.body.subject}';`
                ])
    
                let distinct_date = data[0]
                let distinct_subject = data[1]
                let result_attendance = data[2]
                console.log(result_attendance, request.body.subject, request.body.date)
                response.render('show_attendance.ejs', { distinct_date: distinct_date, distinct_subject: distinct_subject, result_attendance: result_attendance })
    
    
            }else if (request.body.subject != "") {
                let data = await dbs.queries([
                    `SELECT distinct date_format(date, "%Y-%m-%d") as date from table_5;`, 
                    `select distinct subject from table_5;`, 
                    `select id, date_format(date, "%Y-%m-%d") as date, time, subject, present from table_5 where subject = '${request.body.subject}';`
                ])
    
                let distinct_date = data[0]
                let distinct_subject = data[1]
                let result_attendance = data[2]
                console.log(result_attendance)
                response.render('show_attendance.ejs', { distinct_date: distinct_date, distinct_subject: distinct_subject, result_attendance: result_attendance })
    
    
            }else if (request.body.date != "") {
                let data = await dbs.queries([
                    `SELECT distinct date_format(date, "%Y-%m-%d") as date from table_5;`, 
                    `select distinct subject from table_5;`, 
                    `select id, date_format(date, "%Y-%m-%d") as date, time, subject, present from table_5 where date = '${request.body.date}';`
                ])
    
                let distinct_date = data[0]
                let distinct_subject = data[1]
                let result_attendance = data[2]
                console.log(result_attendance)
                response.render('show_attendance.ejs', { distinct_date: distinct_date, distinct_subject: distinct_subject, result_attendance: result_attendance })
    
                
            }else{
                let data = await dbs.queries([
                    `SELECT distinct date_format(date, "%Y-%m-%d") as date from table_5;`, 
                    `select distinct subject from table_5;`
                ])

                let distinct_date = data[0]
                let distinct_subject = data[1]
                response.render('show_attendance.ejs', { distinct_date: distinct_date, distinct_subject: distinct_subject , result_attendance: "no"})
            }
    },

    delete_attendance: async(request, response) => {
        let data = await dbs.queries([`select distinct * from users;`])
        console.log(data)
        response.render('delete_attendance.ejs', { message: "data" , user: data[0]})
    },

    deleteAttendance: async (request, response) => {
        let data = await dbs.queries([`delete from table_5 where ${request.body.field} = '${request.body.field_value}';`])
            
        response.redirect("faculty/show_attendance")
    },

    addEnrollmentNo: async (request,response) => {
        let data = await dbs.queries([`insert into table_5(date, time, subject, present) values(current_date(), current_time(), "${request.body.subject_name_value}", ${request.body.enrollment_no});`])

        response.redirect('faculty/scanner')
    },
}