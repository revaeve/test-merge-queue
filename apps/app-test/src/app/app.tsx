import styled from 'styled-components';

import NxWelcome from './nx-welcome';

const StyledApp = styled.div`
  // Your style here updates-new
`;

export function App() {
  return (
    <StyledApp>
      <NxWelcome title="app-test-updates-new-2" />
    </StyledApp>
  );
}

export default App;
