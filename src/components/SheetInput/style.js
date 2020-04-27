import styled from "styled-components";
import { Colors } from "../../resources/styles/theme";

export const InputWrapper = styled.div`
  position: relative;
`;

export const Tooltip = styled.div`
  position: absolute;
  width: 90%;
  padding: 10px 20px;
  background: ${Colors.grayDark}
  color: white;
  font-size: 12px;
  text-align: center;
  z-index: 9999;
  top: -100%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  opacity: 0;
  visibility: hidden;
  transition: all 300ms ease;

  ${InputWrapper}.error:hover & {
    opacity: 1;
    visibility: visible;
  }

  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: ${Colors.grayDark} transparent transparent transparent;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 300ms ease;
  }
`;
