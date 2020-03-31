import React from 'react';
// import { useExtension } from './hooks/useExtension';
import { Table } from './components/Table';
import { normaliseData } from './utils/normaliseData';
import { useExtension } from './hooks/useExtension';

function App() {
  const { data, error } = useExtension();
  const tableData = data && normaliseData(data);

  return (
    <div className="App">
      <main>
        {tableData && <Table data={tableData} />}
        {/* {error} */}
      </main>
    </div>
  );
}

export default App;
