import styled from 'styled-components';

import NxWelcome from './nx-welcome';

const StyledApp = styled.div`
  // Your style here updates
`;

export function App() {
  return (
    <StyledApp>
      <NxWelcome title="app-test-updates" />
    </StyledApp>
  );
}

export default App;
