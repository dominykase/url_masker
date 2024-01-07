"use client";
import { Box, Button, Center, Flex, Input, Text, useClipboard } from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react'

export default function Home() {
  const [urlInput, setUrlInput] = useState('')
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  const shortenUrl = () => {
    axios.post('/api/shorten', { url: urlInput })
      .then((res) => {
        setValue(res.data.url)
      })
  }
  
  const copyToClipboard = () => {
    onCopy()
    if (hasCopied) {
        alert('Copied to clipboard!')
    }
  }

  return (
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
                border={"xs"} 
                borderWidth={1} 
                mt={{ base: 3, sm: 0 }} 
                borderRadius="md" 
                flexGrow={1} 
                me={{ base: 0, sm: 3 }} 
                onClick={() => { if (value) copyToClipboard()}}
            >
              <Center h="100%" px={5} py={3} onClick={() => { if (value) copyToClipboard()}}
>
                {   
                    value 
                    ? <Text color="gray" onClick={() => { copyToClipboard()}}>{value}</Text>
                    : <Text color="gray">Masked URL will appear here</Text>
                }
              </Center>
            </Box>
            <Button size='lg' w={{ base: '100%', sm: 150 }} colorScheme="blue" onClick={() => shortenUrl()}>
              <Text fontSize="md">Mask</Text>
            </Button>
          </Flex>
        </Box>
      </Box>
    </Center>
  )
}
