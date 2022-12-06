// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Greeter {
    string private greeting = "Default Greeting";

    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _newGreeting) public {
        greeting = _newGreeting;
    }
}
