//
//
//
// NAO ESTOU FAZENDO A IMPORTACAO DO MONGOOSE, POIS ESTOU RECEBENDO VIA PARAMETRO

export default (mongoose) => {
  const schema = mongoose.Schema({
    agencia: {
      type: Number,
      required: true,
    },
    conta: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      validate(balance) {
        if (balance < 0)
          throw new Error('Não é permitido inserir valores inferiores a zero!');
      },
    },
  });
  const accountModel = mongoose.model('accounts', schema);
  return accountModel;
};

/*
const accountModel = mongoose.model('accounts', schema);
export { accountModel };
*/
