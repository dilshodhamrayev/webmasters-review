import React, { useState } from "react";

import "./style.scss";

interface Props {
  modal: boolean;
}

type CheckBox = {
  russian: boolean;
  belarus: boolean;
  latviya: boolean;
  qozoq: boolean;
  polsha: boolean;
  ukraina: boolean;
  uzb: boolean;
  maldoviya: boolean;
  litva: boolean;
  estoniya: boolean;
  komp_pomosh: boolean;
  remont_bitavoy: boolean;
  uchebniy_center: boolean;
  remont_tv: boolean;
  master_chas: boolean;
  chastniy_master: boolean;
  kompany: boolean;
  konstruktor_form: boolean;
  lending: boolean;
  site_system: boolean;
  ruchnaya_peredacha: boolean;
  CPO_551: boolean;
  CPO_200: boolean;
  CPO_508: boolean;
  CPO_608: boolean;
};

const Modal: React.FC<Props> = ({ modal }) => {
  const [mod, setMod] = useState(modal);
  const [checkBox, setCheckBox] = useState<CheckBox>({
    // Region: {
    russian: false,
    belarus: false,
    latviya: false,
    qozoq: false,
    polsha: false,
    ukraina: false,
    uzb: false,
    maldoviya: false,
    litva: false,
    estoniya: false,
    // },
    // napravleniya: {
    komp_pomosh: false,
    remont_bitavoy: false,
    uchebniy_center: false,
    remont_tv: false,
    master_chas: false,
    // },
    // senari: {
    chastniy_master: false,
    kompany: false,
    // },
    // instrument: {
    konstruktor_form: false,
    lending: false,
    site_system: false,
    ruchnaya_peredacha: false,
    // },
    // viplata: {
    CPO_551: false,
    CPO_200: false,
    CPO_508: false,
    CPO_608: false,
    // },
  });

  const handleCheckBox = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    console.log(checkBox);
  };

  return (
    <div className={`${mod ? "modal" : "none-modal"}`}>
      {console.log(modal)}
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "100%", height: "100%" }}
        role="document"
      >
        <div className="modal-content col-md-12">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              ?????????????????????? ????????????????????
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => setMod(!modal)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body col-lg-12">
            <div className="row">
              <div className="col-lg-2">
                <h5>????????????</h5>
                <p>
                 
                  ????????????
                </p>
                <p>
                  <input value="" type="checkbox" /> ????????????????
                </p>
                <p>
                  <input value="" type="checkbox" /> ????????????
                </p>
                <p>
                  <input value="" type="checkbox" /> ??????????????????
                </p>
                <p>
                  <input value="" type="checkbox" /> ????????????
                </p>
                <p>
                  <input value="" type="checkbox" /> ??????????????
                </p>
                <p>
                  <input value="" type="checkbox" /> ????????????????????
                </p>
                <p>
                  <input value="" type="checkbox" /> ????????????????
                </p>
                <p>
                  <input value="" type="checkbox" /> ??????????
                </p>
                <p>
                  <input value="" type="checkbox" /> ??????????????
                </p>
              </div>
              <div className="col-lg-2">
                <h5>??????????????????????</h5>
                <p>
                  <input value="" type="checkbox" /> ???????????????????????? ????????????
                </p>
                <p>
                  <input value="" type="checkbox" /> ???????????? ?????????????? ??????????????
                </p>
                <p>
                  <input value="" type="checkbox" /> ?????????????? ????????????
                </p>
                <p>
                  <input value="" type="checkbox" /> ???????????? ????
                </p>
                <p>
                  <input value="" type="checkbox" /> ???????????? ???? ??????
                </p>
              </div>
              <div className="col-lg-2">
                <h5>????????????????</h5>
                <p>
                  <input value="" type="checkbox" /> ?????????????? ????????????
                </p>
                <p>
                  <input value="" type="checkbox" /> ????????????????
                </p>
              </div>
              <div className="col-lg-2">
                <h5>??????????????????????</h5>
                <p>
                  <input value="" type="checkbox" /> ?????????????????????? ????????
                </p>
                <p>
                  <input value="" type="checkbox" /> ????????????????
                </p>
                <p>
                  <input value="" type="checkbox" /> ???????? ?? ??????????????
                </p>
                <p>
                  <input value="" type="checkbox" /> ???????????? ???????????????? ??????????
                </p>
              </div>
              <div className="col-lg-2">
                <h5>??????????????</h5>
                <p>
                  <input value="" type="checkbox" /> CPO 551 - 706 ??????.
                </p>
                <p>
                  <input value="" type="checkbox" /> CPO 200 - 350 ??????.
                </p>
                <p>
                  <input value="" type="checkbox" /> CPO 508 - 706 ??????.
                </p>
                <p>
                  <input value="" type="checkbox" /> CPO 608 - 806 ??????.
                </p>
              </div>
              <div className="col-lg-2">
                <h5>????????</h5>
                <p>
                  <input value="" type="checkbox" /> 24 ????????
                </p>
              </div>
            </div>
            <button type="button" className="accept">
              ??????????????????????
            </button>
            <button type="button" className="clear" data-dismiss="modal">
              ????????????????
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
