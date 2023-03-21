import React from 'react';

import AppNavigation from './src/navigation/AppNavigation';
import {QueryClientProvider, QueryClient} from 'react-query';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppNavigation />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
