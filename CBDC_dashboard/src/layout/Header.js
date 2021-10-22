import React from 'react'
import styled from 'styled-components';
import { dbService } from '../fbase';


function makeAddress(length) {
    var result           = '0x';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


// Dummy Tx Generator
const Header = ()=>{
    const onClickTitle = async()=>{
        //Generate Dummy Tx List
        var sender_address = makeAddress(30)
        var relayer_address = makeAddress(30)
        var receiver_address = makeAddress(30)
        var amount = Math.floor(Math.random() * (1000 - 100)) + 100
        var blocknum = 10
        try{
            // klaytn -> cosmos
            var KlaytnToCosmos = {
                ['amount'] : amount,
                ['blocknum'] : blocknum,
                ['receiver_wallet'] : relayer_address,
                ['sender_wallet'] : sender_address
            }
            var CosmosToLine = {
                ['amount'] : amount,
                ['blocknum'] : blocknum,
                ['receiver_wallet'] : receiver_address,
                ['sender_wallet'] : relayer_address
            }

            await dbService
                .collection(`CrossTxInfo`)
                .add({
                    ...KlaytnToCosmos,
                    ['chain_name'] : 'klaytn'
                })
            
            await dbService
                .collection(`CrossTxInfo`)
                .add({
                    ...KlaytnToCosmos,
                    ['chain_name'] : 'cosmos'
                })
            
            // cosmos -> line
            await dbService
                .collection(`CrossTxInfo`)
                .add({
                    ...CosmosToLine,
                    ['chain_name'] : 'cosmos'
                })
            await dbService
                .collection(`CrossTxInfo`)
                .add({
                    ...CosmosToLine,
                    ['chain_name'] : 'line'
                })

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <header className="topnavbar-wrapper">
            <div className="w-100">
                <h1 style={{margin : 10}} onClick={onClickTitle}>Cross-Border Dashboard</h1>
            </div>
        </header>
    )
}

export default Header;


const Menus = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top : 0;
`
const MenuItem = styled.h5`
    padding: 0 10 ;
    cursor: pointer;
`