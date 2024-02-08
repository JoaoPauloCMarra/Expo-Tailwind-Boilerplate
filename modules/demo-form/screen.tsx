import { useState } from 'react';
import { Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';
import * as z from 'zod';
import Button from '@/components/button';
import Input from '@/components/input';
import KeyboardAvoidContainer from '@/components/keyboard-avoid-container';
import PageContainer from '@/components/page-container';
import Text from '@/components/text';

const schema = z.object({
	firstName: z.string(),
	lastName: z.string()
});
type Schema = z.infer<typeof schema>;

const DemoForm = () => {
	const [submitData, setSubmitData] = useState<Schema | null>(null);
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<Schema>({
		defaultValues: {
			firstName: '',
			lastName: ''
		}
	});
	const onSubmit = (data: Schema) => {
		setSubmitData(data);
	};

	return (
		<KeyboardAvoidContainer>
			<PageContainer>
				<View className="mx-auto w-full flex-1 items-center justify-center px-8">
					<Text className="mb-4 text-2xl font-bold">Demo Form</Text>
					<Link href="/" asChild>
						<Button variant="outline" size="lg">
							Go to the Home Screen
						</Button>
					</Link>
				</View>
				<View className="mx-auto w-full max-w-sm flex-1 gap-4">
					<Controller
						control={control}
						rules={{
							required: true
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								placeholder="First name"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
							/>
						)}
						name="firstName"
					/>
					{errors.firstName && <Text>This is required.</Text>}

					<Controller
						control={control}
						rules={{
							maxLength: 100
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								placeholder="Last name"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
							/>
						)}
						name="lastName"
					/>

					<Button onPress={handleSubmit(onSubmit)} variant="successful">
						Submit
					</Button>

					{submitData?.firstName && submitData.lastName ? (
						<View>
							<Text>{`Full name: ${submitData.firstName} ${submitData.lastName}`}</Text>
						</View>
					) : null}
				</View>
			</PageContainer>
		</KeyboardAvoidContainer>
	);
};

export default DemoForm;
