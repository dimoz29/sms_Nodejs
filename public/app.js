// app.js

// Function to create and append elements
function createElement(tag, attributes = {}, textContent = '') {
    const element = document.createElement(tag);
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
    element.textContent = textContent;
    return element;
  }
  
  // Create the HTML structure
  document.addEventListener('DOMContentLoaded', () => {
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
  