import { Text as RNText, TextProps } from "react-native";

type Props = TextProps;

const Text = (props: Props) => {
  return (
    <RNText
      {...props}
      style={{
        fontFamily: "Inter_400Regular",
        fontSize: 16,
        fontWeight: "400",
      }}
    />
  );
};

export default Text;
