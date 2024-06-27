import { ExtensionSDK } from '@looker/extension-sdk';
import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Fieldset,
  Flex,
  FlexItem,
  Form,
  Heading,
  InputControl,
  InputChangeEventArgs,
  TextArea,
  useTheme,
} from '@looker/components';
import React, { useCallback, useState } from 'react';

const MyComponent = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges()) { // Replace with your logic
        event.preventDefault(); // Prevent immediate navigation
        event.returnValue = ''; // Chrome requires this
        return ''; // For other browsers
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      // Replace with your actual Cloud Function URL
      const response = await fetch('https://us-central1-best-hack-427512.cloudfunctions.net/get_lookml', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: userInput }),
      });

      const data = await response.json();
      setResponseMessage(data.message || 'Success!');
    } catch (error) {
      setResponseMessage(`Error: ${error}`);
    }
  }, [userInput]);

  const { colors } = useTheme();

  return (
    <Box padding="medium">
      <Heading>My Looker Extension</Heading>
      <Form onSubmit={handleSubmit}>
        <Fieldset>
          <Flex direction="column" gap="small">
            <TextArea
              width="100%"
              label="Enter Input"
              value={userInput}
              onChange={handleChange}
            />
            <Button type="submit" color={colors.primary}>
              Send to Cloud Function
            </Button>
          </Flex>
        </Fieldset>
      </Form>
      {responseMessage && (
        <FlexItem marginTop="large">
          <Box padding="medium" backgroundColor="#eee">
            {responseMessage}
          </Box>
        </FlexItem>
      )}
    </Box>
  );
};

export default MyExtension;
