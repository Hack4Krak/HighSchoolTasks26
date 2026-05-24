const { initializeEnterpriseApp } = require('./infrastructure/config/di/ContainerBuilder');
const app = initializeEnterpriseApp();
app.listen(3000, () => console.log('Enterprise Halting Validator bounds to 0.0.0.0:3000'));
