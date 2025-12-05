const { ethers } = require('ethers');

const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)"
];

exports.getSmartContractData = async (req, res) => {
    try {
        console.log('\n=== Smart Contract API Test ===');
        
        const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
        
        const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
        
        console.log(`Connecting to contract: ${contractAddress}`);
        
        const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);
        
        const name = await contract.name();
        const symbol = await contract.symbol();
        const decimals = await contract.decimals();
        const totalSupply = await contract.totalSupply();
        
        const formattedSupply = ethers.formatUnits(totalSupply, decimals);
        
        const contractData = {
            contractAddress,
            name,
            symbol,
            decimals: Number(decimals),
            totalSupply: totalSupply.toString(),
            formattedTotalSupply: formattedSupply,
            network: 'Ethereum Mainnet'
        };

        console.log('\n Smart Contract Data:');
        console.log('Contract Address:', contractData.contractAddress);
        console.log('Token Name:', contractData.name);
        console.log('Token Symbol:', contractData.symbol);
        console.log('Decimals:', contractData.decimals);
        console.log('Total Supply:', contractData.formattedTotalSupply, contractData.symbol);
        console.log('Network:', contractData.network);
        console.log('\n=== API Test Complete ===\n');
        
        res.status(200).json({
            success: true,
            message: 'Smart contract data fetched successfully',
            data: contractData
        });
        
    } catch (error) {
        console.error('Error fetching smart contract data:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch smart contract data',
            error: error.message
        });
    }
};
