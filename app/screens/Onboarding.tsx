import Input from "@/components/input";
import Text from "@/components/text";
import { vars } from "nativewind";
import { TextInput, View } from "react-native";

const Onboarding = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-primary text-2xl">Onboarding</Text>
      <View className="size-32 bg-secondary mt-2" />
      <View className="w-full">
        <Input
          keyboardType="numeric"
          returnKeyType="done"
        />
      </View>
    </View>
  );
};

export default Onboarding;
