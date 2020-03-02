import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { ModalHeader } from "./ModalHeader";
import { ModalBody } from "./ModalBody";

import OnClickOutside from "../OnClickOutside";

function ModalWindow(props: {
  className?: string;
  isOpen: boolean;
  loader: boolean;
  title: string;
  desc?: string;
  children?: ReactNode;
  onClose: () => void;
}) {
  const { className, isOpen, loader, title, desc, children, onClose } = props;
  const onCloseHandler = () => (loader ? null : onClose());

  return ReactDOM.createPortal(
    <>
      {isOpen && (
        <div className={className}>
          <OnClickOutside onClick={onCloseHandler}>
            <div className="box-dialog">
              <ModalHeader onClose={onCloseHandler} title={title} />
              <ModalBody desc={desc} />
              {children}
            </div>
          </OnClickOutside>
        </div>
      )}
    </>,
    document.getElementById("root")
  );
}

export default styled(ModalWindow)`
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  position: fixed;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  & .box-dialog {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    width: 40%;
    max-width: 700px;
    background-color: white;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
      0px 24px 38px 3px rgba(0, 0, 0, 0.14),
      0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    & button {
      outline: none;
      border: none;
      cursor: pointer;
    }
  }
`;
