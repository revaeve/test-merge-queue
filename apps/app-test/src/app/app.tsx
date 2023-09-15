import styled from 'styled-components';

import NxWelcome from './nx-welcome';

const StyledApp = styled.div`
  // Your style here updates-new-1
`;

export function App() {
  return (
    <StyledApp>
      <NxWelcome title="app-test-updates-new-3" />
    </StyledApp>
  );
}

export default App;
