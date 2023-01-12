import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { BackHandler, SafeAreaView, StyleSheet } from "react-native";
import WebView from "react-native-webview";

export default function App() {
	const [canGoBack, setCanGoBack] = useState(false);
	const webview = useRef<WebView>(null);

	const backAction = () => {
		if (canGoBack) {
			setCanGoBack(false);
			webview.current!.injectJavaScript("history.back();");
			return true;
		}
		return false;
	};

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", backAction);

		return () =>
			BackHandler.removeEventListener("hardwareBackPress", backAction);
	}, []);
	return (
		<SafeAreaView style={styles.container}>
			<WebView
				ref={webview}
				source={{ uri: "https://alertetmoi.com" }}
				forceDarkOn={false}
			/>
			<StatusBar style="dark" backgroundColor="#FFFFFF" translucent={true} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 40,
		backgroundColor: "#FFFFFF",
	},
});
