import React from 'react';
import { ChakraProvider, Box, Center, Heading } from '@chakra-ui/react';

import Form from './Components/Form.js';
import theme from './theme';

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Box
          bgColor="purple.50"
          position="fixed"
          overflow="hidden"
          borderWidth={[10, 20]}
          borderColor="#271F41"
          maxH={'100%'}
          maxW={'100%'}
          w={['100%', '100%']}
          h={['100%', '100%']}
        >
          <Center>
            <Box pt={10} fontSize="xl">
              <Heading
                bgClip={'text'}
                bgGradient="linear-gradient( 64.5deg,  rgba(245,116,185,1) 14.7%, rgba(89,97,223,1) 88.7% )"
                size={'4xl'}
                textAlign={'center'}
              >
                NHTSA Vehicle API
              </Heading>
              <Form />
            </Box>
          </Center>
        </Box>
      </ChakraProvider>
    </>
  );
}

export default App;
