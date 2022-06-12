import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Prenoms from '../artifacts/contracts/Prenoms.sol/Prenoms.json';
import WalletBalance from './Ballance';


const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

const provider = new ethers.providers.Web3Provider(window.ethereum as any);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, Prenoms.abi, signer);

function Entry(props: { tokenId: number, getCount: () => Promise<void> }) {
  const isMinted = true;
  const tokenId = 1;
  const imageURI = "src/logo.svg";
  const mintToken = () => { };
  const getURI = () => { };

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" src={isMinted ? imageURI : 'src/logo.svg'}></img>
      <div className="card-body">
        <h5 className="card-title">ID #{tokenId}</h5>
        {!isMinted ? (
          <button className="btn btn-primary" onClick={mintToken}>
            Mint
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={getURI}>
            Taken! Show URI
          </button>
        )}
      </div>
    </div>
  );
}

function Home() {

  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };

  return (
    <div>
      <div className="container text-center">
        <WalletBalance />
        <h1 className="container text-center">This is a text</h1>
      </div>

      <div className="container">
        <div className="row">
          {Array(totalMinted + 1)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="col-sm">
                <Entry tokenId={i} getCount={getCount} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
