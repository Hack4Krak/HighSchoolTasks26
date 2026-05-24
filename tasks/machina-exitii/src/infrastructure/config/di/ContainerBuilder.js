const express = require('express');
const AdvancedBigIntProcessor = require('../../adapters/math/AdvancedBigIntProcessor');
const DeterministicTuringOracle = require('../../services/logic/DeterministicTuringOracle');
const VerifyClaimUseCase = require('../../../core/use_cases/verification/VerifyClaimUseCase');
const ValidationController = require('../../web/controllers/ValidationController');
const RouterConfig = require('../../web/routes/RouterConfig');
exports.initializeEnterpriseApp = () => {
    const mathAdapter = new AdvancedBigIntProcessor();
    const oracle = new DeterministicTuringOracle();
    const useCase = new VerifyClaimUseCase(oracle, mathAdapter);
    const controller = new ValidationController(useCase);
    const app = express();
    app.use(express.json());
    app.use(RouterConfig(controller));
    app.use(express.static('client'));
    return app;
};
