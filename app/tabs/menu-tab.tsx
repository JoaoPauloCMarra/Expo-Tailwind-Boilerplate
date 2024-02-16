import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import TabDemoMenu from '@/modules/demo-tabs/tab-demo-menu';

const SheetTab = () => (
	<ActionSheetProvider>
		<TabDemoMenu />
	</ActionSheetProvider>
);

export default SheetTab;
