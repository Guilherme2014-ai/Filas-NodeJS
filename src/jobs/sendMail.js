import mailer from "../lib/mail";

export default {
    key: "sendMail", // String
    async handle({ data }){ // Function
        try{

            const { user } = data
        
            await mailer.sendMail(
                {
                    from: "Guilherme <guigui_22201@gmail.com>",
                    to: user.name + " <" + user.email + ">",
                    subject: "Teste",
                    html: "<h1>Ola !</h1>"
                }
            );

        } catch(err){
            console.error(err);
        };
    }
}
