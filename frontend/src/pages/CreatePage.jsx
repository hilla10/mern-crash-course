import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const toast = useToast();

  const { name, price, image } = newProduct;
  console.log(newProduct);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const { createProduct } = useProductStore();
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        isClosable: true,
      });
    }
    setNewProduct({ name: '', price: '', image: '' });
  };

  return (
    <Container maxW={'container.sm'}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded={'lg'}
          shadow={'md'}>
          <VStack spacing={4}>
            <Input
              placeholder='Product Name'
              name='name'
              value={name}
              onChange={handleChange}
            />
            <Input
              placeholder='Price'
              name='price'
              value={price}
              onChange={handleChange}
            />
            <Input
              placeholder='Image URL'
              name='image'
              value={image}
              onChange={handleChange}
            />

            <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
