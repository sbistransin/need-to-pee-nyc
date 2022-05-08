import styled from "styled-components";
const App = (props) => {

  return (
    <>
    {props.children}
    </>
      
  )
}

export default App;

const AppContainer = styled.div`
  padding-top: 90px;
`;
