import React, { useState,useEffect, useReducer } from 'react'
import { dbService } from '../fbase';
import {useDispatch,useSelector} from 'react-redux'


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

const initialState = { count: 0, step: 1, }; 
function reducer(state, action) { const { count, step } = state; if (action.type === 'tick') { return { count: count + step, step }; } else if (action.type === 'step') { return { count, step: action.step }; } else { throw new Error(); } }

// Dummy Tx Generator
const Header = ()=>{
    //const [blocknum, setBlocknum] = useState(1)
    const [state,dispatch] = useReducer(reducer,initialState)
    const blocknum= useSelector((state)=>state);
    const reduxDispatch = useDispatch()
 
    
    // automatically countup (for dummy test)
    const setDummyBlocknum = async()=>{
        try {
            const chain_names = ['cosmos','klaytn','line']
            chain_names.forEach(e =>{
                dbService
                    .collection(`CrossBlockInfo`)
                    .doc(e)
                    .set({blocknum:blocknum})
            })
            
        }catch(error){
            console.log(error)
        }
    }

    const onClickTitle = async()=>{

        //Generate Dummy Tx List
        var amount = Math.floor(Math.random() * (1000 - 100)) + 100
        try{
            
            var CosmosTX = {
                ['amount'] : amount,
                ['receiver_wallet'] : makeAddress(30),
                ['sender_wallet'] : makeAddress(30),
                ['blocknum'] : blocknum,
                ['chain_name'] : 'cosmos'
            }

            var KlaytnTX = {
                ['amount'] : amount,
                ['receiver_wallet'] : makeAddress(30),
                ['sender_wallet'] : makeAddress(30),
                ['blocknum'] : blocknum,
                ['chain_name'] : 'klaytn'
            }
            
            var LineTX = {
                ['amount'] : amount,
                ['receiver_wallet'] : makeAddress(30),
                ['sender_wallet'] : makeAddress(30),
                ['blocknum'] : blocknum,
                ['chain_name'] : 'line'
            }

            // klaytn -> cosmos
            await dbService
                .collection(`CrossTxInfo`)
                .add({
                    ...KlaytnTX
                })
            
            await dbService
                .collection(`CrossTxInfo`)
                .add({
                    ...CosmosTX
                })
            await dbService
                .collection(`CrossTxInfo`)
                .add({
                    ...LineTX
                })

        } catch (error) {
            console.log(error)
        }
        
    }
    // refresh db
    const onClickExplain = async()=>{
        try{
            const ref1 = await dbService.collection('CrossBlockInfo')
            ref1.onSnapshot((snapshot) => {
                snapshot.docs.forEach((doc) => {
                  ref1.doc(doc.id).delete()
                })
              })
            
            const ref2 = await dbService.collection('CrossTxInfo')
            
            ref2.onSnapshot((snapshot) => {
                snapshot.docs.forEach((doc) => {
                  ref2.doc(doc.id).delete()
                  window.location.reload();
                })
              })
        }catch (error) {
            console.log(error)
        }
    }


    // useEffect(()=> {
    //     const id = setInterval(()=>{
    //         //setBlocknum(parseInt(blocknum)+1)
            
    //         reduxDispatch({type:'add'})
    //         dispatch({type:'tick'})
    //         setDummyBlocknum() 
    //     },3000)
    //     return ()=>clearInterval(id)
    // }, [dispatch,blocknum])

    return(
        <header className="topnavbar-wrapper">
            <div className="w-100">
                <h1 style={{margin : 10, cursor: 'pointer'}} onClick={onClickTitle}>해외 송금 대시보드</h1>
                <h2 style={{cursor: 'pointer'}} onClick={onClickExplain}> Cosmos(KRW-C) &rarr; Klaytn(USD-C) &rarr; Line(THB-C)</h2>
            </div>
        </header>
    )
}

export default Header;
