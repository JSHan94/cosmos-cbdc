import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { faChevronLeft, faHome, faChevronDown, faChevronUp, faSearch, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { history } from '../../_helpers'
import { dbService } from "../../fbase"

const ACBDCDealPage = ({affiliateInfo}) => {
    const userInfo = affiliateInfo
    const [txs,setTxs] = useState([])
    const curDate = new Date().getUTCFullYear().toString()+"-"+(new Date().getUTCMonth()+1).toString()
    const getUserTxHistory = async(e) =>{
        try{
            //추후 set으로 바꿔서 receiver, sender 둘다 확인 후 가져오게 하는게 좋을 듯
            const userQuerySnapshot = await dbService
                .collection(`TxInfo`)
                .where('receiver_account','==',userInfo.account)
                .orderBy('transaction_date','desc')
                .get()
            const txsArrayA = userQuerySnapshot.docs.map((doc)=>({
                            ...doc.data()
                        }))

            const senderQuerySnapshot = await dbService
                .collection(`TxInfo`)
                .where('sender_account','==',userInfo.account)
                .orderBy('transaction_date','desc')
                .get()
            const txsArrayB = senderQuerySnapshot.docs.map((doc)=>({
                ...doc.data()
            })).filter(doc=>doc.transaction_type ==="이체")
            console.log(txsArrayB)
            setTxs([...txsArrayB,...txsArrayA])
        }catch(error){
            console.log(error)
        }  
    }
    useEffect(() =>{
        getUserTxHistory()
    },[userInfo])
    const [state, setState] = useState(false)

    return (
        <div>
            <Header>
                <FontAwesomeIcon 
                    icon={faChevronLeft} 
                    style={{color: "#000", fontSize: '4vw', marginLeft: '5vw',cursor:'pointer'}}
                    onClick={() => history.push('/affiliate/CBDC')}
                />
                <HeaderText>거래내역조회</HeaderText>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <FontAwesomeIcon icon={faHome} style={{color: "#000", fontSize: '4vw', marginRight: '3vw'}}/>
                    <Dbutton
                        style={{
                            marginRight: '4vw'
                        }}
                        onClick={() => history.push('/affiliate/CBDC')}
                    >
                        D
                    </Dbutton>
                </div>
            </Header>
            <Body>
                <CardChild>
                    <div style={{display: 'flex', flexDirection: 'column', padding: '0 4vw'}}>
                        
                        <div style={{marginTop: '2vw', color: '#000', fontSize:'3.73vw'}}>
                        <img 
                            src={"/images/hana_logo.png"} 
                            alt="logo"
                            style={{
                                height:20,
                                marginRight:10
                            }}
                        />
                            가맹점 보유금</div>
                        <span style={{marginLeft:20}}>147-1471-1471</span>
                        <span style={{marginLeft:20}}>(cosmos456zzt)</span>
                        <div style={{marginTop: '6vw', display: 'flex', justifyContent: 'flex-end', position: 'relative'}}>
                            <div style={{fontSize: '6vw'}}>{userInfo.common_cbdc_balance&&userInfo.common_cbdc_balance.toLocaleString()} <span style={{fontSize: '4vw'}}>D-KRW</span></div>
                        </div>
                    </div>
                </CardChild>

                <Tools>
                    <IconButton>
                        <FontAwesomeIcon icon={faSearch} style={{fontSize: '5.73vw'}} />
                    </IconButton>
                    <SearchText>1개월 &nbsp;&nbsp;&nbsp; 전체 &nbsp;&nbsp;&nbsp; 최신 &nbsp;&nbsp;&nbsp;</SearchText>
                    <IconButton>
                        <FontAwesomeIcon icon={faCog} style={{fontSize: '5.73vw'}}  />
                    </IconButton>
                </Tools>
                <List>
                    <ListHeader>
                        <ListDate>{curDate}</ListDate>
                        <ListShow
                            onClick={() => setState(!state)}
                        >
                            <FontAwesomeIcon
                                icon={state? faChevronDown : faChevronUp} 
                                style={{fontSize: '3.7vw', color: '#00b2a7'}}
                            />
                        </ListShow>
                    </ListHeader>
                    {!state && <ListBody>                     
                        {
                            
                        txs.map((tx,index)=>(
                        <ListItem key={index}>
                            <ListItemLeft>
                                <Time>{tx.transaction_date}</Time>
                                {tx.transaction_type === "결제"? (
                                    <>
                                         <Content>매출 ({tx.sender_name})</Content>
                                    </>
                                ):(
                                    <>
                                        <Content>매출취소 ({tx.sender_name})</Content>
                                    </>
                                )}
                                
                            </ListItemLeft>
                            <ListItemRight style={{textAlign: 'right'}}>    
                                {
                                    tx.transaction_type == "결제취소"?(
                                        <>{(-tx.amount).toLocaleString()}</>
                                    ):(
                                        tx.receiver_name === userInfo.name ?(
                                            <>{(tx.amount).toLocaleString()}</>
                                        ):(
                                            <>{(-tx.amount).toLocaleString()}</>
                                        )
                                    )
                                }
                                <br/>
                                D-KRW
                            </ListItemRight>
                        </ListItem>
                        ))   
                    }
                    </ListBody>}
                </List>
            </Body>

        </div>
    )
}

export { ACBDCDealPage }
const Header = styled.div`
    background-color: #fff;
    height: 6.76vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    font-size: 4vw;
    font-weight: 600;
`
const Body = styled.div`
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`
const HeaderText = styled.div`
    color: #000;
`
const CardChild = styled.div`
    width: 90vw;
    height: 12.31vh;
    padding-top: 3.5vh;
    padding-bottom: 3vh;
    border-top: 1px solid #dcdcdc;
    box-shadow: 1px 2px 6px 1px #bfcfea;
    border-radius: 4vw;
    margin-top: 4vw;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const Tools = styled.div`
    width: 90vw;
    height: 5vh;
    display: flex;
    align-items: baseline;
    justify-content: center;
    margin-top: 4.53vh
`
const IconButton = styled.button`
    // width: 20px;
    // height: 20px;
    font-size: 15px;
    background: none;
    outline: none;
    border: none;
    color: #888888;
`
const SearchText = styled.div`
    color: #888888;
    font-size: 3.5vw;
    margin-left: auto;
`
const List = styled.div`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #efefef;
`
const ListHeader = styled.div`
    width: 100vw;
    height: 5.47vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #efefef;
`
const ListDate = styled.div`
    font-size: 3.7vw;
    font-weight: 500;
    margin-left: 6vw;
`
const ListShow = styled.button`
    background: none;
    border: none;
    outline: none;
    color: #aaaaaa;
    font-size: 13px;
    margin-right: 6vw;
`
const ListBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ListItem = styled.div`
    display: flex;
    width: 90vw;
    height: 9.86vh;
    padding-top: 20px;
    padding-bottom: 20px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #efefef;
`
const ListItemLeft = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`
const Time = styled.div`
    color: #aaaaaa;
    font-size: 2.67vw;
`
const Content = styled.div`
    margin-top: 10px;
    color: #212121;
    font-size: 3.8vw;
    font-weight: 600;
`
const ListItemRight = styled.div`
    color: #00b2a7;
    font-size: 3.8vw;
    font-weight: 600;
    white-space: nowrap;
`
const Dbutton = styled.button`
    color: #ffffff;
    background-color: #00b2a7;
    font-size: 3.73vw;
    font-weight: 600;
    width: 4.5vw;
    height: 4.5vw;
    border-radius: 2vw;
    border: none;
    text-align: center;
`
const CancelButton = styled.button`
    color: #ffffff;
    background-color: #00b2a7;
    font-size: 3.73vw;
    font-weight: 600;
    width: 25vw;
    height: 8vw;
    border-radius: 2vw;
    border: none;
    text-align: center;
`