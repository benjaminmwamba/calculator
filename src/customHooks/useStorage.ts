import { useEffect, useState } from 'react';

type UseStorageOptions<DataType> = {
	initialData: DataType;
	socketUrl: string;
	storageKey: string;
};

const useStorage = <DataType>({ initialData, socketUrl, storageKey }: UseStorageOptions<DataType>): [DataType, (data: DataType) => void] => {
	const [data, setData] = useState<DataType>(initialData);

	useEffect(() => {
		// Connect to WebSocket
		const socket = new WebSocket(socketUrl);

		socket.onopen = () => {
			console.log('WebSocket connection established.');
		};

		socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			if (message.storageKey === storageKey) {
				setData(message.data);
			}
		};

		return () => {
			// Close WebSocket connection on unmount
			socket.close();
		};
	}, [socketUrl, storageKey]);

	const updateData = (newData: DataType) => {
		setData(newData);

		// Send updated data to the server via WebSocket
		const message = JSON.stringify({ storageKey, data: newData });
		// Assuming you have a connected WebSocket here
		socket.send(message);
	};

	return [data, updateData];
};

export default useStorage;
