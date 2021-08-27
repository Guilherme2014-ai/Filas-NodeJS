const path = require('path');
require('dotenv').config({ path: path.join(__dirname,'..','.env') }); // Configura o path das variaveis de ambiente.

import nodemailer from "nodemailer";
import configMail from "../config/mailer";


export default nodemailer.createTransport(configMail);