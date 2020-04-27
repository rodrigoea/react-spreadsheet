import styled from "styled-components";
import { Colors } from "@/resources/styles/theme";

export const SpreadsheetWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const SheetMenu = styled.div`
  width: 100%;
  padding: 20px;
  background: ${Colors.light};
  border-bottom: 1px solid ${Colors.gray}
  margin-bottom: -1px;
  position: sticky;
  top: 0;
  z-index: 99999;
`;

export const TableWrapper = styled.div`
  display: block;
  width: 100%;
  height: 100%;
`;

export const Table = styled.table`
  tr {
    &:first-child {
      span {
        display: block;
        width: 100%;
        background-color: ${Colors.grayLight};
        padding: 5px 10px;
        text-align: center;
        color: ${Colors.grayDark};
        font-weight: 500;
      }
    }

    &:nth-child(2) {
      td input {
        background-color: ${Colors.grayLight};
        padding: 1px 3px;
        text-align: center;
        color: ${Colors.grayDark};
        font-weight: 500;
      }
    }

    td {
      border: 1px solid ${Colors.gray};
      font-size: 14px;
      font-weight: 300;

      &:first-child {
        padding: 0 5px;
        font-weight: 500;
        background-color: ${Colors.grayLight};
        text-align: center;
      }

      input {
        border: none;
        padding: 2px;
        font-size: 14px;
        width: 100%;
        min-width: 120px;

        &:focus {
          background-color: ${Colors.purpleLight};
        }
      }
    }
  }
`;
