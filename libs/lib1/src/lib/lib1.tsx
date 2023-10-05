import styled from 'styled-components';

/* eslint-disable-next-line */
export interface Lib1Props {}

const StyledLib1 = styled.div`
  color: pink;
`;

export function Lib1(props: Lib1Props) {
  return (
    <StyledLib1>
      <h1>Welcome to Lib1! Updated 80</h1>
    </StyledLib1>
  );
}

export default Lib1;
