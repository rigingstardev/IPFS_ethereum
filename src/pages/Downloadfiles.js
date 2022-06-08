import { useState ,useContext,useEffect} from 'react';
import * as React from 'react';
import ContactBanner from "../assets/contact_us-banner.jpg";
import "../styles/Downloadfiles.css";
import { MDBDataTableV5 } from 'mdbreact';
import {UserContext} from '../context/UserContext';
//import { Container, Button, Form } from 'react-bootstrap';
import { PayPalScriptProvider, PayPalButtons,BraintreePayPalButtons } from "@paypal/react-paypal-js";

const Downloadfiles=()=> {
  const [keephash, setHash] = useState('');
  const onSubmit = async (event) => {
    //alert(keephash);
    if(!keephash){
      alert("Please enter hash key for the document to download!");
      return;
    }
    event.preventDefault();
    window.location.href = "https://ipfs.io/ipfs/"+keephash;
  };
  const {getHashKeys,user} = useContext(UserContext);
  const [datatable, setDatatable] = React.useState({});
  const [Data,setData] = useState([]);

  let deletePost = (postId) => {
    if(Data[postId]['payment']==0){
      console.log("outpayed")
      return ;
    }
    console.log(Data[postId]['hashkey'],postId);
    window.open(Data[postId]['hashkey'],"_blank");
  };
  useEffect(async()=>{
    await Data.map((item, index) => {
      item.action = (
        item.payment==1?
        (        
        <div style={{ display: "flex", justifyContent: "space-between"}}>
          <div
            className="uil-trash-alt"
            style={{
              cursor: "pointer",
              color: "white",
              backgroundColor:"green",
              fontSize: ".9em",
              padding: ".5rem",
              borderRadius: ".3rem",
              width:100,
              textAlign: "center",
            }}
            onClick={() => deletePost(index)}
          >
            Download
          </div>
        </div>)
        :(
        <div style={{ display: "flex", justifyContent: "space-between"}}>
        <div
          className="uil-trash-alt"
          style={{
            cursor: "pointer",
            color: "white",
            backgroundColor:"blue",
            fontSize: ".9em",
            width:100,
            padding: ".5rem",
            borderRadius: ".3rem",
            textAlign: "center",
          }}
          onClick={() => deletePost(index)}
        >
          Pay
        </div>
      </div>)
      );
    });
    const rlt = {
    columns: [
        {
            label: 'Name',
            field: 'name',
            width: 150,
            attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Name',
            },
        },
        {
            label: 'HASHKEY',
            field: 'hashkey',
            width: 200,
        },
        {
            label: 'Action',
            field: 'action',
            sort: 'disabled',
            width: 150,
        },
        ],
        rows: Data,
    }
    setDatatable(rlt);  
  },[Data])

  useEffect(async () => {
      const data = await getHashKeys(user.email);
      await data.map((item)=>{
        item['hashkey']="https://ipfs.io/ipfs/"+item['hashkey'];
      });
      setData(data);
  }, []);

  return (
    <div className="downloadfiles">
      <div
        className="downloadfilesTop"
        style={{ backgroundImage: `url(${ContactBanner})` }}
      ></div>

      {/*<h2>File <span>Processing</span></h2>*/}

      <div class="inner_banner contact-us-banner">
        <div class="black_overlay"></div>
        <img height="250px" alt="" src={ContactBanner} />
        <h3>Download <span>File</span></h3>
      </div>
  
      <div className="rcontainer">
             <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />
        </div>
        <PayPalScriptProvider
            options={{
                "client-id": "test",
                "data-client-token": "abc123xyz==",
            }}
        >
            <BraintreePayPalButtons
                createOrder={(data, actions) => {
                    return actions.braintree.createPayment({
                        flow: "checkout",
                        amount: "10.0",
                        currency: "USD",
                        intent: "capture",
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.braintree
                        .tokenizePayment(data)
                        .then((payload) => {
                            // call server-side endpoint to finish the sale
                        });
                }}
            />
        </PayPalScriptProvider>        
      {/* <div class="row">
      <div class="col-sm-3"> </div>
      <div class="col-sm-6">
        <Form onSubmit={onSubmit}>
        <label><h4><b>Enter your retrieval code:</b></h4></label>
         <input type="text" class="form-control" id="uname" name="uname" required  value={keephash} onChange={(e) => setHash(e.target.value)} />
        <div class="col-sm-3"> <Button id="whiteButton" type='submit'>Submit</Button> </div>
        <br /> <br /> <br /> <br />
        </Form>
      </div>
      </div> */}
    </div>
  );
}

export default Downloadfiles;
