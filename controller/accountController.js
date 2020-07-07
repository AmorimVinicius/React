import { db } from '../models/index.js';
import accountModel from '../models/accountModel.js';

const Account = db.account;

//
//
//
// GET ALL
const findAll = async (req, res) => {
  try {
    const data = await Account.find({});
    res.send(data);
  } catch (error) {
    res.status(500).send('Ocorreu um erro ao consultar as informações!');
  }
};

//
//
//
// DEPOSIT
const deposit = async (req, res) => {
  try {
    //
    //
    //
    // LOCALIZAR CLIENTE E VERIFICAR SE O MESMO EXISTE
    const client = await Account.findOneAndUpdate(
      {
        agencia: req.body.agencia,
        conta: req.body.conta,
      },
      { $inc: { balance: req.body.balance } },
      { new: true }
    );
    if (!client) {
      res.status(404).send('Conta de cliente não localizada!');
    }
    res.send(client);
  } catch (error) {
    res.status(500).send('Ocorreu um erro ao inserir as informações!');
  }
};

//
//
//
// DRAFT
const draft = async (req, res) => {
  //const rate = 1.5;

  try {
    //
    //
    //
    // VERIFICAR SE EXISTE SALDO SUFICIENTE
    const data = await Account.findOne({ conta: req.body.conta });
    if (data.balance < req.body.balance) {
      res.send('R$ ' + data.balance + ' - Saldo insuficiente!');
      return;
    }
    //
    //
    //
    // LOCALIZAR CLIENTE E VERIFICAR SE O MESMO EXISTE
    const client = await Account.findOneAndUpdate(
      {
        agencia: req.body.agencia,
        conta: req.body.conta,
      },
      { $inc: { balance: -req.body.balance } },
      { new: true }
    );
    if (!client) {
      res.status(404).send('Conta de cliente não localizada!');
    }
    res.send(client);
  } catch (error) {
    res.status(500).send('Ocorreu um erro ao inserir as informações!');
  }
};

//
//
//
// BALANCE
const balance = async (req, res) => {
  try {
    const client = await Account.findOne({
      agencia: req.body.agencia,
      conta: req.body.conta,
    });
    if (!client) {
      res.status(404).send('Conta de cliente não localizada!');
    } else {
      res.send('Saldo: R$ ' + client.balance);
    }
  } catch (error) {
    res.status(500).send('Ocorreu um erro ao consultar as informações!');
  }
};

//
//
//
// REMOVE
const remove = async (req, res) => {
  try {
    //
    //
    //
    // VERIFICAR TOTAL DE CONTAS ATIVAS PARA AGENCIA
    const totalAccounts = await Account.find({ agencia: req.body.agencia });

    const client = await Account.findOneAndDelete({
      agencia: req.body.agencia,
      conta: req.body.conta,
    });
    if (!client) {
      res.status(404).send('Conta de cliente não localizada!');
    } else {
      res.send(
        totalAccounts.length +
          ' contas ativas para a agência [' +
          client.agencia +
          ']'
      );
    }
  } catch (error) {
    res.status(500).send('Ocorreu um erro ao consultar as informações!');
  }
};

const transfer = async (req, res) => {
  try {
    // const rate = 1.5;
    let temp = 0;
    //
    //
    //
    // VERIFICAR SE EXISTA CONTA 1
    const firstClient = await Account.findOne({ conta: req.body.contaOrigem });
    if (!firstClient) {
      res
        .status(404)
        .send('Conta de cliente não localizada!' + req.body.contaOrigem);
    }
    //
    //
    //
    // VERIFICAR SE EXISTA CONTA 2
    const secondClient = await Account.findOne({
      conta: req.body.contaDestino,
    });
    if (!secondClient) {
      res
        .status(404)
        .send('Conta de cliente não localizada!' + req.body.contaDestino);
    }

    //
    //
    //
    // VERIFICAR SE CONTAS SAO DA MESMA AGENCIA
    if (firstClient.agencia === secondClient.agencia) {
      temp = -req.body.valorTransferencia;
    } else {
      temp = -req.body.valorTransferencia;
    }

    const clientOne = await Account.findOneAndUpdate(
      {
        conta: req.body.contaOrigem,
      },
      { $inc: { balance: temp } },
      { new: true }
    );
    const clientTow = await Account.findOneAndUpdate(
      {
        conta: req.body.contaDestino,
      },
      { $inc: { balance: req.body.valorTransferencia } },
      { new: true }
    );
    res.send('Saldo Atual: R$ ' + clientOne.balance);
  } catch (error) {
    res.status(500).send('Ocorreu um erro ao consultar as informações!');
  }
};

//
//
//
// MEDIA BALANCE
const mediaBalance = async (req, res) => {
  try {
    let media = 0;
    //
    //
    //
    // VERIFICAR SE AGENCIA EXISTE
    const agencia = await Account.find({ agencia: req.body.agencia });
    if (!agencia) {
      res.status(404).send('Agência não localizada!');
    }

    var total = agencia.reduce(function (accumulator, currency) {
      return accumulator + currency.balance;
    }, 0);

    media = total / agencia.length;
    res.send('Média = ' + media);
  } catch (error) {
    res.status(500).send('Ocorreu um erro ao consultar as informações!');
  }
};

export default {
  findAll,
  deposit,
  draft,
  balance,
  remove,
  transfer,
  mediaBalance,
};
