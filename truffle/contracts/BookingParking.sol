// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract BookingParking {
  string[][] public listArea;

  event BookingCreated(
    uint id,
    string name,
    uint price,
    string area,
    string time,
    string hour,
    address payable owner
  );

  function booking(string memory _name, uint _price, string memory _area, string memory _time, string memory _hour) public payable {
    listArea.push([_time, _hour, _area]);
    emit BookingCreated(1, _name, _price, _area, _time, _hour, payable(msg.sender));
  }

  function getListArea() public view returns (string[][] memory area){
    area = listArea;
    return area;
  }

  function popListArea() public {
    listArea.pop();
  }

}
