import { useEffect, useState } from 'react';
import { Contract, ethers } from 'ethers';
import './App.css';

const greeterAddress = '0xdbfAd735332C35c730957229634D103Bb46d5815';
const greeterABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'updatedGreeting',
        type: 'string',
      },
    ],
    name: 'Change',
    type: 'event',
  },
  {
    inputs: [],
    name: 'getGreeting',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_newGreeting',
        type: 'string',
      },
    ],
    name: 'setGreeting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

function App() {
  const [provider, setProvider] = useState();
  const [greeter, setGreeter] = useState();
  const [greeting, setGreeting] = useState();
  const [greetingInputValue, setGreetingInputValue] = useState('');

  useEffect(() => {
    const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(ethProvider);
  }, []);

  useEffect(() => {
    if (!provider) return;

    const greeterContract = new Contract(greeterAddress, greeterABI, provider);
    setGreeter(greeterContract);
  }, [provider]);

  useEffect(() => {
    if (!greeter) return;

    const fetchGreeting = async () => {
      const fetchedGreeting = await greeter.getGreeting();
      setGreeting(fetchedGreeting);
    };

    fetchGreeting();
  }, [greeter]);

  useEffect(() => {
    if (!greeter) return;

    greeter.on('Change', (newGreeting) => {
      setGreeting(newGreeting);
    });
  }, [greeter]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const signer = provider.getSigner();
    await greeter.connect(signer).setGreeting(greetingInputValue);
    setGreetingInputValue('');
  };

  if (!greeter) return <p>Loading...</p>;

  return (
    <div className='App'>
      {greeting}
      <form onSubmit={submitHandler}>
        <input
          name='greeting'
          value={greetingInputValue}
          onChange={(e) => setGreetingInputValue(e.target.value)}
        />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default App;
