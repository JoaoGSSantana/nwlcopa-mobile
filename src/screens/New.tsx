import { useState } from "react";
import { VStack, Heading, Text, useToast } from "native-base";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

import Logo from "../assets/logo.svg";

import { api } from "../services/api";

export function New() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  async function handlePoolCreate() {
    if (!title.trim()) {
      return toast.show({
        title: "Por favor, informe um título.",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      setIsLoading(true);

      await api.post("/pools", { title });

      toast.show({
        title: "Bolão criado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possível criar seu bolão, tente novamente mais tarde.",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />
        <Heading color="white" fontSize="xl" my={8} textAlign="center">
          Crie seu próprio bolão da copa {"\n"} e compartilhe entre amigos!
        </Heading>

        <Input
          placeholder="Qual nome do seu bolão?"
          mb={2}
          onChangeText={setTitle}
        />
        <Button
          title="CRIAR MEU BOLÃO"
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />
        <Text color="gray.300" textAlign="center" mt={4}>
          Após criar seu bolão, você receberá um {"\n"}código único que poderá
          usar para convidar {"\n"}outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
