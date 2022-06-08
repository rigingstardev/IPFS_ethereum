import React, {useState,useContext} from 'react';
import {ethers} from 'ethers';
import Uploadfile_abi from './Uploadfile_abi.json';
import { create } from 'ipfs-http-client';
import "../styles/Uploadfiles.css";
import ContactBanner from "../assets/contact_us-banner.jpg";
import { render } from '@testing-library/react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../context/UserContext';

const client = create('https://ipfs.infura.io:5001/api/v0')

const Uploadfiles = () => {
	// deploy simple storage contract and paste deployed contract address here. 
  // This value is local ganache chain
	//let contractAddress = '0xCF31E7c9E7854D7Ecd3F3151a9979BC2a82B4fe3';

	//from metamask wallet address: 0xa4bc3d68212dea1a7eb4a4384280f13cad7a9e14
	//communicating with ethereum smart contract on Blockchain: 0x10edb9e33676921E02dCc6e7873171eAc4334401

	let contractAddress = '0x10edb9e33676921E02dCc6e7873171eAc4334401';

  const [keeptagname, setTagname] = useState('');
	const [obtainpagehash, pagehash] = useState(``)
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	//const [currentContractVal, setCurrentContractVal] = useState(null);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

  const navigate = useNavigate();

  const {getPayment,user,addHashkey} = useContext(UserContext);
	const [resconnecetd, setConnected] = useState(false);

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				setConnected(true);
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, Uploadfile_abi, tempSigner);
		setContract(tempContract);	
	}

	/*const getCurrentVal = async () => {
		let val = await contract.get();
		setCurrentContractVal(val);
	}*/
	
	async function onChange(e) {
    const data = await getPayment(user.email);
    console.log("current_payment_status",data);
    // if(data==false){
		// 	alert("You have to update your preminium");
    //   navigate('/feepayment', {replace: true});
		// 	return;
    // }
		// if(!resconnecetd){
		// 	alert("Please Connect To Metamask....");
		// 	return;
		// }
		//const onChange = (e) => {
		//event.preventDefault();
		const file = e.target.files[0]
		try {
		  const added = await client.add(file)
		  let obtainpagehash = `${added.path}`
		  pagehash(obtainpagehash)
      await addHashkey(user.email,obtainpagehash);
		  console.log('sending ' + obtainpagehash + ' to the contract');
		  contract.set(obtainpagehash);
		} catch (error) {
		  console.log('Error uploading file: ', error)
		}
	}

	return (
    <div className="downloadfiles">
        <div
          className="downloadfilesTop"
          style={{ backgroundImage: `url(${ContactBanner})` }}>
        </div>

        <div class="inner_banner contact-us-banner">
          <div class="black_overlay"></div>
          <img height="250px" alt="" src={ContactBanner} />
          <h3>Upload <span>File</span></h3>
        </div>

        {/*<hr />*/}
        <br/>

        <div className="App">	

          <div class="row">
              <div class="col-sm-3"></div>
              <div class="col-sm-6">
              <button onClick={connectWalletHandler}>{connButtonText}</button>
              {errorMessage}
              </div>
              <div class="col-sm-3"></div>
          </div>
          <br/> 

          <div class="row">
            <div class="col-sm-3"> </div>
            <div class="col-sm-6"> 
                <label><h5>Enter your file tag name:</h5></label>
                <input type="text" class="form-control" required  value={keeptagname} onChange={(e) => setTagname(e.target.value)} />
            </div>
            <div class="col-sm-3"> </div>
          </div>

          <br/>

          <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6">
              {/*<label><h3>Click choose file to select your document:</h3></label>*/}
              
               <input class="form-control form-control-lg" id="formFileLg" type="file" onChange={onChange}/>
              <br /> <br/>
               
            </div>
            <div class="col-sm-3"> </div>
          </div>

          <div class="row">
            <div class="col-sm-3"> </div>
            <div class="col-sm-6"> 
            {/*<h3>Output</h3>
            <div>IPFS Hash Stored on Eth Contract (Pls keep it safe): </div>*/}

          {/* {obtainpagehash.length > 1 ? (
          //"Thanks, You have uploaded your file successfully, click here to make payment"
         // window.location.href = "https://paypal.com"
            //window.location.href = "http://punditsoft.com/reactjs/feepayment"
            navigate('/feepayment', {replace: true})
           ) : (
          "Please, upload your file"
          )} */}

          {/*window.location.href = "https://paypal.com"
           <div class="col-sm-3"><a href="https://paypal.com" type='button' class="filebtn">Pay</a> </div>
          */}
            </div>
            <div class="col-sm-3"> </div>
            
          </div>

          <div class="row">
            <div class="col-sm-3"> </div>
            <div class="col-sm-6"> 
                <label><h6>Your file tag name is: &nbsp; &nbsp;</h6></label>
                {keeptagname}
                <br/>
                <label><h6>Your file Hash key is: &nbsp; &nbsp;</h6></label>
                {obtainpagehash}
                

                
               </div>
            <div class="col-sm-3"> </div>
          </div>

          <br/>
          
		  </div>
      <br/><br/>
		</div>  
  );
}

export default Uploadfiles;