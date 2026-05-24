const IHaltingOracle = require('../../../core/domain/interfaces/IHaltingOracle');
const UndecidableException = require('../../../core/domain/exceptions/UndecidableException');
module.exports = class DeterministicTuringOracle extends IHaltingOracle {
  analyze(program, type) {
    throw new UndecidableException('Abstract analysis layer: Oracle requires P=NP confirmation to proceed.');
  }
};
