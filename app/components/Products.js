import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { Query, KeystoneProvider } from "@keystonejs/apollo-helpers";
const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:2000/admin/api" }),
  cache: new InMemoryCache()
});
export default function Products() {
  return (
    <div>
      <ApolloProvider client={client}>
        <KeystoneProvider>
          <Query query={gql`...`}>
            {({ data }) => <pre>{JSON.stringify(data)}</pre>}
          </Query>
        </KeystoneProvider>
      </ApolloProvider>
    </div>
  );
}
