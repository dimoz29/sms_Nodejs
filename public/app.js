// Function to create and append elements
function createElement(tag, attributes = {}, textContent = '') {
  const element = document.createElement(tag);
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  element.textContent = textContent;
  return element;
}

// Function to connect to MetaMask
async function connectMetaMask() {
  const body = document.body;

  // Check if MetaMask is already connected
  if (window.ethereum && window.ethereum.selectedAddress) {
    // If already connected, display the "Connected" message and the MetaMask icon
    const connectedContainer = createElement('div', { id: 'connected-container' });
    const connectedMessage = createElement('div', { id: 'connected-message' }, 'Connected');
    const metamaskIcon = createElement('img', {
      src: '/metamask-icon.png',
      alt: 'MetaMask Icon',
      id: 'metamask-icon',
    });
    connectedContainer.appendChild(connectedMessage);
    connectedContainer.appendChild(metamaskIcon);
    body.appendChild(connectedContainer);
    localStorage.setItem('isMetaMaskConnected', 'true'); // Store the connection state
    return; // Stop further execution
  }

  // If not connected, create the "Connect to MetaMask" button
  const connectButton = createElement('button', { id: 'connect-button' }, 'Connect to MetaMask');
  body.appendChild(connectButton);

  // Add an event listener to the connect button
  connectButton.addEventListener('click', async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected to MetaMask');
        // Replace the button with a "Connected" message and the MetaMask icon
        body.removeChild(connectButton);
        const connectedContainer = createElement('div', { id: 'connected-container' });
        const connectedMessage = createElement('div', { id: 'connected-message' }, 'Connected');
        const metamaskIcon = createElement('img', {
          src: '/metamask-icon.png',
          alt: 'MetaMask Icon',
          id: 'metamask-icon',
        });
        connectedContainer.appendChild(connectedMessage);
        connectedContainer.appendChild(metamaskIcon);
        body.appendChild(connectedContainer);
        localStorage.setItem('isMetaMaskConnected', 'true'); // Store the connection state
        // You can perform additional actions here after connecting
      } catch (error) {
        console.error('User denied account access to MetaMask');
      }
    } else {
      alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    }
  });

  // Check if MetaMask is locked (on page load)
  const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  if (accounts.length === 0) {
    // If locked, clear the "Connected" message and MetaMask icon
    body.removeChild(connectButton);
    localStorage.removeItem('isMetaMaskConnected');
  }
}

// Create the HTML structure
document.addEventListener('DOMContentLoaded', () => {
  // Check if MetaMask is already connected (on page load)
  const isMetaMaskConnected = localStorage.getItem('isMetaMaskConnected');
  if (isMetaMaskConnected === 'true') {
    // If already connected, display the "Connected" message and the MetaMask icon
    const connectedContainer = createElement('div', { id: 'connected-container' });
    const connectedMessage = createElement('div', { id: 'connected-message' }, 'Connected');
    const metamaskIcon = createElement('img', {
      src: '/metamask-icon.png',
      alt: 'MetaMask Icon',
      id: 'metamask-icon',
    });
    connectedContainer.appendChild(connectedMessage);
    connectedContainer.appendChild(metamaskIcon);
    document.body.appendChild(connectedContainer);
  } else {
    // Connect to MetaMask (if not already connected)
    connectMetaMask();
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
});
