import React from "react";
import { Container } from "@mui/material";
import { NavbarOthers } from "../../components/header/others";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { VisitorOtherPage } from "./VisitOtherPage";
import { VisitMyPage } from "./VisitMyPage";
import "../../../css/my_page.css";

export function MemberPage() {
  let member = useRouteMatch();
  console.log(member);
  return (
    <div>
      <NavbarOthers />
      <div >
        <Switch>
          <Route path={`${member.path}/other`}>
            <VisitorOtherPage />
          </Route>
          <Route path={`${member.path}`}>
            <VisitMyPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
