import React, { useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from "reactstrap";
import classnames from "classnames";
import GTable from "../../../../components/global/Table";
import axios from "axios";
import { Alert } from "reactstrap";

const tableTitles = [
  { title: "Username", prop: "username" },
  { title: "Password", prop: "password" },
];

const tabTitles = [
  { title: "Facebook", key: "facebook" },
  { title: "Google", key: "google" },
  { title: "VK", key: "vk" },
];

const AccountTabs: React.FC<any> = () => {
  const [activeTab, setActiveTab] = useState("facebook");
  const [alert, setalert] = useState(false);
  const [accounts, setaccounts] = useState<any>({
    facebook: [],
    google: [],
    vk: [],
  });

  const tabContents = [
    {
      tabId: "facebook",
      content: <GTable data={accounts.facebook} titles={tableTitles} />,
    },
    {
      tabId: "google",
      content: <GTable data={accounts.google} titles={tableTitles} />,
    },
    {
      tabId: "vk",
      content: <GTable data={accounts.vk} titles={tableTitles} />,
    },
  ];

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  useEffect(() => {
    axios({
      url: "/instruments/accounts",
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        setaccounts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getNewAccount = (platform) => {
    if (accounts[platform].length > 3) {
      setalert(true);
    } else {
      axios({
        url: `/instruments/${platform}`,
        method: "GET",
      }).then((res) =>
        setaccounts({
          ...accounts,
          [platform]: [...accounts[platform], res.data.account],
        })
      );
    }
  };

  return (
    <>
      <div>
        <Alert
          color="danger"
          isOpen={alert}
          toggle={() => {
            setalert(false);
          }}
        >
          Limit for {activeTab} account exceeded!!!
        </Alert>
        <Nav tabs>
          {tabTitles.map((tab) => {
            return (
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === tab.key })}
                  onClick={() => {
                    toggle(tab.key);
                    setalert(false);
                  }}
                >
                  {tab.title}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
        <TabContent activeTab={activeTab}>
          {tabContents.map((c) => {
            return <TabPane tabId={c.tabId}>{c.content}</TabPane>;
          })}
        </TabContent>
        <Button
          onClick={() => getNewAccount(activeTab)}
          color="primary"
          size="large"
        >
          Получить аккаунт
        </Button>
      </div>
    </>
  );
};

export default AccountTabs;
