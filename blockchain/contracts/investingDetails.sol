// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StartupInvestment {

    struct Startup {
        string name;
        string description;
        string imageIPFSHash;
        address creator;
        uint256 totalInvestment;
        address recipient;
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
        string imageIPFSHash,
        address creator
    );

    event InvestmentMade(
        uint256 indexed startupId,
        address investor,
        uint256 amount
    );

    event SaveToIPFS(
        uint256 indexed startupId,
        string jsonData // JSON with startup + investment + image IPFS data
    );

    event RecipientSet(
        uint256 indexed startupId,
        address recipient
    );

    /// Register a startup with metadata and image IPFS hash
    function registerStartup(
        string memory _name,
        string memory _description,
        string memory _imageIPFSHash
    ) external {
        startupCount++;
        startups[startupCount] = Startup({
            name: _name,
            description: _description,
            imageIPFSHash: _imageIPFSHash,
            creator: msg.sender,
            totalInvestment: 0,
            recipient: address(0)
        });

        emit StartupRegistered(startupCount, _name, _description, _imageIPFSHash, msg.sender);
    }

    /// Allow anyone to invest in a startup
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

    /// Emit off-chain JSON log to IPFS
    function emitIPFSLog(uint256 _startupId, string memory _jsonData) external {
        require(_startupId > 0 && _startupId <= startupCount, "Invalid startup ID");
        require(msg.sender == startups[_startupId].creator, "Only startup creator can emit IPFS log");

        emit SaveToIPFS(_startupId, _jsonData);
    }

    /// Set the recipient address who will receive funds (e.g. startup wallet or beneficiary)
    function setRecipient(uint256 _startupId, address _recipient) external {
        require(_startupId > 0 && _startupId <= startupCount, "Invalid startup ID");
        require(msg.sender == startups[_startupId].creator, "Only creator can set recipient");
        require(_recipient != address(0), "Invalid recipient address");

        startups[_startupId].recipient = _recipient;
        emit RecipientSet(_startupId, _recipient);
    }

    /// Allow creator to withdraw total funds to recipient
    function withdrawFunds(uint256 _startupId) external {
        Startup storage s = startups[_startupId];
        require(msg.sender == s.creator, "Only creator can withdraw");
        require(s.recipient != address(0), "Recipient not set");
        require(s.totalInvestment > 0, "No funds to withdraw");

        uint256 amount = s.totalInvestment;
        s.totalInvestment = 0;
        payable(s.recipient).transfer(amount);
    }

    /// Get all investors and amounts (for UI or backend)
    function getInvestments(uint256 _startupId) external view returns (Investment[] memory) {
        return startupInvestments[_startupId];
    }
}
