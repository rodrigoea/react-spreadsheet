import styled from "styled-components";
import { Colors } from "@/resources/styles/theme";

export const ModalWrapper = styled.div`
  background: rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;
  opacity: 0;
  visibility: hidden;
  transition: all 300ms ease;

  &.visible {
    visibility: visible;
    opacity: 1;
  }
`;

export const Modal = styled.div`
  width: 600px;
  padding: 30px;
  border-radius: 10px;
  background: white;
  margin: 50px auto 0;
  position: relative;
  transition: all 300ms ease;
  top: -50%;

  ${ModalWrapper}.visible & {
    top: 0;
  }
`;

export const CloseModal = styled.button`
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
  color: ${Colors.grayDark};
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
`;

export const ModalHeader = styled.div`
  margin-bottom: 20px;
  font-size: 22px;
  color: ${Colors.dark}
  font-weight: bold;
`;

export const ModalBody = styled.div`
  margin-bottom: 20px;

  p {
    font-size: 16px;
    color: ${Colors.dark};
  }
`;

export const ModalFooter = styled.div`
  text-align: right;

  p {
    font-size: 16px;
    color: ${Colors.dark};
  }
`;
