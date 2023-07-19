import { useEffect, useRef, useState } from "react";

const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const FUNCTION_KEYS = ["AC", "+/-"];
const SIGNS = ["+", "-", "/", "x"];

const useCalculator = () => {
	const [firstArray, setFirstArray] = useState<string[]>([]);
	const [secondArray, setSecondArray] = useState<string[]>([]);
	const sign = useRef<string>("");
	const [result, setResult] = useState<string>("");
	const [displayText, setDisplayText] = useState<string>("0");

	const clear = () => {
		setFirstArray([]);
		setSecondArray([]);
		sign.current = "";
		setResult("");
		setDisplayText("");
	};

	const handleNumber = (givenNumber: string): void => {
		const targetArray = secondArray.length === 0 ? firstArray : secondArray;

		if (targetArray.length === 9) {
			alert("YOU CAN ONLY USE UP TO NINE NUMBERS");
			return;
		}

		if (isOperationComplete()) {
			clear();
			setFirstArray([givenNumber.toString()]);
		} else if (targetArray.length > 0 && sign.current !== "") {
			setSecondArray([...targetArray, givenNumber.toString()]);
		} else {
			setFirstArray([...targetArray, givenNumber.toString()]);
		}
	};

	const handleFunctionKeys = (functionKey: string): void => {
		if (functionKey === "AC") {
			clear();
		} else if (functionKey === "+/-") {
			const targetArray = firstArray.length > 0 && sign.current === "" && result === "" ? firstArray : secondArray;

			if (targetArray[0] === "-") return;

			if (targetArray.length > 0) {
				setSecondArray(["-", ...targetArray]);
			} else {
				setFirstArray(["-", ...targetArray]);
			}
		}
	};

	const handleEqual = (): void => {
		if (sign.current === "" || firstArray.length === 0 || secondArray.length === 0) {
			return;
		}

		const firstNumber = parseFloat(firstArray.reduce((a, b) => a + b));
		const secondNumber = parseFloat(secondArray.reduce((a, b) => a + b));

		let newResult: string | number = 0;

		switch (sign.current) {
			case "+":
				newResult = firstNumber + secondNumber;
				break;
			case "-":
				newResult = firstNumber - secondNumber;
				break;
			case "/":
				newResult = firstNumber / secondNumber;
				break;
			case "x":
				newResult = firstNumber * secondNumber;
				break;
			default:
				break;
		}

		setResult(newResult.toString());
	};

	const handleSign = (newSign: string): void => {
		if (firstArray.length === 0) {
			return;
		} else if (bothNumberAreDefinedAndResultIsUndefined()) {
			setFirstArray([result]);
			setSecondArray([]);
			sign.current = newSign;
			setResult("");
			return;
		} else {
			sign.current = newSign;
		}
	};

	const handleKeyboard = (event: { key: string }) => {
		const key = event.key;

		if (NUMBERS.some(number => number === key)) handleNumber(key);
		if (SIGNS.some(sign => sign === key)) handleSign(key);
		if (FUNCTION_KEYS.some(functionKey => functionKey === key)) handleFunctionKeys(key);
		if (key === "=" || key === "Enter") handleEqual();
	};

	const isOperationComplete = (): boolean => areParametersSet() && result !== "";

	const bothNumberAreDefinedAndResultIsUndefined = () =>
		firstArray.length > 0 && secondArray.length > 0 && result !== "";

	const areParametersSet = (): boolean =>
		firstArray.length !== 0 && secondArray.length !== 0 && sign.current !== "";

	useEffect(() => {
		if (result !== "") {
			setDisplayText(result);
		} else if (secondArray.length > 0) {
			const formattedSecondArray = secondArray.join("");
			setDisplayText(formattedSecondArray);
		} else if (firstArray.length > 0) {
			const formattedFirstArray = firstArray.join("");
			setDisplayText(formattedFirstArray);
		}
	}, [firstArray, secondArray, sign.current, result]);

	useEffect(() => {
		window.document.addEventListener("keypress", handleKeyboard);
		return () => window.document.removeEventListener("keypress", handleKeyboard);
	}, []);

	return {
		handleNumber,
		handleFunctionKeys,
		handleSign,
		displayText,
		handleEqual
	};
};

export default useCalculator;
