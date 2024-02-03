import { ErrorBoundaryProps } from "expo-router";
import { Text, View } from "react-native";

const ErrorBoundary = (props: ErrorBoundaryProps) => {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text>{props.error.message}</Text>
      <Text onPress={props.retry}>Try Again?</Text>
    </View>
  );
};

export default ErrorBoundary;
