import { ComponentUtils } from '@ima/core';
import { UIComponentHelper } from '@ima/plugin-atoms';

//eslint-disable-next-line no-unused-vars
export default (ns, oc, config) => {
  oc.get(ComponentUtils).register({
    $UIComponentHelper: UIComponentHelper
  });
};
