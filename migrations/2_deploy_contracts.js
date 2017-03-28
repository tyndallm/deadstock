var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var Killable = artifacts.require("./zeppelin/lifecycle/Killable.sol");
var Authentication = artifacts.require("./Authentication.sol");

var PrivateServiceRegistry = artifacts.require("./weifund/PrivateServiceRegistry.sol");

var ListingRegistry = artifacts.require("./ListingRegistry.sol");
var StandardListingFactory = artifacts.require("./StandardListingFactory.sol");


module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Killable);
  deployer.deploy(Killable);
  deployer.link(Killable, Authentication);
  deployer.deploy(Authentication);
  deployer.deploy(PrivateServiceRegistry);
  deployer.link(PrivateServiceRegistry, StandardListingFactory);
  deployer.deploy(StandardListingFactory);
  deployer.deploy(ListingRegistry);
};
