import type { NextPage } from 'next'
import { useState } from 'react'
import * as web3 from '@solana/web3.js'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'

const Home: NextPage = () => {
  const [option, setOption] = useState(true)
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState("")
  const [isExecutable, setExecutable] = useState(false)

  const addressSubmittedHandler = (_address: string) => {
    try {
      const key = new web3.PublicKey(_address)
      // console.log(key.toBase58())
      setAddress(key.toBase58())

      const connection = new web3.Connection(web3.clusterApiUrl("devnet"))
      connection.getBalance(key).then( balance => {
        setBalance(balance / web3.LAMPORTS_PER_SOL)
      })
      connection.getAccountInfo(key).then(info => {
        setExecutable(info ? info.executable : false)
      })
    } catch (err) {
      setAddress('')
      setBalance(0)
      alert("Give me something valid")
    }
    
  }

  const handleSelectOption = (option: string) => option == "read" ? setOption(true) : setOption(false)

  const readFromSolana = () => {
    return (
      <>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`Executable: ${isExecutable}`}</p>
      </>
    )
  }

  const writeToSolana = () => {
    return (
      <>
        
      </>
    )
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <div>
          <button 
            className={styles.AppActionOption}
            onClick={ () => handleSelectOption("read") }
          >
            Read From Solana Blockchain
          </button>
          <button 
            className={styles.AppActionOption}
            onClick={ () => handleSelectOption("write") }
          >
            Write to Solana Blockchain
          </button>
        </div>
        <p>
          Start Your Solana Journey
        </p>
        { option ?  readFromSolana() : writeToSolana() }
      </header>
    </div>
  )
}

export default Home
