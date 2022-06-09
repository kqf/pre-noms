

import { useState } from 'react';
import { ethers } from 'ethers';
import { getShebang } from 'typescript';

function WalletBalance() {

    const [balance, setBalance] = useState();
    let getBalance = () => {
        return 1;
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Your Balance: {balance}</h5>
                <button className="btn btn-success" onClick={() => getBalance()}>Show My Balance</button>
            </div>
        </div>
    );
};

export default WalletBalance;
