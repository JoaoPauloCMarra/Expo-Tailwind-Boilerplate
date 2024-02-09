import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import TabDemoSheetScreen from '@/modules/demo-sheet-and-tabs/tab-demo-sheet';

const SheetTab = () => {
	return (
		<ActionSheetProvider>
			<TabDemoSheetScreen />
		</ActionSheetProvider>
	);
};

export default SheetTab;
