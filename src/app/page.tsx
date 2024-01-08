"use client";
import { Box, Button, Center, Flex, Input, Text, useClipboard } from '@chakra-ui/react'
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react'

export default function Home() {
  const ERROR_MESSAGE = 'An unexpected error occurred.';

  const [urlInput, setUrlInput] = useState<string>('')
  const [height, setHeight] = useState<number>(0)
  const { onCopy, value, setValue } = useClipboard("");

  const isUrlValid = (): boolean => {
    if (!urlInput) {
      enqueueSnackbar('Please enter a URL.', { variant: 'warning' });
      return false;
    }
    
    if (!urlInput.startsWith('http://') && !urlInput.startsWith('https://')) {
      enqueueSnackbar("The URL must contain 'http://' or 'https://' at the beginning.", { variant: 'warning' });
      return false;
    }
    
    if (!urlInput.includes('.')) {
      enqueueSnackbar('Please enter a valid URL.', { variant: 'warning' });
      return false;
    }

    return true;
  }

  const shortenUrl = () => {
    if (!isUrlValid()) {
        return;
    }

    axios.post('/api/shorten', { url: urlInput })
      .then((res) => {
        
        if (res.status === 201) {
          setValue(res.data.url)
          enqueueSnackbar('URL masked.', { variant: 'success' });
        }
      }).catch((err) => {
        if (!err.response) {
            enqueueSnackbar(ERROR_MESSAGE, { variant: 'error' });
            return;
        }

        if (err.response.status === 422) {
          enqueueSnackbar(err.response.data.error, { variant: 'warning' });
        }

        if (err.response.status === 500) {
          enqueueSnackbar(ERROR_MESSAGE, { variant: 'error' });
        }
      });
  }
  
  const copyToClipboard = () => {
    onCopy();
    enqueueSnackbar('Copied to clipboard.', { variant: 'info' });
  }

  useEffect(() => {
    setHeight((document.getElementById('masked-url') as HTMLDivElement).clientHeight)
  }, [value])

  return (
    <>
    <Center h="100vh">
      <Box w={{ base: "90%", sm: "lg" }}>
        <Input 
            variant="outline"
            placeholder="Enter URL here" 
            size='lg'
            bg='white'
            w='100%'
            onChange={(e) => setUrlInput(e.target.value)}
            value={urlInput}
        />
        <Box w={{ base: '100%', sm: 'lg' }}>
          <Flex mt={3} flexDirection={{ base: "column-reverse", sm: "row" }} justifyContent="space-between" w="100%" >
            <Box
                id="masked-url"
                border={"xs"} 
                borderWidth={1} 
                mt={{ base: 3, sm: 0 }} 
                borderRadius="md" 
                flexGrow={1} 
                me={{ base: 0, sm: 3 }} 
            >
              <Center h="100%" px={5} py={3} >
                {   
                    value 
                    ?   <Flex flexDirection={"row"}>
                            <Text color="gray" flexGrow={1}>{value}</Text>
                            <Button size='xs' onClick={() => copyToClipboard()}>
                                <FontAwesomeIcon icon={faClipboard} />
                            </Button>
                        </Flex>
                    : <Text color="gray">Masked URL will appear here</Text>
                }
              </Center>
            </Box>
            <Button size='lg' w={{ base: '100%', sm: 150 }} h={ value ? height + 'px' : 50 } colorScheme="blue" onClick={() => shortenUrl()}>
              <Text fontSize="md">Mask</Text>
            </Button>
          </Flex>
        </Box>
      </Box>
    </Center>
    <SnackbarProvider />
    </>
  )
}
