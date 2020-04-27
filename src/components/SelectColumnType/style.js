import styled from "styled-components";
import { Colors } from "../../resources/styles/theme";

export const CustomSelect = styled.select`
  background: transparent;
  border: none;
  font-size: 14px;
  height: 49px;
  padding: 5px; /* If you add too much padding here, the options won't show in IE */
  width: calc(100% - -10px);
  color: ${Colors.dark};
  outline: 0;
`;

export const SelectWrapper = styled.div`
  background: ${Colors.white};
  overflow: hidden;
  width: 100%;
  border-radius: 5px;
  position: relative;
  border: 1px solid ${Colors.gray};

  &:before {
    content: "";
    position: absolute;
    width: 1px;
    height: 100%;
    top: 0;
    right: 45px;
    background: ${Colors.gray};
  }

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 7px 7px 0 7px;
    border-color: ${Colors.gray} transparent transparent transparent;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
  }

  ${CustomSelect}:focus & {
    border-color: red;
  }
`;
