import styled from "styled-components";
import { Colors } from "@/resources/styles/theme";

export const ButtonComponent = styled.button.attrs({
  theme: (props) => Colors[props.theme],
})`
  border: none;
  padding: 10px 20px;
  background: ${(props) => props.theme || Colors.primary};
  font-size: 14px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    opacity: 0.8;
  }
`;
