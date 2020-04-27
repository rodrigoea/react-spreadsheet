import styled from "styled-components";
import { Colors } from "../../resources/styles/theme";

export const ErrorWrapper = styled.div`
  text-align: center;
  width: 100%;
  display: block;
  margin-top: 40px;

  h1 {
    font-size: 72px;
    color: ${Colors.grayDark};
    margin-bottom: 10px;
    font-weight: 700;
  }

  h2 {
    font-size: 48px;
    color: ${Colors.gray};
    margin-bottom: 20px;
    font-weight: 300;
  }
`;
