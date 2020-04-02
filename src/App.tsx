import React from 'react';
import { normaliseData } from './utils/normaliseData';
import { useExtension } from './hooks/useExtension';
import { CallsList } from './components/CallsList';

function App() {
  const { data, error } = useExtension();
  const tableData = data && normaliseData(data);

  return (
    <div className="App">
      <header>
        <h1>Inspect api calls</h1>
      </header>
      <main>
        {tableData && <CallsList data={tableData} isTable={false} />}
        {/* {error} */}
      </main>
    </div>
  );
}

export default App;
