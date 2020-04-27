import styled from "styled-components";
import { Images } from "@/resources/images";
import { Colors } from "../../resources/styles/theme";

export const EmptyListWrapper = styled.div`
  width: 520px;
  max-width: 100%;
  margin: 40px auto 0;

  .createBtn {
    margin: 0 auto;
    display: block;
  }
`;

export const EmptyTitle = styled.h2`
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 300;
  text-align: center;
`;

export const EmptySubtitle = styled.h3`
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

export const ListWrapper = styled.div`
  width: 100%;
  padding: 40px;

  .listTitle {
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: 700;
    padding: 30px 0;
    border-bottom: 1px solid ${Colors.gray}
    border-top: 1px solid ${Colors.gray}
  }

  .listLink {
    display: inline-block;
    padding: 30px 15px 30px 50px;
    text-align: center;
    background: url(${Images.icon}) no-repeat 10px 50%;
    color: ${Colors.grayDark};
    text-decoration: none;
    margin-right: 30px;
    transition: all 300ms ease;
    border-radius: 5px;
    box-shadow: 0px 2px 5px ${Colors.gray}

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      box-shadow: 0px 10px 35px ${Colors.gray}
    }
  }
`;
