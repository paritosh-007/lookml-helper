import { LookerExtensionSDK } from '@looker/extension-sdk';

const sdk = LookerExtensionSDK.create();

sdk.init()
  .then(() => {
    // Function to send data to GCF
    const sendDataToGCF = async (data) => {
      try {
        const response = await fetch(sdk.manifest.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' // Corrected line
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('Response from GCF:', result);
        // Handle the response from GCF as needed
      } catch (error) {
        console.error('Error sending data to GCF:', error);
      }
    };

    // ... rest of your code (example button, etc.) ...

  })
  .catch(error => {
    console.error('Error initializing SDK:', error);
  });
