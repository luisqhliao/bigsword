define('shin-ui/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('shin-ui/tests/controllers/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/application.js should pass jshint.\ncontrollers/application.js: line 49, col 67, \'response\' is defined but never used.\ncontrollers/application.js: line 61, col 14, Missing semicolon.\ncontrollers/application.js: line 62, col 68, \'response\' is defined but never used.\ncontrollers/application.js: line 71, col 15, Missing semicolon.\ncontrollers/application.js: line 57, col 17, \'systemName\' is defined but never used.\ncontrollers/application.js: line 24, col 21, \'$\' is not defined.\ncontrollers/application.js: line 27, col 17, \'$\' is not defined.\n\n7 errors');
  });
});
define('shin-ui/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('shin-ui/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('shin-ui/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'shin-ui/tests/helpers/start-app', 'shin-ui/tests/helpers/destroy-app'], function (exports, _qunit, _shinUiTestsHelpersStartApp, _shinUiTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _shinUiTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        (0, _shinUiTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});
define('shin-ui/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('shin-ui/tests/helpers/resolver', ['exports', 'ember/resolver', 'shin-ui/config/environment'], function (exports, _emberResolver, _shinUiConfigEnvironment) {

  var resolver = _emberResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _shinUiConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _shinUiConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('shin-ui/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('shin-ui/tests/helpers/start-app', ['exports', 'ember', 'shin-ui/app', 'shin-ui/config/environment'], function (exports, _ember, _shinUiApp, _shinUiConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _shinUiConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _shinUiApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('shin-ui/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('shin-ui/tests/pods/components/alert-modal/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/components/alert-modal/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/alert-modal/component.js should pass jshint.');
  });
});
define('shin-ui/tests/pods/components/confirm-modal/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/components/confirm-modal/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/confirm-modal/component.js should pass jshint.\npods/components/confirm-modal/component.js: line 5, col 34, \'leaveId\' is defined but never used.\n\n1 error');
  });
});
define('shin-ui/tests/pods/components/dash-board/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/components/dash-board/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/dash-board/component.js should pass jshint.');
  });
});
define('shin-ui/tests/pods/components/nav-footer/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/components/nav-footer/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/components/nav-footer/component.js should pass jshint.\npods/components/nav-footer/component.js: line 43, col 21, \'parent\' is already defined.\npods/components/nav-footer/component.js: line 44, col 21, \'chevronid\' is already defined.\npods/components/nav-footer/component.js: line 47, col 21, \'parent\' is already defined.\npods/components/nav-footer/component.js: line 48, col 21, \'chevronid\' is already defined.\npods/components/nav-footer/component.js: line 50, col 28, \'parent\' used out of scope.\npods/components/nav-footer/component.js: line 52, col 18, \'chevronid\' used out of scope.\npods/components/nav-footer/component.js: line 54, col 19, \'chevronid\' used out of scope.\npods/components/nav-footer/component.js: line 55, col 19, \'chevronid\' used out of scope.\npods/components/nav-footer/component.js: line 59, col 19, \'chevronid\' used out of scope.\npods/components/nav-footer/component.js: line 60, col 19, \'chevronid\' used out of scope.\npods/components/nav-footer/component.js: line 39, col 31, \'$\' is not defined.\npods/components/nav-footer/component.js: line 43, col 31, \'$\' is not defined.\npods/components/nav-footer/component.js: line 52, col 16, \'$\' is not defined.\npods/components/nav-footer/component.js: line 54, col 17, \'$\' is not defined.\npods/components/nav-footer/component.js: line 55, col 17, \'$\' is not defined.\npods/components/nav-footer/component.js: line 59, col 17, \'$\' is not defined.\npods/components/nav-footer/component.js: line 60, col 17, \'$\' is not defined.\npods/components/nav-footer/component.js: line 67, col 17, \'$\' is not defined.\npods/components/nav-footer/component.js: line 68, col 32, \'$\' is not defined.\n\n19 errors');
  });
});
define('shin-ui/tests/pods/dashboard/leave/controller.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/dashboard/leave/controller.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dashboard/leave/controller.js should pass jshint.');
  });
});
define('shin-ui/tests/pods/dashboard/leave/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/dashboard/leave/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dashboard/leave/route.js should pass jshint.');
  });
});
define('shin-ui/tests/pods/dashboard/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/dashboard/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dashboard/route.js should pass jshint.');
  });
});
define('shin-ui/tests/pods/leave/create/controller.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/leave/create/controller.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/leave/create/controller.js should pass jshint.\npods/leave/create/controller.js: line 31, col 57, Expected \'!==\' and instead saw \'!=\'.\npods/leave/create/controller.js: line 31, col 105, Expected \'!==\' and instead saw \'!=\'.\npods/leave/create/controller.js: line 66, col 40, Expected \'===\' and instead saw \'==\'.\npods/leave/create/controller.js: line 66, col 44, Expected \'{\' and instead saw \'--\'.\npods/leave/create/controller.js: line 68, col 38, Expected \'===\' and instead saw \'==\'.\npods/leave/create/controller.js: line 68, col 42, Expected \'{\' and instead saw \'--\'.\npods/leave/create/controller.js: line 111, col 21, \'entitle\' is already defined.\npods/leave/create/controller.js: line 112, col 21, \'entitlement\' is already defined.\npods/leave/create/controller.js: line 113, col 21, \'balance\' is already defined.\npods/leave/create/controller.js: line 116, col 28, \'entitlement\' used out of scope.\npods/leave/create/controller.js: line 120, col 33, \'balance\' used out of scope.\npods/leave/create/controller.js: line 103, col 13, \'model\' is defined but never used.\npods/leave/create/controller.js: line 190, col 17, \'_this\' is defined but never used.\npods/leave/create/controller.js: line 32, col 25, \'moment\' is not defined.\npods/leave/create/controller.js: line 33, col 23, \'moment\' is not defined.\npods/leave/create/controller.js: line 34, col 25, \'moment\' is not defined.\npods/leave/create/controller.js: line 186, col 33, \'moment\' is not defined.\n\n17 errors');
  });
});
define('shin-ui/tests/pods/leave/create/model.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/leave/create/model.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/leave/create/model.js should pass jshint.');
  });
});
define('shin-ui/tests/pods/leave/create/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/leave/create/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/leave/create/route.js should pass jshint.');
  });
});
define('shin-ui/tests/pods/leave/details/controller.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/leave/details/controller.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/leave/details/controller.js should pass jshint.\npods/leave/details/controller.js: line 41, col 77, \'response\' is defined but never used.\npods/leave/details/controller.js: line 31, col 17, \'_this\' is defined but never used.\n\n2 errors');
  });
});
define('shin-ui/tests/pods/leave/details/model.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/leave/details/model.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/leave/details/model.js should pass jshint.');
  });
});
define('shin-ui/tests/pods/leave/details/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/leave/details/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/leave/details/route.js should pass jshint.');
  });
});
define('shin-ui/tests/pods/leave/list/controller.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/leave/list/controller.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/leave/list/controller.js should pass jshint.\npods/leave/list/controller.js: line 20, col 38, Expected \'!==\' and instead saw \'!=\'.\npods/leave/list/controller.js: line 62, col 77, \'response\' is defined but never used.\npods/leave/list/controller.js: line 52, col 17, \'_this\' is defined but never used.\npods/leave/list/controller.js: line 17, col 16, \'$\' is not defined.\npods/leave/list/controller.js: line 18, col 17, \'$\' is not defined.\npods/leave/list/controller.js: line 19, col 28, \'$\' is not defined.\npods/leave/list/controller.js: line 24, col 17, \'$\' is not defined.\n\n7 errors');
  });
});
define('shin-ui/tests/pods/leave/list/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/leave/list/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/leave/list/route.js should pass jshint.');
  });
});
define('shin-ui/tests/pods/leave/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/leave/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/leave/route.js should pass jshint.');
  });
});
define('shin-ui/tests/pods/login/controller.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/login/controller.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'pods/login/controller.js should pass jshint.\npods/login/controller.js: line 40, col 30, \'response\' is defined but never used.\npods/login/controller.js: line 12, col 9, \'$\' is not defined.\npods/login/controller.js: line 19, col 13, \'$\' is not defined.\npods/login/controller.js: line 21, col 13, \'$\' is not defined.\n\n4 errors');
  });
});
define('shin-ui/tests/pods/login/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/login/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/login/route.js should pass jshint.');
  });
});
define('shin-ui/tests/pods/quick-approve/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/quick-approve/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/quick-approve/route.js should pass jshint.');
  });
});
define('shin-ui/tests/pods/report/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/report/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/report/route.js should pass jshint.');
  });
});
define('shin-ui/tests/pods/support/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/support/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/support/route.js should pass jshint.');
  });
});
define('shin-ui/tests/pods/sys-info/model.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/sys-info/model.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/sys-info/model.js should pass jshint.');
  });
});
define('shin-ui/tests/pods/sys-info/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - pods/sys-info/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/sys-info/route.js should pass jshint.');
  });
});
define('shin-ui/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('shin-ui/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
  });
});
define('shin-ui/tests/services/ajax-generic.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/ajax-generic.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/ajax-generic.js should pass jshint.\nservices/ajax-generic.js: line 19, col 64, \'reject\' is defined but never used.\n\n1 error');
  });
});
define('shin-ui/tests/services/dashboard-data.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/dashboard-data.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/dashboard-data.js should pass jshint.\nservices/dashboard-data.js: line 13, col 22, Missing semicolon.\nservices/dashboard-data.js: line 24, col 17, \'key\' is already defined.\nservices/dashboard-data.js: line 68, col 17, \'p\' is defined but never used.\n\n3 errors');
  });
});
define('shin-ui/tests/services/modal-show.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/modal-show.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/modal-show.js should pass jshint.\nservices/modal-show.js: line 5, col 93, Unexpected \')\'.\nservices/modal-show.js: line 5, col 93, Expected an identifier and instead saw \')\'.\nservices/modal-show.js: line 6, col 50, \'function closure expressions\' is only available in Mozilla JavaScript extensions (use moz option).\nservices/modal-show.js: line 6, col 51, Expected an identifier and instead saw \';\'.\nservices/modal-show.js: line 5, col 86, \'jumpTo\' is defined but never used.\nservices/modal-show.js: line 5, col 77, \'modalId\' is defined but never used.\nservices/modal-show.js: line 5, col 64, \'modalReload\' is defined but never used.\nservices/modal-show.js: line 5, col 54, \'modalMsg\' is defined but never used.\nservices/modal-show.js: line 5, col 45, \'msgType\' is defined but never used.\nservices/modal-show.js: line 5, col 32, \'modalHeader\' is defined but never used.\nservices/modal-show.js: line 5, col 20, \'controller\' is defined but never used.\nservices/modal-show.js: line 7, col 9, Expected \'}\' to match \'{\' from line 3 and instead saw \'controller\'.\nservices/modal-show.js: line 7, col 45, Expected \')\' and instead saw \';\'.\nservices/modal-show.js: line 7, col 46, Missing semicolon.\nservices/modal-show.js: line 31, col 9, Unrecoverable syntax error. (91% scanned).\n\n16 errors');
  });
});
define('shin-ui/tests/test-helper', ['exports', 'shin-ui/tests/helpers/resolver', 'shin-ui/tests/helpers/register-select-helper', 'ember-qunit'], function (exports, _shinUiTestsHelpersResolver, _shinUiTestsHelpersRegisterSelectHelper, _emberQunit) {
  (0, _shinUiTestsHelpersRegisterSelectHelper['default'])();

  (0, _emberQunit.setResolver)(_shinUiTestsHelpersResolver['default']);
});
define('shin-ui/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('shin-ui/tests/unit/pods/get-session/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:get-session', 'Unit | Route | get session', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('shin-ui/tests/unit/pods/get-session/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/get-session/route-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/get-session/route-test.js should pass jshint.');
  });
});
define('shin-ui/tests/unit/pods/home/leave/model-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('home/leave', 'Unit | Model | home/leave', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('shin-ui/tests/unit/pods/home/leave/model-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/home/leave/model-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/home/leave/model-test.js should pass jshint.');
  });
});
define('shin-ui/tests/unit/pods/home/leave-detail/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:home/leave-detail', 'Unit | Route | home/leave detail', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('shin-ui/tests/unit/pods/home/leave-detail/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/home/leave-detail/route-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/home/leave-detail/route-test.js should pass jshint.');
  });
});
define('shin-ui/tests/unit/pods/home/leaves/detail/controller-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:home/leaves/detail', 'Unit | Controller | home/leaves/detail', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('shin-ui/tests/unit/pods/home/leaves/detail/controller-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/home/leaves/detail/controller-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/home/leaves/detail/controller-test.js should pass jshint.');
  });
});
define('shin-ui/tests/unit/pods/home/leaves/detail/model-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('home/leaves/detail', 'Unit | Model | home/leaves/detail', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('shin-ui/tests/unit/pods/home/leaves/detail/model-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/home/leaves/detail/model-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/home/leaves/detail/model-test.js should pass jshint.');
  });
});
define('shin-ui/tests/unit/pods/home/leaves/model-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('home/leaves', 'Unit | Model | home/leaves', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('shin-ui/tests/unit/pods/home/leaves/model-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/home/leaves/model-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/home/leaves/model-test.js should pass jshint.');
  });
});
define('shin-ui/tests/unit/pods/login/controller-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:login', 'Unit | Controller | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('shin-ui/tests/unit/pods/login/controller-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/login/controller-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/login/controller-test.js should pass jshint.');
  });
});
define('shin-ui/tests/unit/pods/login/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:login', 'Unit | Route | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('shin-ui/tests/unit/pods/login/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/login/route-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/login/route-test.js should pass jshint.');
  });
});
define('shin-ui/tests/unit/pods/quick-approve/get-session/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:quick-approve/get-session', 'Unit | Route | quick approve/get session', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('shin-ui/tests/unit/pods/quick-approve/get-session/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/pods/quick-approve/get-session/route-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/quick-approve/get-session/route-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('shin-ui/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map