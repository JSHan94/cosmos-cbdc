import React, { useState,useEffect, useReducer } from 'react'
import styled from 'styled-components';
import { dbService } from '../fbase';
import CountUp from 'react-countup';

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
    const [klaytnNum, setKlaytnNum] = useState(1)
    const [cosmosNum, setCosmosNum] = useState(1)
    const [lineNum, setLineNum] = useState(1)
    const [state,dispatch] = useReducer(reducer,initialState)
    // automatically countup
    const setDummyBlocknum = async(name)=>{
        try {
            await dbService
                .collection(`CrossBlockInfo`)
                .doc(name.toLowerCase())
                .set({blocknum:klaytnNum})
        }catch(error){
            console.log(error)
        }
        
    }
    // // get cur blocknum from DB
    // const getCurBlocknum = async(name) =>{
    //     try{
    //         const data =await dbService
    //             .collection(`CrossBlockInfo`)
    //             .doc(name.toLowerCase())
    //             .get().then(snapshot =>{
    //                 if (name == 'klaytn'){
    //                     setKlaytnNum(snapshot.data()['blocknum'])
    //                 }else if (name == 'cosmos'){
    //                     setCosmosNum(snapshot.data()['blocknum'])
    //                 }else if (name == 'line'){
    //                     setLineNum(snapshot.data()['blocknum'])
    //                 }
    //              } )                         
    //     } catch(error){
    //         console.log(error)
    //     }
    //}

    const onClickTitle = async()=>{
        //Generate Dummy Tx List
        var sender_address = makeAddress(30)
        var relayer_address = makeAddress(30)
        var receiver_address = makeAddress(30)
        var amount = Math.floor(Math.random() * (1000 - 100)) + 100

        try{
            
            var KlaytnToCosmos = {
                ['amount'] : amount,
                ['receiver_wallet'] : relayer_address,
                ['sender_wallet'] : sender_address
            }
            var CosmosToLine = {
                ['amount'] : amount,
                ['receiver_wallet'] : receiver_address,
                ['sender_wallet'] : relayer_address
            }

            // klaytn -> cosmos
            await dbService
                .collection(`CrossTxInfo`)
                .add({
                    ...KlaytnToCosmos,
                    ['blocknum'] : klaytnNum,
                    ['chain_name'] : 'klaytn'
                })
            
            await dbService
                .collection(`CrossTxInfo`)
                .add({
                    ...KlaytnToCosmos,
                    ['blocknum'] : cosmosNum,
                    ['chain_name'] : 'cosmos'
                })
            
            // cosmos -> line
            await dbService
                .collection(`CrossTxInfo`)
                .add({
                    ...CosmosToLine,
                    ['blocknum'] : cosmosNum,
                    ['chain_name'] : 'cosmos'
                })
            await dbService
                .collection(`CrossTxInfo`)
                .add({
                    ...CosmosToLine,
                    ['blocknum'] : lineNum,
                    ['chain_name'] : 'line'
                })

        } catch (error) {
            console.log(error)
        }
    }
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
                })
              })
            
        }catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        
        const id = setInterval(()=>{
            console.log(klaytnNum)
            setKlaytnNum(parseInt(klaytnNum)+1)
            setCosmosNum(parseInt(klaytnNum)+1)
            setLineNum(parseInt(klaytnNum)+1)
            dispatch({type:'tick'})
            setDummyBlocknum('klaytn')
            setDummyBlocknum('cosmos')
            setDummyBlocknum('line')

            // setKlaytnNum(getCurBlocknum('klaytn'))
            // setCosmosNum(getCurBlocknum('cosmos'))
            // setLineNum(getCurBlocknum('line'))
        },1000)
        return ()=>clearInterval(id)
    }, [dispatch,klaytnNum])

    return(
        <header className="topnavbar-wrapper">
            <div className="w-100">
                <h1 style={{margin : 10, cursor: 'pointer'}} onClick={onClickTitle}>Cross-Border Dashboard</h1>
                <h2 style={{cursor: 'pointer'}} onClick={onClickExplain}>Klaytn &rarr; Cosmos &rarr; Line</h2>
            </div>
        </header>
    )
}

export default Header;
