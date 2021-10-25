import React, { useState,useEffect, useReducer } from "react";
import "./BlockCard.css";
import SmoothList from 'react-smooth-list';
import ReactLoading from 'react-loading';

import { dbService } from "../fbase";
const Card = (props) =>{
    return (
        <div>
            <hr class="hr-space"></hr>
            <div class="row">
                <div class="col-sm-4">Blocknum :</div>
                <div class="col-sm-8">{props.blocknum}</div>
            </div>
            <div class="row">
                <div class="col-sm-4">From :</div>
                <div class="col-sm-8">{props.from}</div>
            </div>
            <div class="row">
                <div class="col-sm-4">To :</div>
                <div class="col-sm-8">{props.to}</div>
            </div>
            <div class="row">
                <div class="col-sm-4">Amount :</div>
                <div class="col-sm-8">{props.amount} {props.unit}</div>
            </div>
            
        </div>
    )
}

// request from DB every second
const initialState = { count: 0, step: 1, }; 
function reducer(state, action) { const { count, step } = state; if (action.type === 'tick') { return { count: count + step, step }; } else if (action.type === 'step') { return { count, step: action.step }; } else { throw new Error(); } }

const BlockCard = ({name}) =>{

    const [state,dispatch] = useReducer(reducer,initialState)
    const {count,step} = state;

    const [blockTxHistory, setBlockTxHistory] = useState([])
    const [curBlocknum, setCurBlocknum] =useState([])
    const [cosmosBlocknum, setCosmosBlockNum] = useState(0)

    var con;

    const getCurBlocknum = async(e) =>{
        try{
            await dbService
                .collection(`CrossBlockInfo`)
                .doc(name.toLowerCase())
                .get().then(snapshot=>setCurBlocknum(snapshot.data()))
            
        } catch(error){
            console.log(error)
        }
    }
    const getBlockTxHistory = async(e) => {
        try {
            var blockTxSnapshot = await dbService
                .collection(`CrossTxInfo`)
                .where("chain_name", "==", name.toLowerCase())
                .get()
            
            const txsArray = blockTxSnapshot.docs.map((doc)=>({
                ...doc.data()
            })).sort(function(a,b) {
                if(a.blocknum > b.blocknum){
                    return -1;
                }
                if(a.blocknum < b.blocknum){
                    return 1;
                }
                return 0;
            })
            setBlockTxHistory(txsArray.filter(tx => tx.chain_name === name.toLowerCase()))
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        const id = setInterval(()=>{
            dispatch({type:'tick'});
            getBlockTxHistory()
            getCurBlocknum()
        },1000)
        return ()=>clearInterval(id)
    }, [dispatch])

    return(
        <>
            <div class="card">
                <div class="card-header">
                    <img src={"/images/"+name+".png"} style={{height : 20, width : 20}} alt="img"/>
                    <h1 class="card-header-title">{name}</h1>
                    <div>
                        <div class="center">
                            <ReactLoading type={"cubes"} color={"#e7eaf3"}/>
                        </div>

                        <span>current blocknum : {curBlocknum ? curBlocknum.blocknum : 1} </span>
                    </div>
                </div>


                    <div class="card-container">
                        {
                            blockTxHistory.map((el,i)=>(
                                <SmoothList>
                                    <Card unit={name} from={el.sender_wallet} to={el.receiver_wallet} amount={el.amount} blocknum={el.blocknum}></Card> 
                                </SmoothList>
                                
                            ))
                        }
                    </div>
                
                            
            </div>
            </>
    )
}

export default BlockCard;
