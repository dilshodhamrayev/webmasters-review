import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";

const GModal: React.FC<any> = ({
  children,
  title,
  setopen,
  open,
  footer = false,
  handleFirstBtn,
}) => {
  const toggle = () => setopen(!open);

  return (
    <>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        {footer && (
          <ModalFooter>
            <button className="site-button" onClick={handleFirstBtn}>
              СОЗДАТЬ
            </button>
            <button className="site-button" onClick={toggle}>
              ОТМЕНА
            </button>
          </ModalFooter>
        )}
      </Modal>
    </>
  );
};

export default GModal;
