// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract SecureTokenHolder {

    event Approval(address indexed owner, address indexed spender, uint256 value);

function holdERC20(
    address tokenAddress,
    uint256 amount
) external {
    IERC20 token = IERC20(tokenAddress);
    token.approve(address(this), amount);
    emit Approval(msg.sender, address(this), amount); 
}

    
    function transferERC20(
        address tokenAddress,
        address from,
        address to,
        uint256 amount
    ) external {
        IERC20 token = IERC20(tokenAddress);
        token.transferFrom(from, to, amount);
    }



    function transferERC721(
        address tokenAddress,
        address from,
        address to,
        uint256 tokenId
    ) external {
        IERC721 token = IERC721(tokenAddress);
        token.safeTransferFrom(from, to, tokenId);
    }
}