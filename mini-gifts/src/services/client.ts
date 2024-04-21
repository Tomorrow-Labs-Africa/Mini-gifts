import { ethers, providers, Contract } from "ethers";
import { parseEther } from "ethers/lib/utils";

export class CeloService {
  private contractAddress: string;
  private rpcUrl: string;

  private erc20Abi = [
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_spender",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_from",
          type: "address",
        },
        {
          name: "_to",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          name: "",
          type: "uint8",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_to",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
        {
          name: "_spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      payable: true,
      stateMutability: "payable",
      type: "fallback",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
  ];

  constructor({
    contractAddress,
    rpcUrl,
  }: {
    contractAddress: string;
    rpcUrl: string;
  }) {
    this.contractAddress = contractAddress;
    this.rpcUrl = rpcUrl;
  }

  public async getBalance() {
    if (window.ethereum && window.ethereum.isMiniPay) {
      const provider = new providers.Web3Provider(window.ethereum);
      // Get the signer (user's account)
      const signer = await provider.getSigner();
      // Get the user's Ethereum address
      const address = await signer.getAddress();
      // get cUSD balance
      const contract = new ethers.Contract(
        this.contractAddress,
        this.erc20Abi,
        provider
      );
      const balance = await contract.balanceOf(address);
      const decimals = await contract.decimals();
      const cUSDBalance = parseFloat(
        ethers.utils.formatUnits(balance, decimals)
      );
      return cUSDBalance;
    } else {
      console.error("MiniPay provider not detected");
    }
  }
  public async sendCusd(receiverAddress: string) {
    if (window.ethereum && window.ethereum.isMiniPay) {
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();

      let abi = ["function transfer(address to, uint256 value)"];
      const contract = new Contract(this.contractAddress, abi, signer);
      let tx = await contract.transfer(receiverAddress, parseEther("1"));

      let receipt = await tx.wait();

      console.log("Receipt is: ", receipt);
      return receipt;
    } else {
      console.error("MiniPay provider not detected");
    }
  }
}

declare global {
  interface Window {
    ethereum: any;
  }
}
