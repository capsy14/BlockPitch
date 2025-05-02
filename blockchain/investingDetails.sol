// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StartupInvestment {

    struct Startup {
        string name;
        string description;
        address creator;
        uint256 totalInvestment;
    }

    struct Investment {
        address investor;
        uint256 amount;
    }

    mapping(uint256 => Startup) public startups;
    mapping(uint256 => Investment[]) public startupInvestments;
    uint256 public startupCount;

    event StartupRegistered(
        uint256 indexed startupId,
        string name,
        string description,
        address creator
    );

    event InvestmentMade(
        uint256 indexed startupId,
        address investor,
        uint256 amount
    );

    event SaveToIPFS(
        uint256 indexed startupId,
        string jsonData // JSON string of startup + investment details
    );

    function registerStartup(string memory _name, string memory _description) external {
        startupCount++;
        startups[startupCount] = Startup({
            name: _name,
            description: _description,
            creator: msg.sender,
            totalInvestment: 0
        });

        emit StartupRegistered(startupCount, _name, _description, msg.sender);
    }

    function investInStartup(uint256 _startupId) external payable {
        require(_startupId > 0 && _startupId <= startupCount, "Invalid startup ID");
        require(msg.value > 0, "Investment must be greater than 0");

        startups[_startupId].totalInvestment += msg.value;
        startupInvestments[_startupId].push(Investment({
            investor: msg.sender,
            amount: msg.value
        }));

        emit InvestmentMade(_startupId, msg.sender, msg.value);
    }

    // Call this from off-chain after fetching data
    function emitIPFSLog(uint256 _startupId, string memory _jsonData) external {
        require(_startupId > 0 && _startupId <= startupCount, "Invalid startup ID");
        require(msg.sender == startups[_startupId].creator, "Only startup creator can emit IPFS log");

        emit SaveToIPFS(_startupId, _jsonData);
    }
}