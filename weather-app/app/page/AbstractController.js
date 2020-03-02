import { AbstractController as AbstractIMAController } from '@ima/core';

/**
 * Base controller, providing elementary configuration of the meta manager.
 */
export default class AbstractController extends AbstractIMAController {
  /**
   * Sets the SEO meta information to the provided meta manager.
   *
   * @param {Object<string, *>} loadedResources The resources that were
   *        loaded using the controller's {@code load()} method.
   * @param {MetaManager} metaManager The IMA meta manager, used to manage
   *        the meta information related to SEO.
   * @param {Router} router The IMA router.
   * @param {Dictionary} dictionary The IMA dictionary, providing localized
   *        phrases.
   * @param {Object<string, *>} settings The application's configuration for
   *        the current environment.
   */
  setMetaParams(loadedResources, metaManager, router, dictionary) {
    metaManager.setTitle(dictionary.get('home.title'));
  }
}
