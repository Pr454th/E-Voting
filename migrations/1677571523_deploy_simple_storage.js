// 2_deploy_simple_storage.js

const SimpleStorage = artifacts.require("myContract");

module.exports = function (deployer) {
    deployer.deploy(SimpleStorage);
};
