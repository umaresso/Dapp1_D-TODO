// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract  Todo{

string[]  items;

function addItem(string memory item) public { items.push(item); }
function deleteItem(uint index)public returns(string[] memory){ 

        if (index >= items.length) return items;

        for (uint i = index; i<items.length-1; i++){
            items[i] = items[i+1];
        }
        items.pop();
        return items;
    
 }
function getItems()public view returns(string[] memory){ return items;}



}