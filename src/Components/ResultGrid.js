import React from 'react';
import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  VStack,
  Spinner,
} from '@chakra-ui/react';

function DisplayResult({ result, showSpinner }) {
  return (
    <>
      {result.Results ? (
        (<SimpleGrid
          overscrollBehaviorY={'contain'}
          columns={[1, 2, 2, 3, 5]} spacing={10}>
          {result.Results.map((data, idx) => (
            <Box
              key={idx}
              boxShadow={'dark-lg'}
              borderColor={'#6752ac'}
              borderWidth={'10px'}
              borderRadius={'3px'}
              bg="#271F41"
              color={'purple.50'}
              height="280px"
            >
              <VStack>
                <Heading
                  color={'purple.300'}
                  textAlign={'center'}
                  mt={3}
                  size={'lg'}
                >
                  {data.Make_Name}
                </Heading>
                <Heading textAlign={'center'} mt={3} size={'md'}>
                  Model Name : {data.Model_Name}
                </Heading>
                <Heading textAlign={'center'} mt={3} size={'md'}>
                  Model ID : {data.Model_ID}
                </Heading>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>)
      ) : (
        showSpinner ? (
          <Center>
            <Spinner
              thickness="10px"
              speed="0.65s"
              color="purple.500"
              size="xl"
            />
          </Center>
        ) : <Box />

      )}
    </>
  );
}

export default DisplayResult;
