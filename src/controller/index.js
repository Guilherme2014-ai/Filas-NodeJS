import Queue from "../lib/queue";

class Controller {

    Index(req,res){
        res.send('asdasd')
    };
    async Index_POST(req,res){
        try{

            const { name,email } = req.body;
            if(!name || !email) throw { "status": 400, "message": "Email / name was not Filled !" };
            const user = { name,email };
            
            await Queue.add("sendMail", { user });
            
            res.json({ message: "Seu Email Foi Enviado !" });

        } catch(err){
            console.error(err);
            throw {"ERROR": err};
        }
    };

};

module.exports = new Controller();