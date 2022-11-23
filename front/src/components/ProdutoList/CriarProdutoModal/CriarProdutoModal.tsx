import { Box, Button, Grid, Modal, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { createProduto } from '../../../services/produtos';

interface CriarProdutoModalProps {
  opened: boolean;
  onClose: () => void;
  updateList: () => void;
}

export function CriarProdutoModal({
  opened,
  onClose,
  updateList,
}: CriarProdutoModalProps) {
  const form = useForm({
    initialValues: {
      descricao: '',
      preco: '',
      quantidade: '',
    },
  });

  const handleSubmit = (values: {
    descricao: string;
    preco: string;
    quantidade: string;
  }) => {
    const body = {
    descricao: values.descricao,
    estoque: parseInt(values.quantidade),
    preco: parseFloat(values.preco) 
  }
    createProduto(body)
      .then(() => {
        showNotification({
          color: 'green',
          title: 'Sucesso',
          message: 'Produto cadastrado com sucesso',
        });
        updateList();
        onClose();
      })
      .catch((err: { response: { data: { message: any; }; }; }) => {
        showNotification({
          color: 'red',
          title: 'Erro',
          message: err.response.data.message,
        });
        onClose();
      });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Adicionar Produto"
      size="md"
      padding="lg"
      centered
    >
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
        })}
      >
        <Grid grow gutter="xl" mt="lg" mb="lg">
          <Grid.Col span={12}>
            <TextInput
              label="Descrição"
              placeholder="Descrição"
              mb="md"
              required
              {...form.getInputProps('descricao')}
            />
            <TextInput
              label="Preço"
              placeholder="Preço"
              mb="md"
              required
              {...form.getInputProps('preco')}
            />
            <TextInput
              label="Quantidade"
              placeholder="Quantidade"
              mb="md"
              {...form.getInputProps('quantidade')}
            />
          </Grid.Col>
        </Grid>
        <Box style={{ display: 'flex', justifyContent: 'end', gap: '1rem' }}>
          <Button
            onClick={onClose}
            color="red"
            size="md"
            variant="subtle"
            pl="xl"
            pr="xl"
          >
            Cancelar
          </Button>
          <Button type="submit" color="blue" size="md" pl="xl" pr="xl">
            Salvar
          </Button>
        </Box>
      </form>
    </Modal>
  );
}
