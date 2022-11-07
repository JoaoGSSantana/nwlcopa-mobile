import { Center, Icon, Text } from "native-base";
import { Fontisto } from "@expo/vector-icons";
import { Button } from "../components/Button";

import Logo from "../assets/logo.svg";

import { useAuth } from "../hooks/useAuth";

export function SignIn() {
  const { signIn, isUserLoading } = useAuth();

  return (
    <Center flex={1} bgColor="gray.900" padding={7}>
      <Logo width={212} height={40} />
      <Button
        type="SECONDARY"
        title="ENTRAR COM O GOOGLE"
        leftIcon={<Icon as={Fontisto} name="google" size="sm" color="white" />}
        mt={16}
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{ _spinner: { color: "white" } }}
      />
      <Text color="white" fontSize="sm" mt={4} textAlign="center">
        Não utilizamos nenhuma informação além {"\n"} do seu e-mail para criação
        de sua conta.
      </Text>
    </Center>
  );
}
