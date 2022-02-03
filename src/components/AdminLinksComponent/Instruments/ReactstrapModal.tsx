import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

const ReactstrapModal = (props:any) => {
  const {
    open,
    toggle,
    buttonLabel,
    modalHeaderTitle,
    className,
    color,
    modalBody,
    firstBtnTitle,
    secondBtn,
    secondBtnTitle,
    firstBtnColor,
    firstBtnFunc,
    data,
    loading
  } = props;
/* 
  <table style="width:100%">
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
</table>
*/
  return (
    <div>
      {/*<Button color={color} onClick={toggle}>{buttonLabel}</Button> */}
      <Modal isOpen={open} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{modalHeaderTitle}</ModalHeader>
        {loading ? <div className="d-flex justify-content-center"><CircularProgress /></div>  : (
        data ? (    
        <ModalBody>
                    <div className="d-flex justify-content-center">
                            <table className="w-100">
                                <tbody className="tbodyModal">
                                    <tr>
                                        <th>Ссылка: </th>
                                        <td className="modalBodyText1"><a href={data ? data.link : ""}>{data ? data.link : null}</a></td>
                                    </tr>
                                    <tr>
                                        <th>Логин: </th>
                                        <td className="modalBodyText2">{data ? data.username : null}</td>
                                    </tr>
                                    <tr>
                                        <th>Пароль: </th>
                                        <td className="modalBodyText3">{data ? data.password : null}</td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>
                    </ModalBody>
                    ): null
        )}
        <ModalFooter>
          <Button color={firstBtnColor} onClick={firstBtnFunc} name="firstBtn">{firstBtnTitle}</Button>{' '}
          {secondBtn ?
            <Button color="secondary" onClick={toggle}>{secondBtnTitle}</Button> : null
          }
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ReactstrapModal;