import WalletBalance from './Ballance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import Prenoms from '../artifacts/contracts/Prenoms.sol/Prenoms.json';

const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

const provider = new ethers.providers.Web3Provider(window.ethereum as any);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, Prenoms.abi, signer);

function Entry(props: { tokenId: number, getCount: () => Promise<void>}){
  return <div></div>
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
      <WalletBalance />

      <h1>This is a text</h1>
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
