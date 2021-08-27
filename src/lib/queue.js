// Environment Variable
    const path = require('path');
    require('dotenv').config({ path: path.join(__dirname,'..','.env') }); // Configura o path das variaveis de ambiente.

// Dependencies
    import Queue from "bull"; // Bull -> a lib de Fila
    import redisConfig from "../config/redis"; // Config do banco de Dados
    import jobs from "../jobs/index"; // Todos os Jobs

    /*Jobs
        {
            "key": { key: 'sendMail', handle: [AsyncFunction: handle] },
            "key": { key: 'sendMail', handle: [AsyncFunction: handle] } 
        }
    */

// Conversao para Array
    /* 1 - Pega todos os jobs do Objeto passado da importacao e transforma em um array */
    /* 2 - percorre todos os elementos e retorna um Objeto: {bull = new Queue, name = ele.key, handle = ele.handle} */
    /* 3 - Cria de Fato uma queue */
    const queues = Object.values(jobs).map(job => ({
        bull: new Queue(job.key,redisConfig), // 
        name: job.key,
        handle: job.handle
    }));

    // ({}) === { return {} }

// Export
    export default {

        queues,
        add(name,data){
            const queue = this.queues.find(job => job.name === name); // Acha o job de acordo com o nome.

            queue.bull.add(data) // Chama a Function do Bull dentro do job
        },
        process(){
            /* Varre todo o arrey, e para cada elemento chama a Function Process, e caso algo de errado o on logo em baixo ira avisar */
            return this.queues.forEach(queue => {
                queue.bull.process(queue.handle);

                queue.bull.on('failed', (job,err) => {
                    console.error(`
                    
                        Job: ${job.key},
                        ERROR: ${err}

                    `);
                });
            });
        }
        
    };
//