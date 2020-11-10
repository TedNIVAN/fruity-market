import { withdrawFruit } from './device'
import { amountToPay } from './modal'

// Change this to use your own infura ID
const web3 = new Web3(`wss://kovan.infura.io/ws/v3/${process.env.APIKEY}`);

// AggregatorV3Interface ABI
const aggregatorV3InterfaceABI =
    [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "Received",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "getLatestPrice",
            "outputs": [
                {
                    "internalType": "int256",
                    "name": "",
                    "type": "int256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ]

// Price Feed Address
const addr = "0xC8f872aEe06663b900c067Dfd3D87813e6A4F72A";
document.getElementById("address").innerText = addr;

// Set up contract instance
const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);

export let ethPrice;

export function web3entryComponent() {
    //Make call to latestRoundData()
    priceFeed.methods.getLatestPrice().call()
        .then((price) => {
            // Do something with roundData
            ethPrice = price / 1.e8;
            console.log("Ethereum Price: ", price / 1.e8)
        });

    priceFeed.events.Received((error, event) => {
        if (event) {
            let receivedAmount = event.returnValues[1];
            console.log(receivedAmount);
            console.log(amountToPay * 1e18);
            if (receivedAmount >= amountToPay * 1e18) {
                withdrawFruit('H');
                document.getElementsByClassName("modal-card-body")[0].innerHTML = `
        <center>
        <div class="columns is-vcentered has-background-primary">
            <div class="column">
                <strong class="has-text-black">
                Payment Succeeded
                </strong>
                <br>
            </div>
        </div>
        <div class="columns is-vcentered">
            <div class="column">
                <figure class="image is-128x128">
                <img src="basket.png" alt="">
                </figure>
            </div>
        </div>
        <div class="columns is-vcentered has-background-info-light">
            <div class="column">
               <strong class="has-text-black">You can now withdraw your purchase</strong> 
            </div>
        </div>

    </center>
        `;
            } else {
                document.getElementsByClassName("modal-card-body")[0].innerHTML = `
        <center>
        <div class="columns is-vcentered has-background-danger">
            <div class="column">
                <strong class="has-text-black">
                Failed to proceed: Insufficient funds sent
                </strong>
                <br>
            </div>
        </div>
        <div class="columns is-vcentered">
            <div class="column">
                <figure class="image is-128x128">
                <img src="cashier.png" alt="">
                </figure>
            </div>
        </div>
        <div class="columns is-vcentered has-background-info-light">
            <div class="column">
               <strong class="has-text-black">Please remake your purchase</strong> 
            </div>
        </div>

    </center>
        `;
            }
        }
    });
}