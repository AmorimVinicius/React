import mongoose from 'mongoose';
import accountModel from './accountModel.js';

const db = {};

db.mongoose = mongoose;
db.url = 'mongodb://localhost:27017/account';
db.account = accountModel(mongoose);

export { db };
