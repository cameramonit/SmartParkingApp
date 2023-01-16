const BookingParking = artifacts.require("BookingParking");

module.exports = function (deployer) {
  deployer.deploy(BookingParking);
};
