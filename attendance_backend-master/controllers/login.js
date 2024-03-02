const dbs = require('../models/dbs')

module.exports = {
    getBuilding: (req,res)=>{
        res.render('buildings.ejs')
    },


    getRegister: (req,res) => {
        res.render('register.ejs')
    },

    addUser: async (req, res) => {
        await dbs.queries([`insert into users values('${req.body.username}', '${req.body.email}', '${req.body.password}', '${req.body.role}');`])
        res.redirect("/login")
    },


    getLogin: (req,res) => {
        res.render('login.ejs', { info: "noError" })
    },

    checkUsers: async(req,res) => {
        let elem = await dbs.queries([`select distinct * from users;`])
        let data = elem[0]
        for (let i = 0; i < data.length; i++) {
            const element = elem[0][i];
            console.log(element)
            console.log(req.body)
            if (element.user_name == req.body.Username && element.password == req.body.password && element.role == req.body.role) {
                if (req.body.role == "hod") {
                    res.redirect("/hod")
                }
                else if(req.body.role == "faculty"){
                    res.redirect("/faculty")
                }else{
                }
            }
        }
        res.render('login.ejs', { info: "error" })
    },

    
}