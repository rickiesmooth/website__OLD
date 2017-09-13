'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SCRouter = function (_window$HTMLElement) {
  _inherits(SCRouter, _window$HTMLElement);

  function SCRouter() {
    _classCallCheck(this, SCRouter);

    return _possibleConstructorReturn(this, (SCRouter.__proto__ || Object.getPrototypeOf(SCRouter)).apply(this, arguments));
  }

  _createClass(SCRouter, [{
    key: '_onChanged',
    value: function _onChanged() {
      var _this2 = this;

      var path = window.location.pathname;
      var routes = Array.from(this._routes.keys());
      var route = routes.find(function (r) {
        return r.test(path);
      });
      var data = route.exec(path);

      if (!route) {
        return;
      }

      this._newView = this._routes.get(route);

      if (this._isTransitioningBetweenViews) {
        return Promise.resolve();
      }
      this._isTransitioningBetweenViews = true;

      var outViewPromise = Promise.resolve();
      if (this._currentView) {
        if (this._currentView === this._newView) {
          this._isTransitioningBetweenViews = false;

          return this._currentView.update(data);
        }

        outViewPromise = this._currentView.out(data);
      }

      var header = document.querySelector('sc-nav');
      header.setAttribute('active', data.input);

      return outViewPromise.then(function (_) {
        _this2._currentView = _this2._newView;
        _this2._isTransitioningBetweenViews = false;
        return _this2._newView.in(data);
      });
    }
  }, {
    key: 'go',
    value: function go(url) {
      window.history.pushState({}, '', url);
      return this._onChanged();
    }
  }, {
    key: 'addRoute',
    value: function addRoute(route, view) {
      if (this._routes.has(route)) {
        return console.warn('Route already exists: ' + route);
      }

      this._routes.set(route, view);
    }
  }, {
    key: '_addRoutes',
    value: function _addRoutes() {
      var _this3 = this;

      var views = document.querySelectorAll('sc-view');
      // let views = Array.from(document.querySelectorAll('sc-view'))
      views.forEach(function (view) {
        if (!view.route) {
          return;
        }

        _this3.addRoute(new RegExp(view.route, 'i'), view);
      }, this);
    }
  }, {
    key: '_removeRoute',
    value: function _removeRoute(route) {
      this._routes.delete(route);
    }
  }, {
    key: '_clearRoutes',
    value: function _clearRoutes() {
      this._routes.clear();
    }
  }, {
    key: 'createdCallback',
    value: function createdCallback() {
      this._onChanged = this._onChanged.bind(this);
      this._routes = new Map();
    }
  }, {
    key: 'attachedCallback',
    value: function attachedCallback() {
      window.addEventListener('popstate', this._onChanged);
      this._clearRoutes();
      this._addRoutes();
      this._onChanged();
    }
  }, {
    key: 'detachedCallback',
    value: function detachedCallback() {
      window.removeEventListener('popstate', this._onChanged);
    }
  }]);

  return SCRouter;
}(window.HTMLElement);

document.registerElement('sc-router', SCRouter);