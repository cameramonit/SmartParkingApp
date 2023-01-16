import './App.css';
import 'bulma/css/bulma.min.css';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ChooseSpace from './components/ChooseSpace';
import BookingDetails from './components/BookingDetails';
import Loading from './components/Loading';
import ListBooking from './components/ListBooking';
import BookingParking from './contracts/BookingParking.json'

function App() {

  const [isConnected, setIsConnected] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const[page, setPage]=useState(1);

  let [loading, setLoading] = useState(false);
  let bookingParkingContract;
  let contractIsInitialized = false;

  const getBooking = async () => {
    if (!contractIsInitialized){
      await onConnect();
    }
    return bookingParkingContract.methods.getListArea().call()
    .then((val) => {
      // console.log("set item");
      console.log(val);
      window.localStorage.setItem('array', JSON.stringify(val));
      // return val;
    });
  }

  const popBooking = async () => {
    if (!contractIsInitialized){
      await onConnect();
    }
    return bookingParkingContract.methods
      .popListArea().send({ from: JSON.parse(window.localStorage.getItem('userAccount'))["account"] })
      .once('receipt', async (receipt) => {
        console.log(receipt);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });

  }

  const booking = async (number, date, hour) => {
    if (!contractIsInitialized){
      await onConnect();
    }
    return bookingParkingContract.methods
      .booking('A'+number.toString(), 5000, 'A'+number.toString(), date, hour).send({ from: JSON.parse(window.localStorage.getItem('userAccount'))["account"], value: 10000000000000000 })
      .once('receipt', async (receipt) => {
        console.log(receipt);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });

  }

  useEffect(() => {
    function checkConnectedWallet() {
      const userData = JSON.parse(localStorage.getItem('userAccount'));
      if (userData != null) {
        setUserInfo(userData);
        setIsConnected(true);
      }
    }

    checkConnectedWallet();
    getBooking();

  }, []);

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      // eslint-disable-next-line
      provider = window.web3.currentProvider;
    } else {
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
    return provider;
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        if (currentProvider !== window.ethereum) {
          console.log(
            'Non-Ethereum browser detected. You should consider trying MetaMask!'
          );
        }
        await currentProvider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const chainId =  await web3.eth.net.getId()// awalnya ini: await web3.eth.getChainId();
        const account = userAccount[0];

        const networkId = await web3.eth.net.getId()
		    const networkData = BookingParking.networks[networkId]
        
        let ethBalance = await web3.eth.getBalance(account); // Get wallet balance
        ethBalance = web3.utils.fromWei(ethBalance, 'ether'); //Convert balance to wei
        saveUserInfo(ethBalance, account, chainId);
        if (userAccount.length === 0) {
          console.log('Please connect to meta mask');
        }

        if (networkData){
          bookingParkingContract = new web3.eth.Contract(BookingParking.abi, networkData.address);
          contractIsInitialized = true;
        }
      }
    } catch (err) {
      console.log(
        'There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.'
      );
    }
  };

  const onDisconnect = () => {
    window.localStorage.removeItem('userAccount');
    setUserInfo({});
    setIsConnected(false);
  };

  const saveUserInfo = (ethBalance, account, chainId) => {
    const userAccount = {
      account: account,
      balance: ethBalance,
      connectionid: chainId,
    };
    window.localStorage.setItem('userAccount', JSON.stringify(userAccount)); //user persisted data
    const userData = JSON.parse(localStorage.getItem('userAccount'));
    setUserInfo(userData);
    setIsConnected(true);
  };
  
  if (isConnected == false){
    return(
      <div className="App">
        <Navbar isConnected={isConnected}/>
        <header className="App-header">
          <div class="columns is-centered pt-10">
            <button
              class="button is-primary"
              onClick={onConnect}>Connect to MetaMask
            </button>
          </div>
        </header>
      </div>
    );
  }

  else if (isConnected == true){
    return(
      <div className="App">
        <Navbar setPage={setPage} isConnected={isConnected} onDisconnect={onDisconnect}/>
        <header className="App-header">
          {page == 1 && <Dashboard popBooking={popBooking} getBooking={getBooking} setPage={setPage}/>}
          {page == 2 && <ChooseSpace setLoading={setLoading} setPage={setPage} booking={booking}/>}
          {page == 3 && <div>
            {loading == true ? <Loading/>:<BookingDetails setPage={setPage}/>}
            </div>}
          {page == 5 && <ListBooking setPage={setPage}/>}
        </header>
      </div>
    );
  }

}

export default App;
