// Initialize Web3.js
const web3 = new Web3(window.ethereum);

// Create a contract instance
const contract = new web3.eth.Contract(abi, contractAddress);

// Function to create and append elements
function createElement(tag, attributes = {}, textContent = '') {
    const element = document.createElement(tag);
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
    element.textContent = textContent;
    return element;
  }
  
// The ABI of the contract
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUsers","outputs":[{"internalType":"address payable[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"recipient","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sendPayment","outputs":[],"stateMutability":"payable","type":"function"}];
const contract = '0xB5364e95BAC807F262744Dedd87BBF5b70504855';

  // Function to update MetaMask UI components
  function updateMetaMaskUI(isConnected) {
    const body = document.body;
    const connectedContainer = document.getElementById('connected-container');
    let connectButton = document.getElementById('connect-button');
  
    if (isConnected) {
      if (!connectedContainer) {
        const newConnectedContainer = createElement('div', { id: 'connected-container' });
        const connectedMessage = createElement('div', { id: 'connected-message' }, 'Connected');
        const metamaskIcon = createElement('img', {
          src: '/metamask-icon.png',
          alt: 'MetaMask Icon',
          id: 'metamask-icon',
        });
        newConnectedContainer.appendChild(connectedMessage);
        newConnectedContainer.appendChild(metamaskIcon);
        body.appendChild(newConnectedContainer);
      }
  
      if (connectButton) {
        body.removeChild(connectButton);
      }
    } else {
      if (connectedContainer) {
        body.removeChild(connectedContainer);
      }
  
      if (!connectButton) {
        connectButton = createElement('button', { id: 'connect-button' }, 'Connect to MetaMask');
        connectButton.onclick = connectMetaMask;
        body.appendChild(connectButton);
      }
    }
  }
  
  // Function to actively check MetaMask status
  async function checkMetaMaskStatus() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const isConnected = accounts.length > 0;
      updateMetaMaskUI(isConnected);
      localStorage.setItem('isMetaMaskConnected', isConnected);
    }
  }
  
// Function to connect to MetaMask
async function connectMetaMask() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      checkMetaMaskStatus();
    } catch (error) {
      if (error.code === 4001) { 
        // User rejected request
        console.error('User denied account access');
      } else {
        console.error(error);
      }
    }

    // Using an event to check MetaMask's status when account changes
    window.ethereum.on('accountsChanged', function (accounts) {
      checkMetaMaskStatus();
    });
  } else {
    alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
  }
}
  
  // Execute when DOM is loaded
  document.addEventListener('DOMContentLoaded', async () => {
    // Combining the logic into one 'DOMContentLoaded' event listener
    const isMetaMaskConnected = localStorage.getItem('isMetaMaskConnected') === 'true' ||
                                (window.ethereum && window.ethereum.selectedAddress);
    updateMetaMaskUI(isMetaMaskConnected);
    
    if (!isMetaMaskConnected) {
      const connectButton = createElement('button', { id: 'connect-button' }, 'Connect to MetaMask');
      connectButton.onclick = connectMetaMask;
      document.body.appendChild(connectButton);
    }
    
    // Initial check for MetaMask status when the page is loaded
    checkMetaMaskStatus();
  
    // Clear form fields
    const recipientInputField = document.querySelector('[name="recipient_number"]');
    const messageTextareaField = document.querySelector('[name="message_text"]');
    
    if (recipientInputField && messageTextareaField) {
      recipientInputField.value = '';
      messageTextareaField.value = '';
    }
  
    // Head section
    const head = document.head;
    head.innerHTML = `
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Blockchain Guild SMS</title>
      <link rel="stylesheet" href="app.css">
      <link rel="icon" href="/favicon2.png" type="image/x-icon">
    `;
  
    // Body section
    const body = document.body;
  
    // Eth Logo Container
    const ethLogoContainer = createElement('div', { class: 'eth-logo-container' });
    const ethLink = createElement('a', {
      href: 'https://sepolia.etherscan.io/address/0xb5364e95bac807f262744dedd87bbf5b70504855',
      target: '_blank',
      rel: 'noopener noreferrer',
    });
    const ethLogo = createElement('img', {
      src: '/ethJstransparent.png',
      alt: 'Ethereum',
      class: 'eth-logo',
    });
    ethLink.appendChild(ethLogo);
    ethLogoContainer.appendChild(ethLink);
  
    // Container
    const container = createElement('div', { class: 'container' });
    const h1 = createElement('h1', {}, 'Blockchain SMS Sender');
    const form = createElement('form', { method: 'POST', action: '/send-sms' });
    const recipientLabel = createElement('label', { for: 'recipient_number' }, 'Recipient Number:');
    const recipientInput = createElement('input', { type: 'text', name: 'recipient_number', required: true });
    const messageLabel = createElement('label', { for: 'message_text' }, 'Message Text:');
    const messageTextarea = createElement('textarea', { name: 'message_text', rows: '4', required: true });
    const submitButton = createElement('input', { type: 'submit', value: 'Send Message' });
  
    form.appendChild(recipientLabel);
    form.appendChild(recipientInput);
    form.appendChild(messageLabel);
    form.appendChild(messageTextarea);
    form.appendChild(submitButton);
    container.appendChild(h1);
    container.appendChild(form);
  
    // Logo Container
    const logoContainer = createElement('div', { class: 'logo-container' });
    const tdiLogo = createElement('img', { src: '/tdilog.png', alt: 'TDI Logo', class: 'tdi-logo' });
    logoContainer.appendChild(tdiLogo);
  
    // About Us Section
    const aboutUs = createElement('div', { class: 'about-us' });
    const h2 = createElement('h2', {}, 'About Us');
    const p = createElement('p');
    aboutUs.appendChild(h2);
    aboutUs.appendChild(p);
  
    // Append elements to the body
    body.appendChild(ethLogoContainer);
    body.appendChild(container);
    body.appendChild(logoContainer);
    body.appendChild(aboutUs);

// Import the validator library
const validator = require('validator');

// Handle form submission
const form = document.querySelector('form');
form.onsubmit = async (event) => {
  event.preventDefault();

    // Get user inputs
  const recipientNumber = document.querySelector('[name="recipient_number"]').value;
  const messageText = document.querySelector('[name="message_text"]').value;

  // Validate user inputs
  if (!validator.isMobilePhone(recipientNumber)) {
    alert('Invalid recipient number');
    return;
  }
  if (validator.isEmpty(messageText)) {
    alert('Message text cannot be empty');
    return;
  }

  // Sanitize user inputs
  const sanitizedRecipientNumber = validator.escape(recipientNumber);
  const sanitizedMessageText = validator.escape(messageText);


  // Ensure MetaMask is connected
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  try { 
    // Here you can call the contract method you want to interact with
    // Replace sendPayment with your contract's method and arguments
    await contract.methods.sendPayment().send({ from: accounts, value: web3.utils.toWei('0.01', 'ether') });
    alert('Transaction Successful!');
    // Call getUsers method
    const users = await contract.methods.getUsers().call({ from: account });
    console.log(users); // Log the users for now, handle as needed
  } catch (error) {
    alert('Transaction Failed: ' + error.message);
  }
};

  });
  