import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
} from "@apollo/client";
const client = new ApolloClient({
	uri: "http://127.0.0.1:8000/api/graphql/",
	cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
	<ApolloProvider client={client}>
		<StrictMode>
			<App />
		</StrictMode>
		,
	</ApolloProvider>,
);
