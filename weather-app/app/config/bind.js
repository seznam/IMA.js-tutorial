import Dictionary from 'ima/dictionary/Dictionary';
import PageStateManager from 'ima/page/state/PageStateManager';
import Dispatcher from 'ima/event/Dispatcher';
import EventBus from 'ima/event/EventBus';
import Router from 'ima/router/Router';
import Window from 'ima/window/Window';

import { UIComponentHelper } from 'ima-ui-atoms';

//eslint-disable-next-line no-unused-vars
export default (ns, oc, config) => {
  oc.constant('$Utils', {
    get $Router() {
      return oc.get(Router);
    },
    get $Dispatcher() {
      return oc.get(Dispatcher);
    },
    get $PageStateManager() {
      return oc.get(PageStateManager);
    },
    get $EventBus() {
      return oc.get(EventBus);
    },
    get $Dictionary() {
      return oc.get(Dictionary);
    },
    get $Settings() {
      return oc.get('$Settings');
    },
    get $Window() {
      return oc.get(Window);
    },
    get $CssClasses() {
      return oc.get('$CssClasses');
    },
    get $UIComponentHelper() {
      return oc.get(UIComponentHelper);
    }
  });
};
