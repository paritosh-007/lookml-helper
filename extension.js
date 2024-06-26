
import { LookerExtensionSDK } from '@looker/extension-sdk';

const sdk = LookerExtensionSDK.create();

sdk.init()
  .then(() => {
    // Create input field for dashboard ID
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Enter Dashboard ID';
    document.body.appendChild(inputField);

    // Create button to send request
    const button = document.createElement('button');
    button.textContent = 'Send to GCF';
    document.body.appendChild(button);

    // Function to send data to GCF
    const sendDataToGCF = async (dashboardId) => {
      try {
        const response = await fetch(sdk.manifest.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ dashboardId })
        });

        const result = await response.json();
        console.log('Response from GCF:', result);
        // Handle the response from GCF as needed (e.g., display a message)
      } catch (error) {
        console.error('Error sending data to GCF:', error);
      }
    };

    // Event listener for button click
    button.addEventListener('click', () => {
      const dashboardId = inputField.value;
      if (dashboardId) {
        sendDataToGCF(dashboardId);
      } else {
        alert('Please enter a Dashboard ID');
      }
    });

  })
  .catch(error => {
    console.error('Error initializing SDK:', error);
  });
