"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('shin-ui/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'shin-ui/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _shinUiConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _shinUiConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _shinUiConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _shinUiConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('shin-ui/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'shin-ui/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _shinUiConfigEnvironment) {

  var name = _shinUiConfigEnvironment['default'].APP.name;
  var version = _shinUiConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('shin-ui/controllers/application', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		isLeave: null,
		isTravel: null,
		ajaxGeneric: _ember['default'].inject.service('ajax-generic'),
		modalShow: _ember['default'].inject.service('modal-show'),
		loginController: _ember['default'].inject.controller('login'),

		isLogin: (function () {

			if (this.get('currentPath').toString().indexOf("login") > -1 || this.get('currentPath').toString().indexOf("quickApprove") > -1) {
				return true;
			} else {
				var data = {
					cmd: 'refresh'
				};
				var _this = this;
				this.get('ajaxGeneric').post(data, this).then(function (response) {
					_this.set('currentUserName', response.staffName);

					if (_this.get('currentSys')) {
						$('body').removeClass(_this.get('currentSys'));
					}
					_this.set('currentSys', response.system);
					$('body').addClass(_this.get('currentSys'));

					var currentSys = _this.get('currentSys');
					if (currentSys === "leave") {
						_this.set('isLeave', true);
						_this.set('isTravel', false);
					}
					if (currentSys === "travel") {
						_this.set('isTravel', true);
						_this.set('isLeave', false);
					}
				});
				return false;
			}
		}).property('currentPath'),

		actions: {
			jumpToLogin: function jumpToLogin() {
				var data = {
					cmd: 'logout'
				};
				this.get('ajaxGeneric').post(data, this).then(function (response) {});
				this.get('modalShow').show(this, "Log Out", "info", "You have been logged out.", true, "#alertModal", "/login");
			},

			switchSystem: function switchSystem() {
				var systemName = this.get('currentSys');
				var _this = this;
				var data = {
					cmd: 'switchSystem'
				};
				this.get('ajaxGeneric').post(data, this).then(function (response) {
					console.log("System Switch");
					if (_this.get('currentPath') === "sysInfo") {
						// _this.transitionToRoute('sysInfo', response);
						location.reload();
					} else {
						_this.transitionToRoute('sysInfo');
					}
				});
			},

			naviRoute: function naviRoute(route) {
				this.transitionToRoute(route);
			}
		}
	});
});
define('shin-ui/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('shin-ui/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('shin-ui/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'shin-ui/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _shinUiConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_shinUiConfigEnvironment['default'].APP.name, _shinUiConfigEnvironment['default'].APP.version)
  };
});
define('shin-ui/initializers/export-application-global', ['exports', 'ember', 'shin-ui/config/environment'], function (exports, _ember, _shinUiConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_shinUiConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _shinUiConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_shinUiConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('shin-ui/pods/components/alert-modal/component', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		actions: {
			reload: function reload() {
				if (this.get('isReload')) {
					location.reload();
				}
			}
		}
	});
});
define("shin-ui/pods/components/alert-modal/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 8
            },
            "end": {
              "line": 13,
              "column": 8
            }
          },
          "moduleName": "shin-ui/pods/components/alert-modal/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "label label-danger");
          var el2 = dom.createTextNode("ERROR");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 8
            },
            "end": {
              "line": 17,
              "column": 8
            }
          },
          "moduleName": "shin-ui/pods/components/alert-modal/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "label label-info");
          var el2 = dom.createTextNode("INFO");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 8
            },
            "end": {
              "line": 21,
              "column": 8
            }
          },
          "moduleName": "shin-ui/pods/components/alert-modal/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "label label-success");
          var el2 = dom.createTextNode("SUCCESS");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 37,
            "column": 0
          }
        },
        "moduleName": "shin-ui/pods/components/alert-modal/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" Modal ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "alertModal");
        dom.setAttribute(el1, "class", "modal fade");
        dom.setAttribute(el1, "role", "dialog");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "modal-dialog");
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Modal content");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "modal-content");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "modal-header");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "type", "button");
        dom.setAttribute(el5, "class", "close");
        dom.setAttribute(el5, "data-dismiss", "modal");
        var el6 = dom.createTextNode("×");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h4");
        dom.setAttribute(el5, "class", "modal-title");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("        \n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "modal-body");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "modal-footer");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "type", "button");
        dom.setAttribute(el5, "class", "btn btn-default");
        dom.setAttribute(el5, "data-dismiss", "modal");
        var el6 = dom.createTextNode("Close");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [3, 1, 3]);
        var element1 = dom.childAt(element0, [1, 3]);
        var element2 = dom.childAt(element0, [5, 1]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(element1, 1, 1);
        morphs[1] = dom.createMorphAt(element1, 3, 3);
        morphs[2] = dom.createMorphAt(element1, 5, 5);
        morphs[3] = dom.createMorphAt(element1, 7, 7);
        morphs[4] = dom.createMorphAt(dom.childAt(element0, [3, 1]), 0, 0);
        morphs[5] = dom.createElementMorph(element2);
        morphs[6] = dom.createMorphAt(fragment, 5, 5, contextualElement);
        return morphs;
      },
      statements: [["block", "if", [["get", "isError", ["loc", [null, [11, 14], [11, 21]]]]], [], 0, null, ["loc", [null, [11, 8], [13, 15]]]], ["block", "if", [["get", "isInfo", ["loc", [null, [15, 14], [15, 20]]]]], [], 1, null, ["loc", [null, [15, 8], [17, 15]]]], ["block", "if", [["get", "isSuccess", ["loc", [null, [19, 14], [19, 23]]]]], [], 2, null, ["loc", [null, [19, 8], [21, 15]]]], ["content", "header", ["loc", [null, [23, 8], [23, 18]]]], ["content", "msg", ["loc", [null, [27, 11], [27, 18]]]], ["element", "action", ["reload"], [], ["loc", [null, [30, 75], [30, 94]]]], ["content", "yield", ["loc", [null, [36, 0], [36, 9]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define('shin-ui/pods/components/confirm-modal/component', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		actions: {
			confirmRequest: function confirmRequest(leaveId) {
				var reqType = this.get('confirmMsg');
				var comments = this.get('comments');

				console.log(reqType + ":" + comments);

				this.sendAction('confirmRequest', { reqType: reqType, comments: comments });
			}
		}
	});
});
define("shin-ui/pods/components/confirm-modal/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 25,
            "column": 0
          }
        },
        "moduleName": "shin-ui/pods/components/confirm-modal/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment(" Modal ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "confirmModal");
        dom.setAttribute(el1, "class", "modal fade");
        dom.setAttribute(el1, "role", "dialog");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "modal-dialog");
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Modal content");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "modal-content");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "modal-header");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "type", "button");
        dom.setAttribute(el5, "class", "close");
        dom.setAttribute(el5, "data-dismiss", "modal");
        var el6 = dom.createTextNode("×");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h4");
        dom.setAttribute(el5, "class", "modal-title");
        var el6 = dom.createElement("span");
        dom.setAttribute(el6, "class", "label label-info");
        var el7 = dom.createTextNode("INFO");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("Confirm");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "modal-body");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        var el6 = dom.createTextNode("Do you confirm ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(" this request ?");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "class", "control-label");
        var el6 = dom.createTextNode("comments");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n		");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "modal-footer");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "type", "button");
        dom.setAttribute(el5, "class", "btn btn-default");
        dom.setAttribute(el5, "data-dismiss", "modal");
        var el6 = dom.createTextNode("Cancel");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "type", "button");
        dom.setAttribute(el5, "class", "btn btn-primary");
        dom.setAttribute(el5, "data-dismiss", "modal");
        var el6 = dom.createTextNode("Confirm");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 1, 3]);
        var element1 = dom.childAt(element0, [3]);
        var element2 = dom.childAt(element0, [5, 3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(element1, 5, 5);
        morphs[2] = dom.createElementMorph(element2);
        morphs[3] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        return morphs;
      },
      statements: [["content", "confirmMsg", ["loc", [null, [12, 26], [12, 40]]]], ["inline", "textarea", [], ["class", "form-control", "rows", "3", "value", ["subexpr", "@mut", [["get", "comments", ["loc", [null, [14, 49], [14, 57]]]]], [], []]], ["loc", [null, [14, 2], [14, 59]]]], ["element", "action", ["confirmRequest", ["get", "model.leaveId", ["loc", [null, [18, 101], [18, 114]]]]], [], ["loc", [null, [18, 75], [18, 117]]]], ["content", "yield", ["loc", [null, [24, 0], [24, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('shin-ui/pods/components/dash-board/component', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		actions: {
			list: function list(position) {
				position.category = this.get('category');
				this.sendAction('list', position);
			}
		}
	});
});
define("shin-ui/pods/components/dash-board/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 4
            },
            "end": {
              "line": 12,
              "column": 4
            }
          },
          "moduleName": "shin-ui/pods/components/dash-board/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("					");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          dom.setAttribute(el1, "class", "header");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "head", ["loc", [null, [11, 24], [11, 32]]]]],
        locals: ["head"],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 18,
                "column": 5
              },
              "end": {
                "line": 20,
                "column": 5
              }
            },
            "moduleName": "shin-ui/pods/components/dash-board/template.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("						");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("td");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(3);
            morphs[0] = dom.createAttrMorph(element0, 'class');
            morphs[1] = dom.createElementMorph(element0);
            morphs[2] = dom.createMorphAt(element0, 0, 0);
            return morphs;
          },
          statements: [["attribute", "class", ["get", "cell.cls", ["loc", [null, [19, 18], [19, 26]]]]], ["element", "action", ["list", ["get", "cell.position", ["loc", [null, [19, 45], [19, 58]]]]], [], ["loc", [null, [19, 29], [19, 60]]]], ["content", "cell.dt", ["loc", [null, [19, 61], [19, 72]]]]],
          locals: ["cell"],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 4
            },
            "end": {
              "line": 22,
              "column": 4
            }
          },
          "moduleName": "shin-ui/pods/components/dash-board/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("				");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["block", "each", [["get", "body", ["loc", [null, [18, 13], [18, 17]]]]], [], 0, null, ["loc", [null, [18, 5], [20, 14]]]]],
        locals: ["body"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 30,
            "column": 0
          }
        },
        "moduleName": "shin-ui/pods/components/dash-board/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "sub-header");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-lg-1");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-lg-10");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("table");
        dom.setAttribute(el3, "class", "table table-bordered");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("thead");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tr");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tbody");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [2, 3, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1]), 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [1, 1]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [3]), 1, 1);
        morphs[3] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        return morphs;
      },
      statements: [["content", "header", ["loc", [null, [2, 5], [2, 15]]]], ["block", "each", [["get", "tbHead", ["loc", [null, [10, 12], [10, 18]]]]], [], 0, null, ["loc", [null, [10, 4], [12, 13]]]], ["block", "each", [["get", "tbBody", ["loc", [null, [16, 12], [16, 18]]]]], [], 1, null, ["loc", [null, [16, 4], [22, 13]]]], ["content", "yield", ["loc", [null, [29, 0], [29, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("shin-ui/pods/components/nav-footer/component", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Component.extend({
		classNames: {
			userInfoClass: "",
			leaveListClass: "",
			approveReqClass: ""
		},
		isExpand: false,
		dashboardExpand: false,
		myLeaveExpand: false,
		isRight: true,
		isDown: false,
		initialize: (function () {
			var classNames = this.get('classNames');
			for (var c in classNames) {
				classNames[c] = classNames[c].toString().replace("active", "");
			}
			this.set('classNames', classNames);
		}).on('init'),

		actions: {
			logout: function logout() {

				this.sendAction('logout');
			},

			"switch": function _switch() {
				this.sendAction('switch');
			},

			navi: function navi(route) {
				this.sendAction('navi', route);
			},

			toggleExpand: function toggleExpand(event) {
				var id = event.target.id;
				if (id === "") {
					var parent = $(event.target).parent().attr('id');
					var chevronid = "#" + parent + "-chevron";
				} else if (id.indexOf("-chevron") > -1) {
					var parent = $(event.target).parent().attr('id');
					var chevronid = "#" + id;
				} else {
					var parent = id;
					var chevronid = "#" + id + "-chevron";
				}
				var isExpand = parent + "Expand";
				console.log(isExpand);
				if ($(chevronid).hasClass("glyphicon-plus")) {
					this.set(isExpand, true);
					$(chevronid).removeClass("glyphicon-plus");
					$(chevronid).addClass("glyphicon-minus");
				} else {
					this.set(isExpand, false);
					$(chevronid).removeClass("glyphicon-minus");
					$(chevronid).addClass("glyphicon-plus");
				}

				console.log(this.get(isExpand));
			},

			jumpToTop: function jumpToTop() {
				$('html, body').animate({
					scrollTop: $("#section1").offset().top
				}, 1000);
			}
		}
	});
});
define("shin-ui/pods/components/nav-footer/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 8
            },
            "end": {
              "line": 16,
              "column": 8
            }
          },
          "moduleName": "shin-ui/pods/components/nav-footer/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          System LEAVE\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 8
            },
            "end": {
              "line": 19,
              "column": 8
            }
          },
          "moduleName": "shin-ui/pods/components/nav-footer/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          System TRAVEL\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 54,
                "column": 16
              },
              "end": {
                "line": 58,
                "column": 16
              }
            },
            "moduleName": "shin-ui/pods/components/nav-footer/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("td");
            dom.setAttribute(el1, "class", "nav-sub-lable");
            var el2 = dom.createTextNode(" Leave\n                    ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("span");
            dom.setAttribute(el2, "class", "glyphicon glyphicon-chevron-right right");
            dom.setAttribute(el2, "aria-hidden", "true");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element5 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element5, 'onclick');
            return morphs;
          },
          statements: [["attribute", "onclick", ["subexpr", "action", ["navi", "dashboard.leave"], [], ["loc", [null, [55, 50], [55, 85]]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 59,
                "column": 16
              },
              "end": {
                "line": 63,
                "column": 16
              }
            },
            "moduleName": "shin-ui/pods/components/nav-footer/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("td");
            dom.setAttribute(el1, "class", "nav-sub-lable");
            var el2 = dom.createTextNode(" Travel\n                    ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("span");
            dom.setAttribute(el2, "class", "glyphicon glyphicon-chevron-right right");
            dom.setAttribute(el2, "aria-hidden", "true");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element4 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element4, 'onclick');
            return morphs;
          },
          statements: [["attribute", "onclick", ["subexpr", "action", ["navi", "dashboard.leave"], [], ["loc", [null, [60, 50], [60, 85]]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 51,
              "column": 12
            },
            "end": {
              "line": 65,
              "column": 12
            }
          },
          "moduleName": "shin-ui/pods/components/nav-footer/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("              ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "class", "nav-sub-icon");
          var el3 = dom.createElement("span");
          dom.setAttribute(el3, "class", "glyphicon glyphicon-unchecked icon-bar ");
          dom.setAttribute(el3, "aria-hidden", "true");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("              ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element6 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(element6, 3, 3);
          morphs[1] = dom.createMorphAt(element6, 4, 4);
          return morphs;
        },
        statements: [["block", "if", [["get", "isLeave", ["loc", [null, [54, 22], [54, 29]]]]], [], 0, null, ["loc", [null, [54, 16], [58, 23]]]], ["block", "if", [["get", "isTravel", ["loc", [null, [59, 22], [59, 30]]]]], [], 1, null, ["loc", [null, [59, 16], [63, 23]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child3 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 76,
                "column": 12
              },
              "end": {
                "line": 81,
                "column": 12
              }
            },
            "moduleName": "shin-ui/pods/components/nav-footer/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("td");
            dom.setAttribute(el1, "class", "nav-sub-icon");
            var el2 = dom.createElement("span");
            dom.setAttribute(el2, "class", "glyphicon glyphicon-unchecked icon-bar ");
            dom.setAttribute(el2, "aria-hidden", "true");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n                ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("td");
            dom.setAttribute(el1, "class", "nav-sub-lable");
            var el2 = dom.createTextNode(" Create Leave\n                    ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("span");
            dom.setAttribute(el2, "class", "glyphicon glyphicon-chevron-right right");
            dom.setAttribute(el2, "aria-hidden", "true");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [3]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element2, 'onclick');
            return morphs;
          },
          statements: [["attribute", "onclick", ["subexpr", "action", ["navi", "leave.create"], [], ["loc", [null, [78, 50], [78, 82]]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 68,
              "column": 12
            },
            "end": {
              "line": 82,
              "column": 12
            }
          },
          "moduleName": "shin-ui/pods/components/nav-footer/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "class", "nav-icon bk-yellow");
          var el3 = dom.createElement("span");
          dom.setAttribute(el3, "class", "glyphicon glyphicon-calendar ");
          dom.setAttribute(el3, "aria-hidden", "true");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "class", "nav-lable");
          dom.setAttribute(el2, "id", "myLeave");
          var el3 = dom.createTextNode(" My Leave\n                  ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          dom.setAttribute(el3, "class", "glyphicon glyphicon-plus right");
          dom.setAttribute(el3, "aria-hidden", "true");
          dom.setAttribute(el3, "id", "myLeave-chevron");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1, 3]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element3, 'onclick');
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["attribute", "onclick", ["subexpr", "action", ["toggleExpand"], [], ["loc", [null, [71, 44], [71, 69]]]]], ["block", "if", [["get", "myLeaveExpand", ["loc", [null, [76, 18], [76, 31]]]]], [], 0, null, ["loc", [null, [76, 12], [81, 19]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child4 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 92,
                "column": 12
              },
              "end": {
                "line": 97,
                "column": 12
              }
            },
            "moduleName": "shin-ui/pods/components/nav-footer/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("td");
            dom.setAttribute(el1, "class", "nav-sub-icon");
            var el2 = dom.createElement("span");
            dom.setAttribute(el2, "class", "glyphicon glyphicon-unchecked icon-bar ");
            dom.setAttribute(el2, "aria-hidden", "true");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n                ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("td");
            dom.setAttribute(el1, "class", "nav-sub-lable");
            var el2 = dom.createTextNode(" Create Travel\n                    ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("span");
            dom.setAttribute(el2, "class", "glyphicon glyphicon-chevron-right right");
            dom.setAttribute(el2, "aria-hidden", "true");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [3]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element0, 'onclick');
            return morphs;
          },
          statements: [["attribute", "onclick", ["subexpr", "action", ["navi", "leave.create"], [], ["loc", [null, [94, 50], [94, 82]]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 84,
              "column": 12
            },
            "end": {
              "line": 98,
              "column": 12
            }
          },
          "moduleName": "shin-ui/pods/components/nav-footer/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "class", "nav-icon bk-yellow");
          var el3 = dom.createElement("span");
          dom.setAttribute(el3, "class", "glyphicon glyphicon-plane ");
          dom.setAttribute(el3, "aria-hidden", "true");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "class", "nav-lable");
          dom.setAttribute(el2, "id", "myTravel");
          var el3 = dom.createTextNode(" My Travel\n                  ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          dom.setAttribute(el3, "class", "glyphicon glyphicon-plus right");
          dom.setAttribute(el3, "aria-hidden", "true");
          dom.setAttribute(el3, "id", "myTravel-chevron");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1, 3]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element1, 'onclick');
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["attribute", "onclick", ["subexpr", "action", ["toggleExpand"], [], ["loc", [null, [87, 44], [87, 69]]]]], ["block", "if", [["get", "myTravelExpand", ["loc", [null, [92, 18], [92, 32]]]]], [], 0, null, ["loc", [null, [92, 12], [97, 19]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 152,
            "column": 0
          }
        },
        "moduleName": "shin-ui/pods/components/nav-footer/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1, "class", "navbar navbar-inverse navbar-fixed-top");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "container-fluid");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Brand and toggle get grouped for better mobile display ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "navbar-header");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "type", "button");
        dom.setAttribute(el4, "class", "navbar-toggle collapsed");
        dom.setAttribute(el4, "data-toggle", "collapse");
        dom.setAttribute(el4, "data-target", "#bs-example-navbar-collapse-1");
        dom.setAttribute(el4, "aria-expanded", "false");
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "sr-only");
        var el6 = dom.createTextNode("Toggle navigation");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "class", "navbar-brand navbar-font-color");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Collect the nav links, forms, and other content for toggling ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "collapse navbar-collapse");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        dom.setAttribute(el4, "class", "navbar-text navbar-right navbar-font-color");
        var el5 = dom.createTextNode("Logged in as ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("    ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" /.navbar-collapse ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" /.container-fluid ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container-fluid");
        dom.setAttribute(el1, "id", "section1");
        var el2 = dom.createTextNode("\n  \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row content-box");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-xs-2 col-md-2 side-nav well ");
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("table");
        dom.setAttribute(el4, "class", "nav-table");
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tr");
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        dom.setAttribute(el6, "class", "nav-icon bk-red");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "glyphicon glyphicon-info-sign ");
        dom.setAttribute(el7, "aria-hidden", "true");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        dom.setAttribute(el6, "class", "nav-lable");
        var el7 = dom.createTextNode(" System Information\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "glyphicon glyphicon-chevron-right right");
        dom.setAttribute(el7, "aria-hidden", "true");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n              ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tr");
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        dom.setAttribute(el6, "class", "nav-icon bk-orange");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "glyphicon glyphicon-dashboard icon-bar ");
        dom.setAttribute(el7, "aria-hidden", "true");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        dom.setAttribute(el6, "class", "nav-lable");
        dom.setAttribute(el6, "id", "dashboard");
        var el7 = dom.createTextNode(" Dashboard\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "glyphicon glyphicon-plus right");
        dom.setAttribute(el7, "aria-hidden", "true");
        dom.setAttribute(el7, "id", "dashboard-chevron");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n              ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tr");
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        dom.setAttribute(el6, "class", "nav-icon bk-green");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "glyphicon glyphicon-retweet ");
        dom.setAttribute(el7, "aria-hidden", "true");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        dom.setAttribute(el6, "class", "nav-lable");
        var el7 = dom.createTextNode(" System Switch\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "glyphicon glyphicon-chevron-right right");
        dom.setAttribute(el7, "aria-hidden", "true");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n              ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tr");
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        dom.setAttribute(el6, "class", "nav-icon bk-cran");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "glyphicon glyphicon-list-alt ");
        dom.setAttribute(el7, "aria-hidden", "true");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        dom.setAttribute(el6, "class", "nav-lable");
        var el7 = dom.createTextNode(" Report\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "glyphicon glyphicon-chevron-right right");
        dom.setAttribute(el7, "aria-hidden", "true");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n              ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tr");
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        dom.setAttribute(el6, "class", "nav-icon bk-blue");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "glyphicon glyphicon-knight ");
        dom.setAttribute(el7, "aria-hidden", "true");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        dom.setAttribute(el6, "class", "nav-lable");
        var el7 = dom.createTextNode(" Support\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "glyphicon glyphicon-chevron-right right");
        dom.setAttribute(el7, "aria-hidden", "true");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n              ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tr");
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        dom.setAttribute(el6, "class", "nav-icon bk-purple");
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "glyphicon glyphicon-off ");
        dom.setAttribute(el7, "aria-hidden", "true");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n              ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        dom.setAttribute(el6, "class", "nav-lable");
        var el7 = dom.createTextNode(" Log Out\n                  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "glyphicon glyphicon-chevron-right right");
        dom.setAttribute(el7, "aria-hidden", "true");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n              ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-xs-2 col-md-10 col-xs-offset-2 col-md-offset-2 ");
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "well");
        var el5 = dom.createTextNode("\n    ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "type", "button");
        dom.setAttribute(el5, "class", " toTop btn btn-default btn-lg");
        var el6 = dom.createTextNode("\n\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6, "class", "glyphicon glyphicon-arrow-up");
        dom.setAttribute(el6, "aria-hidden", "true");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n      ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n    ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n          \n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element7 = dom.childAt(fragment, [1, 1]);
        var element8 = dom.childAt(element7, [3, 3]);
        var element9 = dom.childAt(fragment, [3, 1]);
        var element10 = dom.childAt(element9, [1, 1]);
        var element11 = dom.childAt(element10, [1, 3]);
        var element12 = dom.childAt(element10, [3, 3]);
        var element13 = dom.childAt(element10, [11, 3]);
        var element14 = dom.childAt(element10, [13, 3]);
        var element15 = dom.childAt(element10, [15, 3]);
        var element16 = dom.childAt(element10, [17, 3]);
        var element17 = dom.childAt(element9, [3, 1]);
        var element18 = dom.childAt(element17, [3]);
        var morphs = new Array(14);
        morphs[0] = dom.createMorphAt(element8, 1, 1);
        morphs[1] = dom.createMorphAt(element8, 2, 2);
        morphs[2] = dom.createMorphAt(dom.childAt(element7, [7, 1]), 1, 1);
        morphs[3] = dom.createAttrMorph(element11, 'onclick');
        morphs[4] = dom.createAttrMorph(element12, 'onclick');
        morphs[5] = dom.createMorphAt(element10, 5, 5);
        morphs[6] = dom.createMorphAt(element10, 7, 7);
        morphs[7] = dom.createMorphAt(element10, 9, 9);
        morphs[8] = dom.createAttrMorph(element13, 'onclick');
        morphs[9] = dom.createAttrMorph(element14, 'onclick');
        morphs[10] = dom.createAttrMorph(element15, 'onclick');
        morphs[11] = dom.createAttrMorph(element16, 'onclick');
        morphs[12] = dom.createMorphAt(element17, 1, 1);
        morphs[13] = dom.createElementMorph(element18);
        return morphs;
      },
      statements: [["block", "if", [["get", "isLeave", ["loc", [null, [14, 14], [14, 21]]]]], [], 0, null, ["loc", [null, [14, 8], [16, 15]]]], ["block", "if", [["get", "isTravel", ["loc", [null, [17, 14], [17, 22]]]]], [], 1, null, ["loc", [null, [17, 8], [19, 15]]]], ["content", "user", ["loc", [null, [25, 75], [25, 83]]]], ["attribute", "onclick", ["subexpr", "action", ["navi", "sysInfo"], [], ["loc", [null, [40, 44], [40, 71]]]]], ["attribute", "onclick", ["subexpr", "action", ["toggleExpand"], [], ["loc", [null, [47, 44], [47, 69]]]]], ["block", "if", [["get", "dashboardExpand", ["loc", [null, [51, 18], [51, 33]]]]], [], 2, null, ["loc", [null, [51, 12], [65, 19]]]], ["block", "if", [["get", "isLeave", ["loc", [null, [68, 18], [68, 25]]]]], [], 3, null, ["loc", [null, [68, 12], [82, 19]]]], ["block", "if", [["get", "isTravel", ["loc", [null, [84, 18], [84, 26]]]]], [], 4, null, ["loc", [null, [84, 12], [98, 19]]]], ["attribute", "onclick", ["subexpr", "action", ["switch"], [], ["loc", [null, [104, 44], [104, 63]]]]], ["attribute", "onclick", ["subexpr", "action", ["navi", "report"], [], ["loc", [null, [111, 44], [111, 70]]]]], ["attribute", "onclick", ["subexpr", "action", ["navi", "support"], [], ["loc", [null, [118, 44], [118, 71]]]]], ["attribute", "onclick", ["subexpr", "action", ["logout"], [], ["loc", [null, [125, 44], [125, 63]]]]], ["content", "yield", ["loc", [null, [136, 4], [136, 13]]]], ["element", "action", ["jumpToTop"], [], ["loc", [null, [137, 14], [137, 36]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  })());
});
define('shin-ui/pods/dashboard/leave/controller', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		dashboardData: _ember['default'].inject.service('dashboard-data'),
		tbHead: [" ", "Draft", "Pending", "Approved", "Rejected", "Cancelled", "Total"],
		rowHead: ["Annual", "Sick", "Total"],
		listController: _ember['default'].inject.controller('leave.list'),

		actions: {
			listLeaves: function listLeaves(position) {
				console.log(position);
				position.row = this.get('dashboardData').firstCaseChg(position.row, 0);
				this.transitionToRoute('/leave/list/' + position.category + '/' + position.row + '/' + position.col);
			}

		}
	});
});
define('shin-ui/pods/dashboard/leave/route', ['exports', 'ember'], function (exports, _ember) {
			exports['default'] = _ember['default'].Route.extend({
						ajaxGeneric: _ember['default'].inject.service('ajax-generic'),
						model: function model() {
									var data = {
												cmd: 'leaveDashboard'
									};

									var appController = this.controllerFor('application');
									var controller = this.controllerFor('dashboard.leave');
									this.get('ajaxGeneric').post(data, appController).then(function (response) {
												var createdByMe = response.createdByMe;
												var pendOnMe = response.pendOnMe;

												var rowHead = controller.get('rowHead');
												var tbHead = controller.get('tbHead');
												tbHead[0] = "type";
												for (var i = 1; i < tbHead.length; i++) {
															tbHead[i] = controller.get('dashboardData').firstCaseChg(tbHead[i], 0);
												}

												var keyArr = ["draft", "pending", "approved", "rejected", "cancelled"];

												createdByMe = controller.get('dashboardData').calcTotal(createdByMe, keyArr);
												pendOnMe = controller.get('dashboardData').calcTotal(pendOnMe, keyArr);

												createdByMe = controller.get('dashboardData').convert(createdByMe, tbHead, rowHead, "header", "clkCell");
												pendOnMe = controller.get('dashboardData').convert(pendOnMe, tbHead, rowHead, "header", "clkCell");

												var model = { createdByMe: createdByMe, pendOnMe: pendOnMe };

												controller.set('model', model);
									});
						}
			});
});
define("shin-ui/pods/dashboard/leave/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "shin-ui/pods/dashboard/leave/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 5, 5, contextualElement);
        return morphs;
      },
      statements: [["inline", "dash-board", [], ["category", "createdByMe", "list", ["subexpr", "action", ["listLeaves"], [], ["loc", [null, [2, 41], [2, 62]]]], "header", "Leaves Created by Me", "tbHead", ["subexpr", "@mut", [["get", "tbHead", ["loc", [null, [2, 100], [2, 106]]]]], [], []], "rowHead", ["subexpr", "@mut", [["get", "rowHead", ["loc", [null, [2, 115], [2, 122]]]]], [], []], "tbBody", ["subexpr", "@mut", [["get", "model.createdByMe", ["loc", [null, [2, 130], [2, 147]]]]], [], []]], ["loc", [null, [2, 0], [2, 149]]]], ["inline", "dash-board", [], ["category", "pendOnMe", "list", ["subexpr", "action", ["listLeaves"], [], ["loc", [null, [4, 38], [4, 59]]]], "header", "Leaves Pend On Me", "tbHead", ["subexpr", "@mut", [["get", "tbHead", ["loc", [null, [4, 94], [4, 100]]]]], [], []], "rowHead", ["subexpr", "@mut", [["get", "rowHead", ["loc", [null, [4, 109], [4, 116]]]]], [], []], "tbBody", ["subexpr", "@mut", [["get", "model.pendOnMe", ["loc", [null, [4, 124], [4, 138]]]]], [], []]], ["loc", [null, [4, 0], [4, 140]]]], ["content", "outlet", ["loc", [null, [6, 0], [6, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('shin-ui/pods/dashboard/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define("shin-ui/pods/dashboard/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 10
          }
        },
        "moduleName": "shin-ui/pods/dashboard/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [4, 0], [4, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('shin-ui/pods/leave/create/controller', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		staffName: null,
		startDate: null,
		endDate: null,
		leaveType: "Annual",
		startHalf: 'AM',
		endHalf: 'AM',
		halfDays: ['AM', 'PM'],
		isCoreLeave: 0,
		leaveTypes: ["Annual", "Sick"],
		// errorMsg: null,
		isError: null,
		dateValidation: null,
		comments: null,
		appController: _ember['default'].inject.controller('application'),
		ajaxGeneric: _ember['default'].inject.service('ajax-generic'),
		initialize: (function () {
			_ember['default'].$.fn.datepicker.defaults.format = "yyyy/mm/dd";
		}).on('init'),

		leaveDays: (function () {
			var startDate = this.get('startDate');
			var endDate = this.get('endDate');
			var startHalf = this.get('startHalf');
			var endHalf = this.get('endHalf');

			if (typeof startDate === "string" && startDate != "" && typeof endDate === "string" && endDate != "") {
				var start = moment(startDate, "YYYY-MM-DD");
				var end = moment(endDate, "YYYY-MM-DD");
				var today = moment();

				if (!start.isSameOrBefore(end, 'day')) {
					this.set('dateValidation', false);
					this.set('errorMsg', "Start day is before end day.");
				} else if (start.isSame(today, 'day') && startHalf === "AM" && today.hour() <= 14 || end.isSame(today, 'day') && endHalf === "AM" && today.hour() <= 14 || start.isSame(today, 'day') && today.hour() > 14 || end.isSame(today, 'day') && today.hour() > 14) {
					this.set('dateValidation', false);
					this.set('errorMsg', "Start/end date is before current time.");
				} else if (start.isBefore(today, 'day') || end.isBefore(today, 'day')) {
					this.set('dateValidation', false);
					this.set('errorMsg', "Start/end day is before today.");
				} else if (start.isSame(end, 'day') && startHalf === "PM" && endHalf === "AM") {
					this.set('dateValidation', false);
					this.set('errorMsg', "Start date is before end date(PM/AM).");
				} else if (start.day() === 0 || start.day() === 6 || end.day() === 0 || end.day() === 6) {
					this.set('dateValidation', false);
					this.set('errorMsg', "Start/end day is Sun or Sat.");
				} else {
					var total = end.diff(start, 'days');
					if (total > 5) {
						var first = start.clone().endOf('week'); // end of first week
						var last = end.clone().startOf('week'); // start of last week
						var days = last.diff(first, 'days') * 5 / 7; // this will always multiply of 7
						var wfirst = first.day() - start.day(); // check first week
						if (start.day() == 0) --wfirst; // -1 if start with sunday
						var wlast = end.day() - last.day(); // check last week
						if (end.day() == 6) --wlast; // -1 if end with saturday
						total = wfirst + days + wlast; // get the total
					} else {
							total++;
						}

					total = total * 2;

					if (startHalf === "PM") {
						total = total - 1;
					}
					if (endHalf === "AM") {
						total = total - 1;
					}
					this.set('dateValidation', true);
					this.set('errorMsg', "");
					return total;
				}
			} else {
				this.set('dateValidation', false);
				this.set('errorMsg', "Please Input a valid leave duration.");
				return null;
			}
		}).property('startDate', 'endDate', 'startHalf', 'endHalf'),

		leaveDaysValidation: (function () {
			var leaveType = this.get('leaveType');
			var leaveDays = this.get('leaveDays');
			var model = this.get('model');
			if (leaveDays != null) {
				if (leaveType === "Annual") {
					var entitle = this.get('model').leaveEntitlements[0];
					var entitlement = entitle.entitlement;
					var balance = entitle.balance;
				}
				if (leaveType === "Sick") {
					var entitle = this.get('model').leaveEntitlements[1];
					var entitlement = entitle.entitlement;
					var balance = entitle.balance;
				}

				if (leaveDays > entitlement) {
					this.set('errorMsg', "Request Days is more than entitlement days.");
					return false;
				} else if (leaveDays > balance) {
					this.set('errorMsg', "Request Days is more than balance days.");
					return false;
				}

				return true;
			} else {
				return false;
			}
		}).property('leaveType', 'leaveDays'),

		submitDisabled: "disabled",
		isSubmit: (function () {
			if (this.get('dateValidation') && this.get('leaveDaysValidation')) {
				this.set('submitDisabled', false);
				return true;
			} else {
				this.set('submitDisabled', "disabled");
				return false;
			}
		}).property('dateValidation', 'leaveDaysValidation'),

		actions: {
			leaveTypeChange: function leaveTypeChange() {
				var leaveType = _ember['default'].$("#leaveType").val();
				this.set('leaveType', leaveType);
			},

			startHalfChange: function startHalfChange() {
				var startHalf = _ember['default'].$("#startHalf").val();
				this.set('startHalf', startHalf);
			},
			endHalfChange: function endHalfChange() {
				var endHalf = _ember['default'].$("#endHalf").val();
				this.set('endHalf', endHalf);
			},

			coreLeaveChange: function coreLeaveChange() {
				var isCoreLeave = _ember['default'].$("#isCoreLeave").val();
				this.set('isCoreLeave', isCoreLeave);
			},

			submit: function submit(type) {

				var data = {
					cmd: 'createLeave',
					username: this.get('currentUser').username,
					createType: type,
					leave: {
						requestorId: this.get('currentUser').username,
						requestorName: this.get('currentUser').staffName,
						title: this.get('currentUser').title,
						startDate: this.get('startDate'),
						startHalf: this.get('startHalf'),
						endDate: this.get('endDate'),
						endHalf: this.get('endHalf'),
						leaveDays: this.get('leaveDays'),
						leaveType: this.get('leaveType'),
						isCoreLeave: this.get('isCoreLeave'),
						comments: this.get('comments'),
						createTime: moment().format("YYYY/MM/DD HH:mm:ss")
					}

				};
				var _this = this;
				var appController = this.get('appController');
				this.get('ajaxGeneric').post(data, appController).then(function (response) {
					appController.get('modalShow').show(appController, "Submit success!", "success", "Approve link is " + response.approveLink, true, "#alertModal");
				});
			}
		}
	});
});
define('shin-ui/pods/leave/create/model', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		user: _emberData['default'].belongsTo('user'),
		leaveEntitlement: _emberData['default'].hasMany('leaveEntitlement')
	});
});
define('shin-ui/pods/leave/create/route', ['exports', 'ember'], function (exports, _ember) {
		exports['default'] = _ember['default'].Route.extend({
				ajaxGeneric: _ember['default'].inject.service('ajax-generic'),
				model: function model() {
						var data_le = {
								cmd: 'leaveEntitle'
						};
						var data_ui = {
								cmd: 'refresh'
						};
						var controller = this.controllerFor('leave.create');
						var appController = this.controllerFor('application');

						this.get('ajaxGeneric').post(data_le, appController).then(function (response) {
								controller.set('model', response);
						});

						this.get('ajaxGeneric').post(data_ui, appController).then(function (response) {
								controller.set('currentUser', response);
						});
				}
		});
});
define("shin-ui/pods/leave/create/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 25,
              "column": 5
            },
            "end": {
              "line": 35,
              "column": 5
            }
          },
          "moduleName": "shin-ui/pods/leave/create/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("					");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n						");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n						");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n						");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n						");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n						");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n						");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n						");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(7);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]), 0, 0);
          morphs[3] = dom.createMorphAt(dom.childAt(element0, [7]), 0, 0);
          morphs[4] = dom.createMorphAt(dom.childAt(element0, [9]), 0, 0);
          morphs[5] = dom.createMorphAt(dom.childAt(element0, [11]), 0, 0);
          morphs[6] = dom.createMorphAt(dom.childAt(element0, [13]), 0, 0);
          return morphs;
        },
        statements: [["content", "lvEn.type", ["loc", [null, [27, 10], [27, 23]]]], ["content", "lvEn.unit", ["loc", [null, [28, 10], [28, 23]]]], ["content", "lvEn.entitlement", ["loc", [null, [29, 10], [29, 30]]]], ["content", "lvEn.pending", ["loc", [null, [30, 10], [30, 26]]]], ["content", "lvEn.taken", ["loc", [null, [31, 10], [31, 24]]]], ["content", "lvEn.balance", ["loc", [null, [32, 10], [32, 26]]]], ["content", "lvEn.expirationDate", ["loc", [null, [33, 10], [33, 33]]]]],
        locals: ["lvEn"],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 47,
              "column": 3
            },
            "end": {
              "line": 51,
              "column": 3
            }
          },
          "moduleName": "shin-ui/pods/leave/create/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "col-lg-7 col-lg-offset-1");
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "alert alert-danger");
          dom.setAttribute(el2, "role", "alert");
          var el3 = dom.createTextNode("Error! ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 1, 1);
          return morphs;
        },
        statements: [["content", "errorMsg", ["loc", [null, [49, 57], [49, 69]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 163,
            "column": 0
          }
        },
        "moduleName": "shin-ui/pods/leave/create/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "page-header");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        var el3 = dom.createTextNode("Create Leave");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "sub-header");
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("Leave Entitlement");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-lg-1");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-lg-10");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("table");
        dom.setAttribute(el3, "class", "table table-bordered");
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("thead");
        var el5 = dom.createTextNode("\n					");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tr");
        var el6 = dom.createTextNode("\n						");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        var el7 = dom.createTextNode("Type");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n						");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        var el7 = dom.createTextNode("Unit");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n						");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        var el7 = dom.createTextNode("Entitlement");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n						");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        var el7 = dom.createTextNode("Pending");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n						");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        var el7 = dom.createTextNode("Taken");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n						");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        var el7 = dom.createTextNode("Balance");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n						");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        var el7 = dom.createTextNode("Expiration");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tbody");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("				");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "sub-header");
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("Submit Leave Request");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	\n		");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n			");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-lg-4 right");
        var el3 = dom.createTextNode("\n				");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "btn-group right");
        dom.setAttribute(el3, "role", "group");
        var el4 = dom.createTextNode("\n					");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "type", "submit");
        dom.setAttribute(el4, "class", "btn btn-primary btn-lg ");
        var el5 = dom.createTextNode("Submit");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("			\n					");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "type", "submit");
        dom.setAttribute(el4, "class", "btn btn-default btn-lg ");
        var el5 = dom.createTextNode("Save");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("			\n				");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.setAttribute(el1, "class", "divider");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-md-2 col-sm-4 create-label");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "create-label-group");
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "create-label-item");
        var el5 = dom.createTextNode("Requestor ID");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "create-label-item");
        var el5 = dom.createTextNode("Requestor Name");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "create-label-item");
        var el5 = dom.createTextNode("Requestor Title");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "create-label-item");
        var el5 = dom.createTextNode("Approver Name");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "create-label-item");
        var el5 = dom.createTextNode("Comments");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-md-3 col-sm-6 create-data");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "create-data-group");
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "input-group create-data-input");
        var el5 = dom.createTextNode("\n					");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "input-group create-data-input");
        var el5 = dom.createTextNode("\n					");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "input-group create-data-input");
        var el5 = dom.createTextNode("\n					");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "input-group create-data-input ");
        var el5 = dom.createTextNode("\n					");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "input-group create-data-input");
        var el5 = dom.createTextNode("\n					");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		\n\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-md-2 col-sm-4 create-label");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "create-label-group");
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "create-label-item");
        var el5 = dom.createTextNode("Leave Type");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "create-label-item");
        var el5 = dom.createTextNode("Is Core Leave");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "create-label-item");
        var el5 = dom.createTextNode("Start Date");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "create-label-item");
        var el5 = dom.createTextNode("End Date");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "create-label-item");
        var el5 = dom.createTextNode("Leave Days");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-md-4 col-sm-6 create-data");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "create-data-group");
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "input-group create-data-input");
        var el5 = dom.createTextNode("\n					");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5, "class", "form-control");
        dom.setAttribute(el5, "id", "leaveType");
        var el6 = dom.createTextNode("\n						");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6, "value", "Annual");
        var el7 = dom.createTextNode("Annual");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n						");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6, "value", "Sick");
        var el7 = dom.createTextNode("Sick");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "input-group create-data-input");
        var el5 = dom.createTextNode("\n					");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5, "class", "form-control");
        dom.setAttribute(el5, "id", "isCoreLeave");
        var el6 = dom.createTextNode("\n						");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6, "value", "0");
        var el7 = dom.createTextNode("NO");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n						");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6, "value", "1");
        var el7 = dom.createTextNode("YES");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "input-group date create-data-input");
        dom.setAttribute(el4, "data-provide", "datepicker");
        var el5 = dom.createTextNode("\n					");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n					");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "input-group-addon");
        var el6 = dom.createTextNode("\n					   ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6, "class", "glyphicon glyphicon-calendar");
        dom.setAttribute(el6, "aria-hidden", "true");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n					");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5, "class", "form-control");
        dom.setAttribute(el5, "id", "startHalf");
        var el6 = dom.createTextNode("\n						");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6, "value", "AM");
        var el7 = dom.createTextNode("AM");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n						");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6, "value", "PM");
        var el7 = dom.createTextNode("PM");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "input-group date create-data-input");
        dom.setAttribute(el4, "data-provide", "datepicker");
        var el5 = dom.createTextNode("\n					");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n					");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "input-group-addon");
        var el6 = dom.createTextNode("\n					   ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6, "class", "glyphicon glyphicon-calendar");
        dom.setAttribute(el6, "aria-hidden", "true");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n					");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("select");
        dom.setAttribute(el5, "class", "form-control");
        dom.setAttribute(el5, "id", "endHalf");
        var el6 = dom.createTextNode("\n						");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6, "value", "AM");
        var el7 = dom.createTextNode("AM");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n						");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("option");
        dom.setAttribute(el6, "value", "PM");
        var el7 = dom.createTextNode("PM");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n				");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "input-group create-data-input");
        var el5 = dom.createTextNode("\n					");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n					");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5, "class", "input-group-addon");
        var el6 = dom.createTextNode("HWD");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [9]);
        var element2 = dom.childAt(element1, [3, 1]);
        var element3 = dom.childAt(element2, [1]);
        var element4 = dom.childAt(element2, [3]);
        var element5 = dom.childAt(fragment, [13]);
        var element6 = dom.childAt(element5, [3, 1]);
        var element7 = dom.childAt(element5, [7, 1]);
        var element8 = dom.childAt(element7, [1, 1]);
        var element9 = dom.childAt(element7, [3, 1]);
        var element10 = dom.childAt(element7, [5]);
        var element11 = dom.childAt(element10, [5]);
        var element12 = dom.childAt(element7, [7]);
        var element13 = dom.childAt(element12, [5]);
        var morphs = new Array(19);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [5, 3, 1, 3]), 1, 1);
        morphs[1] = dom.createMorphAt(element1, 1, 1);
        morphs[2] = dom.createAttrMorph(element3, 'disabled');
        morphs[3] = dom.createElementMorph(element3);
        morphs[4] = dom.createAttrMorph(element4, 'disabled');
        morphs[5] = dom.createElementMorph(element4);
        morphs[6] = dom.createMorphAt(dom.childAt(element6, [1]), 1, 1);
        morphs[7] = dom.createMorphAt(dom.childAt(element6, [3]), 1, 1);
        morphs[8] = dom.createMorphAt(dom.childAt(element6, [5]), 1, 1);
        morphs[9] = dom.createMorphAt(dom.childAt(element6, [7]), 1, 1);
        morphs[10] = dom.createMorphAt(dom.childAt(element6, [9]), 1, 1);
        morphs[11] = dom.createAttrMorph(element8, 'onchange');
        morphs[12] = dom.createAttrMorph(element9, 'onchange');
        morphs[13] = dom.createMorphAt(element10, 1, 1);
        morphs[14] = dom.createAttrMorph(element11, 'onchange');
        morphs[15] = dom.createMorphAt(element12, 1, 1);
        morphs[16] = dom.createAttrMorph(element13, 'onchange');
        morphs[17] = dom.createMorphAt(dom.childAt(element7, [9]), 1, 1);
        morphs[18] = dom.createMorphAt(fragment, 15, 15, contextualElement);
        return morphs;
      },
      statements: [["block", "each", [["get", "model.leaveEntitlements", ["loc", [null, [25, 13], [25, 36]]]]], [], 0, null, ["loc", [null, [25, 5], [35, 14]]]], ["block", "unless", [["get", "isSubmit", ["loc", [null, [47, 13], [47, 21]]]]], [], 1, null, ["loc", [null, [47, 3], [51, 14]]]], ["attribute", "disabled", ["get", "submitDisabled", ["loc", [null, [55, 99], [55, 113]]]]], ["element", "action", ["submit", "submit"], [], ["loc", [null, [55, 59], [55, 87]]]], ["attribute", "disabled", ["get", "submitDisabled", ["loc", [null, [56, 97], [56, 111]]]]], ["element", "action", ["submit", "save"], [], ["loc", [null, [56, 59], [56, 85]]]], ["inline", "input", [], ["type", "text", "class", "form-control", "value", ["subexpr", "@mut", [["get", "currentUser.username", ["loc", [null, [79, 52], [79, 72]]]]], [], []], "disabled", "true"], ["loc", [null, [79, 5], [79, 90]]]], ["inline", "input", [], ["type", "text", "class", "form-control", "value", ["subexpr", "@mut", [["get", "currentUser.staffName", ["loc", [null, [82, 52], [82, 73]]]]], [], []], "disabled", "true"], ["loc", [null, [82, 5], [82, 91]]]], ["inline", "input", [], ["type", "text", "class", "form-control", "value", ["subexpr", "@mut", [["get", "currentUser.title", ["loc", [null, [85, 52], [85, 69]]]]], [], []], "disabled", "true"], ["loc", [null, [85, 5], [85, 87]]]], ["inline", "input", [], ["type", "text", "class", "form-control", "value", ["subexpr", "@mut", [["get", "currentUser.approverName", ["loc", [null, [88, 52], [88, 76]]]]], [], []], "disabled", "true"], ["loc", [null, [88, 5], [88, 94]]]], ["inline", "textarea", [], ["class", "form-control min-text", "rows", "3", "value", ["subexpr", "@mut", [["get", "comments", ["loc", [null, [91, 62], [91, 70]]]]], [], []]], ["loc", [null, [91, 5], [91, 72]]]], ["attribute", "onchange", ["subexpr", "action", ["leaveTypeChange"], [], ["loc", [null, [111, 58], [111, 86]]]]], ["attribute", "onchange", ["subexpr", "action", ["coreLeaveChange"], [], ["loc", [null, [119, 60], [119, 88]]]]], ["inline", "input", [], ["type", "text", "class", "form-control", "value", ["subexpr", "@mut", [["get", "startDate", ["loc", [null, [126, 53], [126, 62]]]]], [], []], "required", "true"], ["loc", [null, [126, 5], [126, 80]]]], ["attribute", "onchange", ["subexpr", "action", ["startHalfChange"], [], ["loc", [null, [130, 58], [130, 86]]]]], ["inline", "input", [], ["type", "text", "class", "form-control", "value", ["subexpr", "@mut", [["get", "endDate", ["loc", [null, [137, 53], [137, 60]]]]], [], []]], ["loc", [null, [137, 5], [137, 62]]]], ["attribute", "onchange", ["subexpr", "action", ["endHalfChange"], [], ["loc", [null, [141, 56], [141, 82]]]]], ["inline", "input", [], ["type", "text", "class", "form-control", "value", ["subexpr", "@mut", [["get", "leaveDays", ["loc", [null, [149, 52], [149, 61]]]]], [], []], "disabled", "true"], ["loc", [null, [149, 5], [149, 79]]]], ["content", "outlet", ["loc", [null, [162, 0], [162, 10]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define('shin-ui/pods/leave/details/controller', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		initialize: (function () {
			// this.get('homeController').set('classNames.leaveListClass', 'active');

		}).on('init'),
		isCreateComments: false,
		isCancelComments: false,
		isApproveComments: false,
		isRejectComments: false,
		appController: _ember['default'].inject.controller('application'),
		ajaxGeneric: _ember['default'].inject.service('ajax-generic'),
		modalShow: _ember['default'].inject.service('modal-show'),
		actions: {
			confirmReq: function confirmReq(msg) {
				console.log('confirmReq');
				this.set('confirmMsg', msg);
				// Ember.$('#confirmModal').modal();
				_ember['default'].$('#confirmModal').appendTo("body").modal('show');
			},

			confirm: function confirm(params) {
				var leaveId = this.get('model').leave.leaveId;
				var leaves = [];
				leaves.push(leaveId);
				var reqType = params.reqType;
				var comments = params.comments;

				var _this = this;
				var appController = this.get('appController');

				var data = {
					cmd: reqType + 'Leave',
					leaves: leaves,
					comments: comments

				};

				this.get('ajaxGeneric').post(data, appController).then(function (response) {
					appController.get('modalShow').show(appController, "System Message", "success", "Operation success!", true, "#alertModal");
				});
			}
		}

	});
});
define('shin-ui/pods/leave/details/model', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		staffId: _emberData['default'].attr('string'),
		leaveId: _emberData['default'].attr('string'),
		status: _emberData['default'].attr('string'),
		type: _emberData['default'].attr('string'),
		startDate: _emberData['default'].attr('date'),
		endDate: _emberData['default'].attr('date')
	});
});
define('shin-ui/pods/leave/details/route', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({

		ajaxGeneric: _ember['default'].inject.service('ajax-generic'),
		model: function model(params) {

			var data = {
				cmd: 'leaveDetail',
				leaveId: params.leaveId

			};
			var controller = this.controllerFor('leave.details');
			var appController = this.controllerFor('application');

			this.get('ajaxGeneric').post(data, appController).then(function (response) {

				if (response.leave.isCoreLeave) {
					response.leave.isCoreLeave = "Yes";
				} else {
					response.leave.isCoreLeave = "No";
				}

				controller.set('model', response);

				if (response.leave.comments || response.leave.approveComments || response.leave.cancelComments || response.leave.rejectComments) {
					controller.set('isComments', true);
				} else {
					controller.set('isComments', false);
				}

				var data_ui = {
					cmd: 'refresh'
				};
				controller.get('ajaxGeneric').post(data_ui, appController).then(function (response) {
					controller.set('currentUser', response.username);

					var currentUser = controller.get('currentUser');
					var approver = controller.get('model').leave.approverId;
					var requestor = controller.get('model').leave.requestorId;
					var status = controller.get('model').leave.status;

					var isApprove = false;
					var isSubmit = false;
					var isCancel = false;

					if (currentUser === approver && status === "pending") {
						isApprove = true;
					}
					if (currentUser === requestor && status === "pending") {
						isCancel = true;
					}
					if (currentUser === requestor && status === "draft") {
						isSubmit = true;
					}

					controller.set('isApprove', isApprove);
					controller.set('isCancel', isCancel);
					controller.set('isSubmit', isSubmit);
				});
			});
		}
	});
});
define("shin-ui/pods/leave/details/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 4
            },
            "end": {
              "line": 7,
              "column": 4
            }
          },
          "moduleName": "shin-ui/pods/leave/details/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("					");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "type", "submit");
          dom.setAttribute(el1, "class", "btn btn-primary right");
          var el2 = dom.createTextNode("Submit ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element3);
          return morphs;
        },
        statements: [["element", "action", ["confirmReq", "submit"], [], ["loc", [null, [6, 57], [6, 89]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 4
            },
            "end": {
              "line": 11,
              "column": 5
            }
          },
          "moduleName": "shin-ui/pods/leave/details/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("					");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "type", "submit");
          dom.setAttribute(el1, "class", "btn btn-default right");
          var el2 = dom.createTextNode("Cancel ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element2);
          return morphs;
        },
        statements: [["element", "action", ["confirmReq", "cancel"], [], ["loc", [null, [10, 57], [10, 89]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 4
            },
            "end": {
              "line": 16,
              "column": 4
            }
          },
          "moduleName": "shin-ui/pods/leave/details/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("					");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "type", "submit");
          dom.setAttribute(el1, "class", "btn btn-success");
          var el2 = dom.createTextNode("Approve ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n					");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "type", "submit");
          dom.setAttribute(el1, "class", "btn btn-danger");
          var el2 = dom.createTextNode("Reject ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(fragment, [3]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createElementMorph(element1);
          return morphs;
        },
        statements: [["element", "action", ["confirmReq", "approve"], [], ["loc", [null, [14, 51], [14, 85]]]], ["element", "action", ["confirmReq", "reject"], [], ["loc", [null, [15, 50], [15, 83]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 111,
                "column": 1
              },
              "end": {
                "line": 128,
                "column": 1
              }
            },
            "moduleName": "shin-ui/pods/leave/details/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("	");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "row");
            var el2 = dom.createTextNode("\n		\n		");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "col-md-2 col-sm-2 deatil-label");
            var el3 = dom.createTextNode("\n			");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("ul");
            dom.setAttribute(el3, "class", "detail-label-group");
            var el4 = dom.createTextNode("\n			  ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("li");
            dom.setAttribute(el4, "class", "detail-label-item");
            var el5 = dom.createTextNode("Create ");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n			");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n		");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n		");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "col-md-8 col-sm-8 detail-data");
            var el3 = dom.createTextNode("\n			");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("ul");
            dom.setAttribute(el3, "class", "list-group");
            var el4 = dom.createTextNode("\n			  	");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("li");
            dom.setAttribute(el4, "class", "list-group-item");
            var el5 = dom.createTextNode("\n				  		");
            dom.appendChild(el4, el5);
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            var el5 = dom.createTextNode("\n\n				");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n			");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n		");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n	");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3, 1, 1]), 1, 1);
            return morphs;
          },
          statements: [["content", "model.leave.comments", ["loc", [null, [122, 8], [122, 32]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 130,
                "column": 1
              },
              "end": {
                "line": 148,
                "column": 1
              }
            },
            "moduleName": "shin-ui/pods/leave/details/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("	");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "row");
            var el2 = dom.createTextNode("\n\n		");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "col-md-2 col-sm-2 deatil-label");
            var el3 = dom.createTextNode("\n			");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("ul");
            dom.setAttribute(el3, "class", "detail-label-group");
            var el4 = dom.createTextNode("\n			  ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("li");
            dom.setAttribute(el4, "class", "detail-label-item");
            var el5 = dom.createTextNode("Approve ");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n			");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n		");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n		");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "col-md-8 col-sm-8 detail-data");
            var el3 = dom.createTextNode("\n			");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("ul");
            dom.setAttribute(el3, "class", "list-group");
            var el4 = dom.createTextNode("\n			  	");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("li");
            dom.setAttribute(el4, "class", "list-group-item");
            var el5 = dom.createTextNode("\n				  		");
            dom.appendChild(el4, el5);
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            var el5 = dom.createTextNode("\n\n\n				");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n			");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n		");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n	");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3, 1, 1]), 1, 1);
            return morphs;
          },
          statements: [["content", "model.leave.approveComments", ["loc", [null, [141, 8], [141, 39]]]]],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 150,
                "column": 1
              },
              "end": {
                "line": 168,
                "column": 1
              }
            },
            "moduleName": "shin-ui/pods/leave/details/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("	");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "row");
            var el2 = dom.createTextNode("\n\n		");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "col-md-2 col-sm-2 deatil-label");
            var el3 = dom.createTextNode("\n			");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("ul");
            dom.setAttribute(el3, "class", "detail-label-group");
            var el4 = dom.createTextNode("\n			  ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("li");
            dom.setAttribute(el4, "class", "detail-label-item");
            var el5 = dom.createTextNode("Reject ");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n			");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n		");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n		");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "col-md-8 col-sm-8 detail-data");
            var el3 = dom.createTextNode("\n			");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("ul");
            dom.setAttribute(el3, "class", "list-group");
            var el4 = dom.createTextNode("\n			  	");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("li");
            dom.setAttribute(el4, "class", "list-group-item");
            var el5 = dom.createTextNode("\n				  		");
            dom.appendChild(el4, el5);
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            var el5 = dom.createTextNode("\n\n\n				");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n			");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n		");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n		");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3, 1, 1]), 1, 1);
            return morphs;
          },
          statements: [["content", "model.leave.rejectComments", ["loc", [null, [161, 8], [161, 38]]]]],
          locals: [],
          templates: []
        };
      })();
      var child3 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 170,
                "column": 1
              },
              "end": {
                "line": 187,
                "column": 1
              }
            },
            "moduleName": "shin-ui/pods/leave/details/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("	");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "row");
            var el2 = dom.createTextNode("\n		");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "col-md-2 col-sm-2 deatil-label");
            var el3 = dom.createTextNode("\n			");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("ul");
            dom.setAttribute(el3, "class", "detail-label-group");
            var el4 = dom.createTextNode("\n			  ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("li");
            dom.setAttribute(el4, "class", "detail-label-item");
            var el5 = dom.createTextNode("Cancel ");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n			");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n		");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n		");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "col-md-8 col-sm-8 detail-data");
            var el3 = dom.createTextNode("\n			");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("ul");
            dom.setAttribute(el3, "class", "list-group");
            var el4 = dom.createTextNode("\n			  	");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("li");
            dom.setAttribute(el4, "class", "list-group-item");
            var el5 = dom.createTextNode("\n				  		");
            dom.appendChild(el4, el5);
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            var el5 = dom.createTextNode("\n\n\n				");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n			");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n		");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n		");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3, 1, 1]), 1, 1);
            return morphs;
          },
          statements: [["content", "model.leave.cancelComments", ["loc", [null, [180, 8], [180, 38]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 106,
              "column": 0
            },
            "end": {
              "line": 189,
              "column": 0
            }
          },
          "moduleName": "shin-ui/pods/leave/details/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "sub-header");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h2");
          var el3 = dom.createTextNode("Comments");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("	\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 5, 5, contextualElement);
          morphs[2] = dom.createMorphAt(fragment, 7, 7, contextualElement);
          morphs[3] = dom.createMorphAt(fragment, 9, 9, contextualElement);
          return morphs;
        },
        statements: [["block", "if", [["get", "model.leave.comments", ["loc", [null, [111, 7], [111, 27]]]]], [], 0, null, ["loc", [null, [111, 1], [128, 8]]]], ["block", "if", [["get", "model.leave.approveComments", ["loc", [null, [130, 7], [130, 34]]]]], [], 1, null, ["loc", [null, [130, 1], [148, 8]]]], ["block", "if", [["get", "model.leave.rejectComments", ["loc", [null, [150, 7], [150, 33]]]]], [], 2, null, ["loc", [null, [150, 1], [168, 8]]]], ["block", "if", [["get", "model.leave.cancelComments", ["loc", [null, [170, 7], [170, 33]]]]], [], 3, null, ["loc", [null, [170, 1], [187, 8]]]]],
        locals: [],
        templates: [child0, child1, child2, child3]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 191,
            "column": 85
          }
        },
        "moduleName": "shin-ui/pods/leave/details/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "page-header");
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        var el3 = dom.createTextNode("Leave Detail\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "btn-group right");
        dom.setAttribute(el3, "role", "group");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("				\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "sub-header");
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("User Info");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("	\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-md-2 col-sm-4 deatil-label");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "detail-label-group");
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "detail-label-item");
        var el5 = dom.createTextNode("Requestor ID");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "detail-label-item");
        var el5 = dom.createTextNode("Requestor Name");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-md-3 col-sm-6 detail-data");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "list-group");
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "list-group-item");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "list-group-item");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-md-1");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-md-2 col-sm-4 deatil-label");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "detail-label-group");
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "detail-label-item");
        var el5 = dom.createTextNode("Approver ID");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "detail-label-item");
        var el5 = dom.createTextNode("Approver Name");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-md-3 col-sm-6 detail-data");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "list-group");
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "list-group-item");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "list-group-item");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "sub-header");
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("Leave Info");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-md-2 col-sm-4 deatil-label");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "detail-label-group");
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "detail-label-item");
        var el5 = dom.createTextNode("Leave ID");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "detail-label-item");
        var el5 = dom.createTextNode("Leave Type");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "detail-label-item");
        var el5 = dom.createTextNode("Status");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "detail-label-item");
        var el5 = dom.createTextNode("Core Leave");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-md-3 col-sm-6 detail-data");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "list-group");
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "list-group-item");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "list-group-item");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "list-group-item");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "list-group-item");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-md-1");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-md-2 col-sm-4 deatil-label");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "detail-label-group");
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "detail-label-item");
        var el5 = dom.createTextNode("Start Date");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "detail-label-item");
        var el5 = dom.createTextNode("End Date");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "detail-label-item");
        var el5 = dom.createTextNode("Leave Days");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "detail-label-item");
        var el5 = dom.createTextNode("Create Time");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-md-3 col-sm-6 detail-data");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "list-group");
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "list-group-item");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "list-group-item");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "list-group-item");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" HMD");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4, "class", "list-group-item");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element4 = dom.childAt(fragment, [1, 1, 1]);
        var element5 = dom.childAt(fragment, [7]);
        var element6 = dom.childAt(element5, [3, 1]);
        var element7 = dom.childAt(element5, [9, 1]);
        var element8 = dom.childAt(fragment, [11]);
        var element9 = dom.childAt(element8, [3, 1]);
        var element10 = dom.childAt(element8, [9, 1]);
        var element11 = dom.childAt(element10, [1]);
        var element12 = dom.childAt(element10, [3]);
        var morphs = new Array(19);
        morphs[0] = dom.createMorphAt(element4, 1, 1);
        morphs[1] = dom.createMorphAt(element4, 3, 3);
        morphs[2] = dom.createMorphAt(element4, 5, 5);
        morphs[3] = dom.createMorphAt(dom.childAt(element6, [1]), 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(element6, [3]), 0, 0);
        morphs[5] = dom.createMorphAt(dom.childAt(element7, [1]), 0, 0);
        morphs[6] = dom.createMorphAt(dom.childAt(element7, [3]), 0, 0);
        morphs[7] = dom.createMorphAt(dom.childAt(element9, [1]), 0, 0);
        morphs[8] = dom.createMorphAt(dom.childAt(element9, [3]), 0, 0);
        morphs[9] = dom.createMorphAt(dom.childAt(element9, [5]), 0, 0);
        morphs[10] = dom.createMorphAt(dom.childAt(element9, [7]), 0, 0);
        morphs[11] = dom.createMorphAt(element11, 0, 0);
        morphs[12] = dom.createMorphAt(element11, 2, 2);
        morphs[13] = dom.createMorphAt(element12, 0, 0);
        morphs[14] = dom.createMorphAt(element12, 2, 2);
        morphs[15] = dom.createMorphAt(dom.childAt(element10, [5]), 0, 0);
        morphs[16] = dom.createMorphAt(dom.childAt(element10, [7]), 0, 0);
        morphs[17] = dom.createMorphAt(fragment, 13, 13, contextualElement);
        morphs[18] = dom.createMorphAt(fragment, 15, 15, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "isSubmit", ["loc", [null, [5, 10], [5, 18]]]]], [], 0, null, ["loc", [null, [5, 4], [7, 11]]]], ["block", "if", [["get", "isCancel", ["loc", [null, [9, 10], [9, 18]]]]], [], 1, null, ["loc", [null, [9, 4], [11, 12]]]], ["block", "if", [["get", "isApprove", ["loc", [null, [13, 10], [13, 19]]]]], [], 2, null, ["loc", [null, [13, 4], [16, 11]]]], ["content", "model.leave.requestorId", ["loc", [null, [38, 33], [38, 60]]]], ["content", "model.leave.requestorName", ["loc", [null, [39, 33], [39, 62]]]], ["content", "model.leave.approverId", ["loc", [null, [54, 33], [54, 59]]]], ["content", "model.leave.approverName", ["loc", [null, [55, 33], [55, 61]]]], ["content", "model.leave.leaveId", ["loc", [null, [79, 33], [79, 56]]]], ["content", "model.leave.leaveType", ["loc", [null, [80, 33], [80, 58]]]], ["content", "model.leave.status", ["loc", [null, [81, 33], [81, 55]]]], ["content", "model.leave.isCoreLeave", ["loc", [null, [82, 33], [82, 60]]]], ["content", "model.leave.startDate", ["loc", [null, [99, 33], [99, 58]]]], ["content", "model.leave.startHalf", ["loc", [null, [99, 59], [99, 84]]]], ["content", "model.leave.endDate", ["loc", [null, [100, 33], [100, 56]]]], ["content", "model.leave.endHalf", ["loc", [null, [100, 57], [100, 80]]]], ["content", "model.leave.leaveDays", ["loc", [null, [101, 33], [101, 58]]]], ["content", "model.leave.createTime", ["loc", [null, [102, 33], [102, 59]]]], ["block", "if", [["get", "isComments", ["loc", [null, [106, 6], [106, 16]]]]], [], 3, null, ["loc", [null, [106, 0], [189, 7]]]], ["inline", "confirm-modal", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [191, 22], [191, 27]]]]], [], []], "confirmMsg", ["subexpr", "@mut", [["get", "confirmMsg", ["loc", [null, [191, 39], [191, 49]]]]], [], []], "confirmRequest", ["subexpr", "action", ["confirm"], [], ["loc", [null, [191, 65], [191, 83]]]]], ["loc", [null, [191, 0], [191, 85]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define('shin-ui/pods/leave/list/controller', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		detailsController: _ember['default'].inject.controller('leave.details'),
		ajaxGeneric: _ember['default'].inject.service('ajax-generic'),
		appController: _ember['default'].inject.controller('application'),
		multiArr: [],
		isAction: "disabled",
		actions: {
			leaveDetail: function leaveDetail(leaveId) {
				this.transitionToRoute('/leave/details/' + leaveId);
			},

			multi: function multi(leaveId) {
				var multiArr = this.get('multiArr');
				var domLeaveId = "#" + leaveId;
				if ($(domLeaveId).hasClass("info")) {
					$(domLeaveId).removeClass("info");
					multiArr = $.grep(multiArr, function (value) {
						return value != leaveId;
					});
				} else {
					$(domLeaveId).addClass("info");
					multiArr.push(leaveId);
				}
				this.set('multiArr', multiArr);
				if (multiArr.length === 0) {
					this.set('isAction', "disabled");
				} else {
					this.set('isAction', false);
				}
			},

			confirmReq: function confirmReq(msg) {
				console.log('confirmReq');
				this.set('confirmMsg', msg);
				// Ember.$('#confirmModal').modal();
				_ember['default'].$('#confirmModal').appendTo('body').modal('show');
			},

			confirm: function confirm(params) {
				// var leaveId = this.get('model').leave.leaveId;
				var leaves = this.get('multiArr');
				var reqType = params.reqType;
				var comments = params.comments;

				var _this = this;
				var appController = this.get('appController');

				var data = {
					cmd: reqType + 'Leave',
					leaves: leaves,
					comments: comments

				};

				this.get('ajaxGeneric').post(data, appController).then(function (response) {
					appController.get('modalShow').show(appController, "System Message", "success", "Operation success!", true, "#alertModal");
				});
			}
		}

	});
});
define('shin-ui/pods/leave/list/route', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		ajaxGeneric: _ember['default'].inject.service('ajax-generic'),
		model: function model(params) {
			var controller = this.controllerFor('leave.list');
			var appController = this.controllerFor('application');
			console.log(params);
			var category = params.category;
			var type = params.type;
			var status = params.status;

			var data = {
				cmd: "leaveList",
				category: category,
				type: type,
				status: status
			};
			this.get('ajaxGeneric').post(data, appController).then(function (response) {
				controller.set('model', response);

				controller.set('isCancel', false);
				controller.set('isSubmit', false);
				controller.set('isApprove', false);

				if (category === "createdByMe" && status === "pending") {
					controller.set('isCancel', true);
				} else if (category === "createdByMe" && status === "draft") {
					controller.set('isSubmit', true);
				} else if (category === "pendOnMe" && status === "pending") {
					controller.set('isApprove', true);
				}

				console.log(category);
			});
		}
	});
});
define("shin-ui/pods/leave/list/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 1
            },
            "end": {
              "line": 8,
              "column": 1
            }
          },
          "moduleName": "shin-ui/pods/leave/list/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "type", "submit");
          dom.setAttribute(el1, "class", "btn btn-primary right");
          var el2 = dom.createTextNode("Submit ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element4 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element4, 'disabled');
          morphs[1] = dom.createElementMorph(element4);
          return morphs;
        },
        statements: [["attribute", "disabled", ["get", "isAction", ["loc", [null, [7, 98], [7, 106]]]]], ["element", "action", ["confirmReq", "submit"], [], ["loc", [null, [7, 54], [7, 86]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 1
            },
            "end": {
              "line": 12,
              "column": 1
            }
          },
          "moduleName": "shin-ui/pods/leave/list/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "type", "submit");
          dom.setAttribute(el1, "class", "btn btn-default right");
          var el2 = dom.createTextNode("Cancel ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element3, 'disabled');
          morphs[1] = dom.createElementMorph(element3);
          return morphs;
        },
        statements: [["attribute", "disabled", ["get", "isAction", ["loc", [null, [11, 98], [11, 106]]]]], ["element", "action", ["confirmReq", "cancel"], [], ["loc", [null, [11, 54], [11, 86]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 1
            },
            "end": {
              "line": 17,
              "column": 1
            }
          },
          "moduleName": "shin-ui/pods/leave/list/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "type", "submit");
          dom.setAttribute(el1, "class", "btn btn-success");
          var el2 = dom.createTextNode("Approve ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "type", "submit");
          dom.setAttribute(el1, "class", "btn btn-danger");
          var el2 = dom.createTextNode("Reject ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var element2 = dom.childAt(fragment, [3]);
          var morphs = new Array(4);
          morphs[0] = dom.createAttrMorph(element1, 'disabled');
          morphs[1] = dom.createElementMorph(element1);
          morphs[2] = dom.createAttrMorph(element2, 'disabled');
          morphs[3] = dom.createElementMorph(element2);
          return morphs;
        },
        statements: [["attribute", "disabled", ["get", "isAction", ["loc", [null, [15, 94], [15, 102]]]]], ["element", "action", ["confirmReq", "approve"], [], ["loc", [null, [15, 48], [15, 82]]]], ["attribute", "disabled", ["get", "isAction", ["loc", [null, [16, 92], [16, 100]]]]], ["element", "action", ["confirmReq", "reject"], [], ["loc", [null, [16, 47], [16, 80]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 33,
              "column": 3
            },
            "end": {
              "line": 42,
              "column": 3
            }
          },
          "moduleName": "shin-ui/pods/leave/list/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          dom.setAttribute(el1, "class", "detail");
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(9);
          morphs[0] = dom.createAttrMorph(element0, 'id');
          morphs[1] = dom.createAttrMorph(element0, 'ondblclick');
          morphs[2] = dom.createAttrMorph(element0, 'onclick');
          morphs[3] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
          morphs[4] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
          morphs[5] = dom.createMorphAt(dom.childAt(element0, [5]), 0, 0);
          morphs[6] = dom.createMorphAt(dom.childAt(element0, [7]), 0, 0);
          morphs[7] = dom.createMorphAt(dom.childAt(element0, [9]), 0, 0);
          morphs[8] = dom.createMorphAt(dom.childAt(element0, [11]), 0, 0);
          return morphs;
        },
        statements: [["attribute", "id", ["get", "leave.leaveId", ["loc", [null, [34, 28], [34, 41]]]]], ["attribute", "ondblclick", ["subexpr", "action", ["leaveDetail", ["get", "leave.leaveId", ["loc", [null, [34, 78], [34, 91]]]]], [], ["loc", [null, [34, 55], [34, 93]]]]], ["attribute", "onclick", ["subexpr", "action", ["multi", ["get", "leave.leaveId", ["loc", [null, [34, 119], [34, 132]]]]], [], ["loc", [null, [34, 102], [34, 134]]]]], ["content", "leave.leaveId", ["loc", [null, [35, 9], [35, 26]]]], ["content", "leave.staffName", ["loc", [null, [36, 9], [36, 28]]]], ["content", "leave.status", ["loc", [null, [37, 9], [37, 25]]]], ["content", "leave.startDate", ["loc", [null, [38, 9], [38, 28]]]], ["content", "leave.endDate", ["loc", [null, [39, 9], [39, 26]]]], ["content", "leave.leaveType", ["loc", [null, [40, 9], [40, 28]]]]],
        locals: ["leave"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 47,
            "column": 0
          }
        },
        "moduleName": "shin-ui/pods/leave/list/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "page-header");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        var el3 = dom.createElement("span");
        dom.setAttribute(el3, "class", "label label-primary");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "btn-group right");
        dom.setAttribute(el2, "role", "group");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("	\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n	");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1, "class", "table table-striped table-hover");
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("thead");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Leave ID");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Staff Name");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Status");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Start Date");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("End Date");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Leave Type");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("tbody");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element5 = dom.childAt(fragment, [1]);
        var element6 = dom.childAt(element5, [3]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(dom.childAt(element5, [1, 0]), 0, 0);
        morphs[1] = dom.createMorphAt(element6, 1, 1);
        morphs[2] = dom.createMorphAt(element6, 3, 3);
        morphs[3] = dom.createMorphAt(element6, 5, 5);
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [3, 3]), 1, 1);
        morphs[5] = dom.createMorphAt(fragment, 5, 5, contextualElement);
        return morphs;
      },
      statements: [["content", "header", ["loc", [null, [3, 38], [3, 48]]]], ["block", "if", [["get", "isSubmit", ["loc", [null, [6, 7], [6, 15]]]]], [], 0, null, ["loc", [null, [6, 1], [8, 8]]]], ["block", "if", [["get", "isCancel", ["loc", [null, [10, 7], [10, 15]]]]], [], 1, null, ["loc", [null, [10, 1], [12, 8]]]], ["block", "if", [["get", "isApprove", ["loc", [null, [14, 7], [14, 16]]]]], [], 2, null, ["loc", [null, [14, 1], [17, 8]]]], ["block", "each", [["get", "model.leaves", ["loc", [null, [33, 11], [33, 23]]]]], [], 3, null, ["loc", [null, [33, 3], [42, 12]]]], ["inline", "confirm-modal", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [46, 22], [46, 27]]]]], [], []], "confirmMsg", ["subexpr", "@mut", [["get", "confirmMsg", ["loc", [null, [46, 39], [46, 49]]]]], [], []], "confirmRequest", ["subexpr", "action", ["confirm"], [], ["loc", [null, [46, 65], [46, 83]]]]], ["loc", [null, [46, 0], [46, 85]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define('shin-ui/pods/leave/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define("shin-ui/pods/leave/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "shin-ui/pods/leave/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('shin-ui/pods/login/controller', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		ajaxGeneric: _ember['default'].inject.service('ajax-generic'),
		modalShow: _ember['default'].inject.service('modal-show'),
		appController: _ember['default'].inject.controller('application'),
		username: "",
		password: "",
		errorMessage: "",
		loginSystem: "leave",
		init: function init() {
			$('body').addClass(this.get('loginSystem'));
		},

		actions: {
			switchSystem: function switchSystem() {
				var loginSystem = _ember['default'].$("#loginSystem").val();
				$('body').removeClass(this.get('loginSystem'));
				this.set('loginSystem', loginSystem);
				$('body').addClass(this.get('loginSystem'));
			},
			validate: function validate() {
				var controller = this.controllerFor('login');
				var appController = this.controllerFor('application');

				if (this.controllerFor("login").get('username').toString() === "" || this.controllerFor("login").get('password').toString() === "") {
					appController.get('modalShow').show(appController, "Log In Fail", "error", "Please input staff id and password!", false, "#alertModal");
				} else {
					var data = {
						cmd: 'login',
						username: this.controllerFor("login").get('username'),
						password: this.controllerFor("login").get('password'),
						loginSystem: this.controllerFor("login").get('loginSystem')
					};

					this.get('ajaxGeneric').post(data, appController).then(function (response) {
						// controller.set('validateResult', true);
						controller.transitionToRoute('/sysInfo');
					});
				}
			}
		}

	});
});
define('shin-ui/pods/login/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define("shin-ui/pods/login/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 10
          }
        },
        "moduleName": "shin-ui/pods/login/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container loginBox ");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        dom.setAttribute(el3, "class", "form-signin");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("select");
        dom.setAttribute(el4, "class", "form-control");
        dom.setAttribute(el4, "id", "loginSystem");
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("option");
        dom.setAttribute(el5, "value", "leave");
        var el6 = dom.createTextNode("Leave");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("option");
        dom.setAttribute(el5, "value", "travel");
        var el6 = dom.createTextNode("Travel");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "class", "btn btn-lg btn-primary btn-block");
        dom.setAttribute(el4, "type", "button");
        var el5 = dom.createTextNode("Log in");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1, 1, 1]);
        var element1 = dom.childAt(element0, [5]);
        var element2 = dom.childAt(element0, [7]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        morphs[2] = dom.createAttrMorph(element1, 'onchange');
        morphs[3] = dom.createElementMorph(element2);
        return morphs;
      },
      statements: [["inline", "input", [], ["type", "text", "id", "inputEmail", "class", "form-control", "placeholder", "User Name", "value", ["subexpr", "@mut", [["get", "username", ["loc", [null, [5, 95], [5, 103]]]]], [], []]], ["loc", [null, [5, 8], [5, 107]]]], ["inline", "input", [], ["type", "password", "id", "inputPassword", "class", "form-control", "placeholder", "Password", "value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [6, 101], [6, 109]]]]], [], []]], ["loc", [null, [6, 8], [6, 112]]]], ["attribute", "onchange", ["subexpr", "action", ["switchSystem"], [], ["loc", [null, [8, 63], [8, 88]]]]], ["element", "action", ["validate"], [], ["loc", [null, [14, 16], [14, 37]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('shin-ui/pods/quick-approve/route', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		beforeModel: function beforeModel(transition) {
			var leaveId = transition.queryParams.leaveId;
			// alert(leaveId);
			_ember['default'].$.ajax({
				url: 'requests/quickApprove',
				context: this,
				data: {
					leaveId: leaveId
				},
				success: function success(response) {
					if (response.result) {
						document.cookie = "sessionId=" + response.data.sessionId;
						this.transitionTo('/leave/details/' + leaveId.toString());
					}
				}
			});
		}

	});
});
define("shin-ui/pods/quick-approve/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 39
          }
        },
        "moduleName": "shin-ui/pods/quick-approve/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Quick Approve - Logging in to System...");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define('shin-ui/pods/report/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define("shin-ui/pods/report/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "shin-ui/pods/report/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "page-header");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        var el3 = dom.createTextNode("Report");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("	\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("embed");
        dom.setAttribute(el1, "src", "../report/report.pdf");
        dom.setAttribute(el1, "width", "900px");
        dom.setAttribute(el1, "height", "700px");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [8, 0], [8, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('shin-ui/pods/support/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define("shin-ui/pods/support/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "shin-ui/pods/support/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "page-header");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        var el3 = dom.createTextNode("Support");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("|= LoL This is presented by BigSword. ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [8, 0], [8, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('shin-ui/pods/sys-info/model', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    infoId: (0, _emberData['default'])('number'),
    infoMsg: (0, _emberData['default'])('string')
  });
});
define('shin-ui/pods/sys-info/route', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		// model: function(){
		// 	Ember.$.ajax({
		// 		url: 'requests/sysInfo',
		// 		context: this,
		// 		success: function(response){
		// 			if(response.result){
		// 				this.set('mdoel', response.data);
		// 			}
		// 		}
		// 	});
		// }

	});
});
define("shin-ui/pods/sys-info/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 23,
            "column": 0
          }
        },
        "moduleName": "shin-ui/pods/sys-info/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "page-header");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        var el3 = dom.createTextNode("System Information");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n  \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-md-8 col-md-offset-1 panel panel-default");
        var el3 = dom.createTextNode("\n\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "panel-body");
        var el4 = dom.createTextNode("\n        	");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("System Notification 1");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        	");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("System Notification 2");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        	");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("System Notification 3");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        	");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("System Notification 4");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        	");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("System Notification 5");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [22, 0], [22, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('shin-ui/router', ['exports', 'ember', 'shin-ui/config/environment'], function (exports, _ember, _shinUiConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _shinUiConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('login');
    this.route('sysInfo');

    this.route('leave', function () {
      this.route('details', { path: "details/:leaveId" });
      this.route('create');
      this.route('cancel');
      this.route('approve');
      this.route('list', { path: "list/:category/:type/:status" });
    });
    this.route('quickApprove');
    this.route('dashboard', function () {
      this.route('leave');
    });
    this.route('report');
    this.route('support');
  });

  exports['default'] = Router;
});
define('shin-ui/routes/index', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({

		redirect: function redirect() {
			this.transitionTo('login');
		}

	});
});
define('shin-ui/services/ajax-generic', ['exports', 'ember', 'shin-ui/config/environment'], function (exports, _ember, _shinUiConfigEnvironment) {
	exports['default'] = _ember['default'].Service.extend({
		modalShow: _ember['default'].inject.service('modal-show'),
		cookieCheck: function cookieCheck() {
			if (document.cookie.toString().indexOf("JSESSIONID") > -1) {
				return true;
			} else {
				return false;
			}
		},

		post: function post(data, appController) {
			var url = _shinUiConfigEnvironment['default'].APP.ajax;
			console.log("url: " + url);
			var promise = new _ember['default'].RSVP.Promise(function (resolve, reject) {
				_ember['default'].$.ajax({
					url: url,
					type: 'post',
					contentType: 'application/json; charset=utf-8', // Type of data sent to server
					data: JSON.stringify(data),
					dataType: 'json',
					context: appController,

					success: function success(response) {
						if (response.responseStatus === "success") {
							resolve(response);
						} else {
							if (response.errorCode === "sessionUnValid") {
								appController.get('modalShow').show(appController, "Session Unvalid", "error", response.errorMessage, true, "#alertModal", "/login");
							}
							if (response.errorCode === "LOGINVALIDATE") {
								appController.get('modalShow').show(appController, "Log In Fail", "error", response.errorMessage, false, "#alertModal");
							}
							// reject(response);
						}
					}
				});
			});
			return promise;
		}

	});
});
define("shin-ui/services/dashboard-data", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Service.extend({

		calcTotal: function calcTotal(inArr, keyArr) {
			var typeTotal = { type: "total" };
			for (var h = 0; h < keyArr.length; h++) {
				var _k = keyArr[h];
				typeTotal[_k] = 0;
			}

			for (var i = 0; i < inArr.length; i++) {
				var t = 0;
				for (var key in inArr[i]) {
					if (typeof inArr[i][key] === "number") {
						typeTotal[key] = typeTotal[key] + inArr[i][key];
						t = t + inArr[i][key];
					}
				}
				inArr[i]["total"] = t;
			}

			var tt = 0;
			for (var key in typeTotal) {
				if (typeof typeTotal[key] === "number") {
					tt = tt + typeTotal[key];
				}
			}
			typeTotal.total = tt;
			inArr.push(typeTotal);

			return inArr;
		},

		convert: function convert(table, colOrder, rowOrder, headClass, dtClass) {
			var t = [];
			for (var i = 0; i < table.length; i++) {
				var objLength = this.get('objLength')(table[i]);
				var r = [];
				// console.log("objLength");
				for (var j = 0; j < objLength; j++) {
					r[j] = table[i][colOrder[j]];
				}
				var firstCaseChg = this.get('firstCaseChg');
				r = this.get('expand')(r, colOrder, rowOrder[i], headClass, dtClass, firstCaseChg);
				t.push(r);
			}
			return t;
		},

		expand: function expand(r, colOrder, row, headClass, dtClass, firstCaseChg) {
			for (var m = 0; m < r.length; m++) {

				if (m === 0) {
					r[m] = firstCaseChg(r[m], 1);
					r[m] = { cls: headClass, dt: r[m] };
				} else {
					r[m] = { cls: dtClass, dt: r[m], position: { row: row, col: colOrder[m] } };
				}
			}
			return r;
		},

		objLength: function objLength(obj) {
			var i = 0;
			for (var p in obj) {
				i++;
			}
			return i;
		},

		firstCaseChg: function firstCaseChg(str, type) {
			var o = [];
			for (var i = 0; i < str.length; i++) {
				if (i === 0) {
					if (type === 1) {
						o[i] = str[0].toUpperCase();
					} else {
						o[i] = str[0].toLowerCase();
					}
				} else {
					o[i] = str[i];
				}
			}
			return o.toString().replace(/,/g, "");
		}
	});
});
define('shin-ui/services/modal-show', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Service.extend({

		show: function show(controller, modalHeader, msgType, modalMsg, modalReload, modalId, jumpTo) {
			controller.set('modalHeader', modalHeader);
			controller.set('modalMsg', modalMsg);
			controller.set('modalReload', modalReload);

			controller.set('modalIsError', false);
			controller.set('modalIsSuccess', false);
			controller.set('modalIsInfo', false);

			console.log(msgType);

			if (msgType === "error") {
				controller.set('modalIsError', true);
			}
			if (msgType === "success") {
				controller.set('modalIsSuccess', true);
			}
			if (msgType === "info") {
				controller.set('modalIsInfo', true);
			}

			_ember['default'].$(modalId).modal();
			console.log(jumpTo);
			if (jumpTo) {
				controller.transitionToRoute(jumpTo);
			}
		}
	});
});
define("shin-ui/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 0
            }
          },
          "moduleName": "shin-ui/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" \n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "outlet", ["loc", [null, [3, 2], [3, 12]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 0
              },
              "end": {
                "line": 9,
                "column": 0
              }
            },
            "moduleName": "shin-ui/templates/application.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            return morphs;
          },
          statements: [["content", "outlet", ["loc", [null, [8, 0], [8, 10]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 0
            },
            "end": {
              "line": 10,
              "column": 0
            }
          },
          "moduleName": "shin-ui/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "nav-footer", [], ["isLeave", ["subexpr", "@mut", [["get", "isLeave", ["loc", [null, [7, 22], [7, 29]]]]], [], []], "isTravel", ["subexpr", "@mut", [["get", "isTravel", ["loc", [null, [7, 39], [7, 47]]]]], [], []], "user", ["subexpr", "@mut", [["get", "currentUserName", ["loc", [null, [7, 53], [7, 68]]]]], [], []], "navi", ["subexpr", "action", ["naviRoute"], [], ["loc", [null, [7, 74], [7, 94]]]], "switch", ["subexpr", "action", ["switchSystem"], [], ["loc", [null, [7, 102], [7, 125]]]], "logout", ["subexpr", "action", ["jumpToLogin"], [], ["loc", [null, [7, 133], [7, 155]]]]], 0, null, ["loc", [null, [7, 0], [9, 15]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "shin-ui/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 5, 5, contextualElement);
        return morphs;
      },
      statements: [["block", "if", [["get", "isLogin", ["loc", [null, [2, 6], [2, 13]]]]], [], 0, null, ["loc", [null, [2, 0], [4, 7]]]], ["block", "unless", [["get", "isLogin", ["loc", [null, [6, 10], [6, 17]]]]], [], 1, null, ["loc", [null, [6, 0], [10, 11]]]], ["inline", "alert-modal", [], ["header", ["subexpr", "@mut", [["get", "modalHeader", ["loc", [null, [12, 21], [12, 32]]]]], [], []], "msg", ["subexpr", "@mut", [["get", "modalMsg", ["loc", [null, [12, 37], [12, 45]]]]], [], []], "isReload", ["subexpr", "@mut", [["get", "modalReload", ["loc", [null, [12, 55], [12, 66]]]]], [], []], "isError", ["subexpr", "@mut", [["get", "modalIsError", ["loc", [null, [12, 75], [12, 87]]]]], [], []], "isSuccess", ["subexpr", "@mut", [["get", "modalIsSuccess", ["loc", [null, [12, 98], [12, 112]]]]], [], []], "isInfo", ["subexpr", "@mut", [["get", "modalIsInfo", ["loc", [null, [12, 120], [12, 131]]]]], [], []]], ["loc", [null, [12, 0], [12, 133]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('shin-ui/config/environment', ['ember'], function(Ember) {
  var prefix = 'shin-ui';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (!runningTests) {
  require("shin-ui/app")["default"].create({"ajax":"http://localhost:8080/bigsword/msgchannel","name":"shin-ui","version":"0.0.0+7a6c95d7"});
}

/* jshint ignore:end */
//# sourceMappingURL=shin-ui.map