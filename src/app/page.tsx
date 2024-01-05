"use client";
import { Box, Button, Center, Flex, Input, Text } from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react'

export default function Home() {
  const [returnedUrl, setReturnedUrl] = useState('')
  const [urlInput, setUrlInput] = useState('')

  const shortenUrl = () => {
    axios.post('/api/shorten', { url: urlInput })
      .then((res) => {
        setReturnedUrl(res.data.url)
      })
  }
  
  return (
    <Center h="100vh">
      <Box>
        <Input 
            variant="outline"
            placeholder="Enter URL here" 
            size='lg'
            bg='white'
            w='lg'
            onChange={(e) => setUrlInput(e.target.value)}
            value={urlInput}
        />
        <Box w="lg">
          <Flex mt={3} flexDirection="row" justifyContent="space-between" w="lg">
            <Box border={"xs"} borderWidth={1} borderRadius="md" flexGrow={1} me={3}>
              <Center h="100%" px={5}>
                {returnedUrl ? returnedUrl : <Text color="gray">Shortened URL will appear here</Text>}
              </Center>
            </Box>
            <Button size="lg" colorScheme="blue" onClick={() => shortenUrl()}>
              <Text fontSize="md">Shorten</Text>
            </Button>
          </Flex>
        </Box>
      </Box>
    </Center>
  )
}
