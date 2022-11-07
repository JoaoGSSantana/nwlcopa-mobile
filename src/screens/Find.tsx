import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { VStack, Heading, useToast } from "native-base";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { api } from "../services/api";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPool() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: "Informe o código",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post("/pools/join", { code });

      toast.show({
        title: "Você entrou no bolão com sucesso",
        placement: "top",
        bgColor: "green.500",
      });

      setIsLoading(false);
      navigate("pools");
    } catch (error) {
      setIsLoading(false);

      if (error.response?.data?.message === "Pool not found.") {
        return toast.show({
          title: "Bolão não encontrado.",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (error.response?.data?.message === "You already join in this pool.") {
        return toast.show({
          title: "Você já está participando do bolão.",
          placement: "top",
          bgColor: "red.500",
        });
      }

      return toast.show({
        title: "Não possível entrar no bolão, tente novamente mais tarde.",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading color="white" fontSize="xl" mb={8} textAlign="center">
          Encontre um bolão através de seu código único
        </Heading>
        <Input
          placeholder="Qual o código do bolão?"
          mb={2}
          onChangeText={setCode}
          value={code}
          autoCapitalize="characters"
        />
        <Button
          title="BUSCAR BOLÃO"
          onPress={handleJoinPool}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
}
