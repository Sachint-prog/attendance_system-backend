const dbs = require('../models/dbs')

module.exports = {
    getHome: (request,response)=>{
        response.render('hod_home.ejs')
    },

    create_subject: (request,response)=>{
        response.render('create_subjects.ejs', { message: "data" })
    },

    update_subject: (request,response)=>{
        response.render('update_subject.ejs', { message: "data" })
    },

    delete_subject: (request,response)=>{
        response.render('delete_subject.ejs', { message: "data" })
    },

    show_subject: async (request, response) => {
        let data = await dbs.queries([`select * from subjects;`])
        response.render('show_subjects.ejs', { result_subjects: data })
    },

    createSubject: async (request, response) => {
        let data = await dbs.queries([`insert into subjects values('${request.body.subject_name}');`, `select distinct * from users;`])
        response.render('subject_created.ejs', { subject_name: request.body.subject_name })
    },

    updateSubject: async (request, response) => {
        let data = await dbs.queries([`update subjects set name = '${request.body.new_name}' where name = '${request.body.previous_name}';`, 'select * from subjects'])
        response.render('show_subjects.ejs', { result_subjects: data[1][0] })
    },

    deleteSubject: async (request, response) => {
        let data = await dbs.queries([`delete from subjects where name = '${request.body.subject_name}';`, 'select * from subjects', `select distinct * from users;`])
        response.redirect("/show_subject")
    }
}


