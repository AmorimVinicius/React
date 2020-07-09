import mongoose from 'mongoose';
import accountModel from './accountModel.js';

require('dotenv').config();

//process.env.USER_DB
//process.env.PASSWORD_DB

const db = {};

db.mongoose = mongoose;
db.url = 'mongodb://localhost:27017/account';
db.account = accountModel(mongoose);

export { db };
