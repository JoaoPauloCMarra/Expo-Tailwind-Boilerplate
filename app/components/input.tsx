import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  TextInputProps,
} from "react-native";
import { cn } from "../lib/utils";
import { useState } from "react";

type UseInputProps = {
  keyboardType?: TextInputProps["keyboardType"];
  defaultValue?: string;
};

const useInput = ({
  defaultValue = "",
  keyboardType = "default",
}: UseInputProps) => {
  const [value, setValue] = useState(defaultValue);

  const onChangeText: (text: string) => void = (text) => {
    if (
      [
        "numeric",
        "number-pad",
        "numbers-and-punctuation",
        "phone-pad",
        "decimal-pad",
      ].includes(keyboardType)
    ) {
      if (isNaN(Number(text.replace(/,/g, "")))) return;
    }

    setValue(text);
  };

  return { value, onChangeText };
};

const Input = (props: TextInputProps) => {
  const { className, defaultValue, keyboardType } = props;
  const { value, onChangeText } = useInput({ defaultValue, keyboardType });

  return (
    <TextInput
      {...props}
      className={cn(
        "border border-primary mt-2 rounded-lg px-2 py-1 w-full h-8",
        className
      )}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default Input;
