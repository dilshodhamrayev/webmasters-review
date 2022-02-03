import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Label,
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getRequest } from "../../../redux/global/thunks";
import { globalUrls } from "../../../constants/apiRoutes";

const domainNames = [".com", ".ru", ".org"];

const AddDomainsForm: React.FC<any> = ({ setVals }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const streams = useSelector((state: any) => state.globalReducer.streams);

  useEffect(() => {
    dispatch(getRequest({ value: "streams", url: globalUrls.getStreams }));
  }, []);

  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

  const handleStreamChange = (event) => {
    setVals.setStream_id(event.target.value);
  };

  const handleDomainName = (event) => {
    setVals.setdomainName(event.target.value);
  };

  const handleDomain = (event) => {
    setVals.setDomain(event.target.value);
  };

  return (
    <Form>
      <FormGroup>
        <Label for="domain">Домен</Label>
        <InputGroup>
          <Input
            id="domain"
            value={setVals.domain}
            placeholder="Домен"
            onChange={handleDomain}
          />
          <InputGroupButtonDropdown
            addonType="append"
            isOpen={dropdownOpen}
            toggle={toggleDropDown}
          >
            <DropdownToggle caret>{setVals.domainName}</DropdownToggle>
            <DropdownMenu>
              {domainNames.map((n) => (
                <DropdownItem value={n} onClick={handleDomainName}>
                  {n}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </InputGroupButtonDropdown>
        </InputGroup>
      </FormGroup>

      <FormGroup>
        <Label for="stream">Поток</Label>
        <Input type="select" id="stream" onChange={handleStreamChange}>
          {streams.map((s) => (
            <option value={s.stream_id}>{s.name}</option>
          ))}
        </Input>
      </FormGroup>
    </Form>
  );
};

export default AddDomainsForm;
