import React from 'react';
import {createRoot} from 'react-dom/client';

import {LeadWidget} from './widgets';
import {EmailList} from './lists';

const createLeadWidget = () => {
  const rootId = 'lead-widget-root';

  const createWidgetRoot = () => {
    const element = document.createElement('div');
    element.id = rootId;
    return element;
  }

  document.body.appendChild(createWidgetRoot());
  const root = createRoot(document.getElementById(rootId));
  root.render(<LeadWidget/>);
}

const createEmailList = () => {
  const emailListId = 'email-list-root';

  const createEmailList = () => {
    const element = document.createElement('div');
    element.id = emailListId;
    return element;
  }

  document.body.appendChild(createEmailList());
  const emailListroot = createRoot(document.getElementById(emailListId));
  emailListroot.render(<EmailList/>)
}

(function () {
  createLeadWidget();
  createEmailList();
})();
