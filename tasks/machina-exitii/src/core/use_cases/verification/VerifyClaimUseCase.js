const IUseCase = require('../../domain/interfaces/IUseCase');
const UndecidableException = require('../../domain/exceptions/UndecidableException');
module.exports = class VerifyClaimUseCase extends IUseCase {
  constructor(haltingOracle, mathAdapter) { super(); this.oracle = haltingOracle; this.math = mathAdapter; }
  async execute(context) {
    const isFactored = await this.math.factorize(context.p, context.q);
    if (!isFactored) throw new UndecidableException('RSA constraints not met.');
    return this.oracle.analyze(context.prog, 'TuringMachine');
  }
};
