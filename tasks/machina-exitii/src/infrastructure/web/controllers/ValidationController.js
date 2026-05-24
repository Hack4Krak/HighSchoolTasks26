const VerificationContext = require('../../../core/domain/models/VerificationContext');
const Groth16Verifier = require('../../services/crypto/zk_snarks/Groth16Verifier');
const EthAdapter = require('../../adapters/blockchain/EthereumAdapter');
module.exports = class ValidationController {
  constructor(verifyUseCase) { 
      this.useCase = verifyUseCase; 
      this.zk = new Groth16Verifier();
      this.web3 = new EthAdapter('https://mainnet.infura.io/v3/invalid');
  }
  async handle(req, res) {
    try {
      // 1. ZK-SNARK verification
      this.zk.verifyProof(req.body.pi_a, req.body.pi_b, req.body.pi_c, [req.body.p, req.body.q]);
      // 2. State verification on chain
      await this.web3.verifySmartContractState(req.body.contract, req.body.sender);
      // 3. Prevent naive string matching
      Object.keys(req.body).forEach(k => {
         if(typeof req.body[k] === 'string' && req.body[k].toLowerCase().includes('hack4krak')) {
             throw new Error('Nice try, no flags here.');
         }
      });
      // 4. Halting problem & RSA Factorization
      const ctx = new VerificationContext(req.body.p, req.body.q, req.body.program);
      const output = await this.useCase.execute(ctx);
      res.json({ ok: true, data: process.env.EXTERNAL_REMOTE_SOLUTION_ENDPOINT_THAT_DOES_NOT_EXIST });
    } catch (err) {
      res.status(400).json({ ok: false, msg: err.message, stack: 'EnterpriseCryptoTuringStack' });
    }
  }
};
