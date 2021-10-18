import React, { useState } from 'react';
import {
  Box,
  Text,
  Center,
  Button,
  Heading,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  HStack,
  Input,
  TabList,
  useToast,
} from '@chakra-ui/react';

import { BsFillCalendar2DateFill } from 'react-icons/bs';
import axios from 'axios';

import DisplayResult from './ResultGrid';

function Form() {
  const VEHICLE_API = 'https://vpic.nhtsa.dot.gov/api/';

  const [result, setResult] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [dataFound, setDataFound] = useState(true);
  const [carType, setCarType] = useState('');
  const [modelYear, setModelYear] = useState(undefined);
  const [modelMake, setModelMake] = useState('');
  const [status, setStatus] = useState('');

  const toast = useToast();

  const showToast = (desc) => {
    toast({
      variant: 'subtle',
      description: desc,
      status: 'warning',
      isClosable: true,
      position: 'top',
    });
  }

  const validateInput = (tabIndex) => {
    if (tabIndex == 1) {
      if (carType == '') {
        showToast('Please enter Car Type to fetch the data from API');
        return false;
      } else {
        return true;
      }
    } else {
      if (isNaN(modelYear) == true || modelMake == '') {
        showToast('Please enter Model Year and Model Make to fetch the data from API');
        return false;
      }
      return true;
    }
  }

  const filterByCarType = async () => {
    if (validateInput(1) === true) {
      setShowSpinner(true);
      const response = await axios.get(
        VEHICLE_API + `/vehicles/GetModelsForMake/${carType}?format=json`
      );
      if (response.data.Count <= 0) {
        setDataFound(false);
        setStatus('No Data Found');
      } else {
        setResult(response.data);
      }
    }
  };

  const filterByCarMakeYear = async () => {
    if (validateInput(2) === true) {
      setShowSpinner(true);
      const response = await axios.get(
        VEHICLE_API + `//vehicles/GetModelsForMakeYear/make/${modelMake}/modelyear/${modelYear}?format=json`
      );

      if (response.data.Count <= 0) {
        setDataFound(false);
        setStatus('No Data Found');
      } else {
        setResult(response.data);
      }
    }
  }

  const resetControls = () => {
    setStatus('');
    setShowSpinner(false);
    setCarType('');
    setModelMake('');
    setResult([]);
  }

  return (
    <>
      <Tabs
        mt={8}
        onChange={() => { resetControls(); }}
        size={'md'}
        colorScheme={'purple'}
        variant={'soft-rounded'}
      >
        <Center>
          <TabList
            mr={0} color={'purple.400'}>
            <Tab
              pr={[3, 10]} pl={[3, 10]}>
              <Heading size={'lg'}> Type </Heading>
            </Tab>
            <Tab
              pr={[3, 10]} pl={[3, 10]}>
              <Heading size={'lg'}> Make & Year </Heading>
            </Tab>
          </TabList>
        </Center>

        <Center>
          <TabPanels>
            <TabPanel >
              <Center>
                <Box>
                  <HStack wrap={'wrap'} align={'stretch'} spacing={6}>
                    <Input
                      pl={3}
                      mb={4}
                      w={['80vw', '37vw']}
                      value={carType}
                      onChange={e => {
                        setCarType(e.target.value);
                      }}
                      h={'2.4vh'}
                      variant='flushed'
                      borderColor={'purple.500'}
                      borderWidth={'2px'}
                      size={'lg'}
                    />
                    <Button
                      onClick={filterByCarType}
                      ml={0}
                      w={['62vw', '19vw']}
                      mt={'12'}
                      size={'lg'}
                      h={'2.4vh'}
                      variant={'solid'}
                      colorScheme={'purple'}
                    >
                      Filter
                    </Button>
                  </HStack>
                </Box>
              </Center>
            </TabPanel>

            <TabPanel>
              <Center>
                <Box>
                  <Heading color='purple.500' mb={2} size='lg'> Model Make : </Heading>
                  <Input
                    pl={3}
                    mb={4}
                    w={['80vw', '47vw']}
                    variant='flushed'
                    value={modelMake}
                    onChange={e => {
                      setModelMake(e.target.value);
                    }}
                    h={'2.4vh'}
                    borderColor={'purple.500'}
                    borderWidth={'2px'}
                    size={'lg'}
                  />
                  <HStack>
                    <Heading color='purple.500' size='lg'> Model Year : </Heading>
                    <Text as='u' fontSize='3xl' color='purple.800'> {modelYear} </Text>
                  </HStack>
                  <Slider size={'lg'} aria-label="slider-ex-5" min={1920} max={2021} step={1} onChangeEnd={(val) => setModelYear(val)}>
                    <SliderTrack h={'0.3vh'} w={'50vw'} bg='purple.100'>
                      <SliderFilledTrack bgColor='purple.400' color='purple.200' />
                    </SliderTrack>
                    <SliderThumb borderRadius={32} borderColor='purple.500' borderWidth={4} color='purple.500' bgColor='purple.100' boxSize={10}>
                      <Box color="purple" as={BsFillCalendar2DateFill} />
                    </SliderThumb>
                  </Slider>
                  <Center>
                    <Button
                      onClick={filterByCarMakeYear}
                      ml={0}
                      w={['62vw', '69%']}
                      mt={'12'}
                      size={'lg'}
                      h={'2.4vh'}
                      variant={'solid'}
                      colorScheme={'purple'}
                    >
                      Filter
                    </Button>
                  </Center>
                </Box>
              </Center>
            </TabPanel>
          </TabPanels>
        </Center>
      </Tabs>
      <Box>
        <Box
          pb={2}
          pt={2}
          h={'85vh'}
          overflowX={'hidden'}
          overscroll={'none'}
          mr={0}
          ml={0}
          pr={4}
          pl={4}
          mt={6}
          mb={6}
          pb={6}
          pt={6}
        >
          {
            dataFound ? (
              <DisplayResult showSpinner={showSpinner} result={result} />
            ) : (
              <Center>
                <Heading color='purple.300' size={'lg'} >
                  {status}
                </Heading>
              </Center>)
          }
        </Box>
      </Box>
    </>

  );
}

export default Form;
