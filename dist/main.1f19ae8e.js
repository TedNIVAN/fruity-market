// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/card.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardData = void 0;
var cardData = [{
  id: 0,
  name: 'Strawberry',
  image: '028-strawberry.png',
  price: 1
}, {
  id: 1,
  name: 'Banana',
  image: '006-bananas.png',
  price: 2
}, {
  id: 2,
  name: 'Pear',
  image: '024-pear.png',
  price: 2
}, {
  id: 3,
  name: 'Dragon Fruit',
  image: '015-dragon fruit.png',
  price: 7
}, {
  id: 4,
  name: 'Orange',
  image: '022-orange.png',
  price: 1
}, {
  id: 5,
  name: 'Mango',
  image: '021-mango.png',
  price: 5
}, {
  id: 6,
  name: 'Lemon',
  image: '020-lemon.png',
  price: 1
}, {
  id: 7,
  name: 'Watermelon',
  image: '030-watermelon.png',
  price: 2
}, {
  id: 8,
  name: 'Berry',
  image: '008-berry.png',
  price: 2
}, {
  id: 9,
  name: 'Pomegranate',
  image: '025-pomegranate.png',
  price: 3
}, {
  id: 10,
  name: 'Blueberry',
  image: '009-blueberry.png',
  price: 2
}, {
  id: 11,
  name: 'Rose Apple',
  image: '027-rose apple.png',
  price: 4
}];
exports.cardData = cardData;
},{}],"js/burger.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.burgerComponent = burgerComponent;

function burgerComponent() {
  document.addEventListener('DOMContentLoaded', function () {
    // Get all "navbar-burger" elements
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0); // Check if there are any navbar burgers

    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(function (el) {
        el.addEventListener('click', function () {
          // Get the target from the "data-target" attribute
          var target = el.dataset.target;
          var $target = document.getElementById(target); // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"

          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }
  });
}
},{}],"js/serial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serialComponent = serialComponent;
exports.serial = void 0;
var serial = {};
exports.serial = serial;

function serialComponent() {
  'use strict';

  serial.getPorts = function () {
    return navigator.usb.getDevices().then(function (devices) {
      return devices.map(function (device) {
        return new serial.Port(device);
      });
    });
  };

  serial.requestPort = function () {
    var filters = [{
      'vendorId': 0x2341,
      'productId': 0x8036
    }, // Arduino Leonardo
    {
      'vendorId': 0x2341,
      'productId': 0x8037
    }, // Arduino Micro
    {
      'vendorId': 0x2341,
      'productId': 0x804d
    }, // Arduino/Genuino Zero
    {
      'vendorId': 0x2341,
      'productId': 0x804e
    }, // Arduino/Genuino MKR1000
    {
      'vendorId': 0x2341,
      'productId': 0x804f
    }, // Arduino MKRZERO
    {
      'vendorId': 0x2341,
      'productId': 0x8050
    }, // Arduino MKR FOX 1200
    {
      'vendorId': 0x2341,
      'productId': 0x8052
    }, // Arduino MKR GSM 1400
    {
      'vendorId': 0x2341,
      'productId': 0x8053
    }, // Arduino MKR WAN 1300
    {
      'vendorId': 0x2341,
      'productId': 0x8054
    }, // Arduino MKR WiFi 1010
    {
      'vendorId': 0x2341,
      'productId': 0x8055
    }, // Arduino MKR NB 1500
    {
      'vendorId': 0x2341,
      'productId': 0x8056
    }, // Arduino MKR Vidor 4000
    {
      'vendorId': 0x2341,
      'productId': 0x8057
    }, // Arduino NANO 33 IoT
    {
      'vendorId': 0x1A86,
      'productId': 0x7523
    }, // ESP8266
    {
      'vendorId': 0x10C4,
      'productId': 0xEA60
    }, // ESP32
    {
      'vendorId': 0x239A
    } // Adafruit Boards!
    ];
    return navigator.usb.requestDevice({
      'filters': filters
    }).then(function (device) {
      return new serial.Port(device);
    });
  };

  serial.Port = function (device) {
    this.device_ = device;
    this.interfaceNumber_ = 2; // original interface number of WebUSB Arduino demo

    this.endpointIn_ = 5; // original in endpoint ID of WebUSB Arduino demo

    this.endpointOut_ = 4; // original out endpoint ID of WebUSB Arduino demo
  };

  serial.Port.prototype.connect = function () {
    var _this = this;

    var readLoop = function readLoop() {
      _this.device_.transferIn(_this.endpointIn_, 64).then(function (result) {
        _this.onReceive(result.data);

        readLoop();
      }, function (error) {
        _this.onReceiveError(error);
      });
    };

    return this.device_.open().then(function () {
      if (_this.device_.configuration === null) {
        return _this.device_.selectConfiguration(1);
      }
    }).then(function () {
      var configurationInterfaces = _this.device_.configuration.interfaces;
      configurationInterfaces.forEach(function (element) {
        element.alternates.forEach(function (elementalt) {
          if (elementalt.interfaceClass == 0xff) {
            _this.interfaceNumber_ = element.interfaceNumber;
            elementalt.endpoints.forEach(function (elementendpoint) {
              if (elementendpoint.direction == "out") {
                _this.endpointOut_ = elementendpoint.endpointNumber;
              }

              if (elementendpoint.direction == "in") {
                _this.endpointIn_ = elementendpoint.endpointNumber;
              }
            });
          }
        });
      });
    }).then(function () {
      return _this.device_.claimInterface(_this.interfaceNumber_);
    }).then(function () {
      return _this.device_.selectAlternateInterface(_this.interfaceNumber_, 0);
    }).then(function () {
      return _this.device_.controlTransferOut({
        'requestType': 'class',
        'recipient': 'interface',
        'request': 0x22,
        'value': 0x01,
        'index': _this.interfaceNumber_
      });
    }).then(function () {
      readLoop();
    });
  };

  serial.Port.prototype.disconnect = function () {
    var _this2 = this;

    return this.device_.controlTransferOut({
      'requestType': 'class',
      'recipient': 'interface',
      'request': 0x22,
      'value': 0x00,
      'index': this.interfaceNumber_
    }).then(function () {
      return _this2.device_.close();
    });
  };

  serial.Port.prototype.send = function (data) {
    return this.device_.transferOut(this.endpointOut_, data);
  };
}
},{}],"js/device.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deviceComponent = deviceComponent;
exports.withdrawFruit = withdrawFruit;

var _serial = require("./serial");

var port;

function deviceComponent() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function (event) {
    var connectButton = document.querySelector('#connect');

    function connect() {
      console.log('Connecting to ' + port.device_.productName + '...');
      port.connect().then(function () {
        console.log(port);
        console.log('Connected.');
        connectButton.textContent = 'Disconnect Device';

        port.onReceive = function (data) {
          var textDecoder = new TextDecoder();
          t.io.print(textDecoder.decode(data));
        };

        port.onReceiveError = function (error) {
          console.log('Receive error: ' + error);
        };
      }, function (error) {
        console.log('Connection error: ' + error);
      });
    }

    ;
    connectButton.addEventListener('click', function () {
      if (port) {
        port.disconnect();
        connectButton.textContent = 'Connect Device';
        port = null;
      } else {
        _serial.serial.requestPort().then(function (selectedPort) {
          port = selectedPort;
          connect();
        }).catch(function (error) {
          console.log('Connection error: ' + error);
        });
      }
    });

    _serial.serial.getPorts().then(function (ports) {
      if (ports.length == 0) {
        console.log('No devices found.');
      } else {
        port = ports[0];
        connect();
      }
    });
  });
}

function withdrawFruit(str) {
  if (port !== undefined) {
    var textEncoder = new TextEncoder();
    port.send(textEncoder.encode(str)).catch(function (error) {
      console.log('Send error: ' + error);
    });
  }
}
},{"./serial":"js/serial.js"}],"js/modal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modalComponent = modalComponent;
exports.amountToPay = void 0;

var _web3entry = require("./web3entry");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BulmaModal = /*#__PURE__*/function () {
  function BulmaModal(selector) {
    _classCallCheck(this, BulmaModal);

    this.elem = document.querySelector(selector);
    this.close_data();
  }

  _createClass(BulmaModal, [{
    key: "show",
    value: function show() {
      this.elem.classList.toggle('is-active');
      this.on_show();
    }
  }, {
    key: "close",
    value: function close() {
      this.elem.classList.toggle('is-active');
      this.on_close();
    }
  }, {
    key: "close_data",
    value: function close_data() {
      var modalClose = this.elem.querySelectorAll("[data-bulma-modal='close']");
      var that = this;
      modalClose.forEach(function (e) {
        e.addEventListener("click", function () {
          that.elem.classList.toggle('is-active');
          var event = new Event('modal:close');
          that.elem.dispatchEvent(event);
        });
      });
    }
  }, {
    key: "on_show",
    value: function on_show() {
      var event = new Event('modal:show');
      this.elem.dispatchEvent(event);
    }
  }, {
    key: "on_close",
    value: function on_close() {
      var event = new Event('modal:close');
      this.elem.dispatchEvent(event);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(event, callback) {
      this.elem.addEventListener(event, callback);
    }
  }]);

  return BulmaModal;
}();

var amountToPay;
exports.amountToPay = amountToPay;

function modalComponent() {
  var mdl = new BulmaModal("#myModal");
  document.querySelectorAll('.card-content').forEach(function (item) {
    item.addEventListener('click', function (event) {
      mdl.show();
      console.log(item);
      var name = item.getAttribute("name");
      console.log(name);
      document.getElementsByClassName("modal-card-title")[0].innerText = name;
      var image = item.getAttribute("data-img");
      console.log(image);
      document.getElementById("fimg").src = image;
      var price = item.getAttribute("data-price");
      exports.amountToPay = amountToPay = Number.parseFloat(price / _web3entry.ethPrice).toPrecision(2);
      document.getElementById("fruit-price").innerText = 'COST $' + price + ' - PAY ' + amountToPay + ' ETH';
    });
  });
  mdl.addEventListener('modal:show', function () {
    console.log("opened");
  });
  mdl.addEventListener("modal:close", function () {
    console.log("closed");
  });
}
},{"./web3entry":"js/web3entry.js"}],"js/web3entry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.web3entryComponent = web3entryComponent;
exports.ethPrice = void 0;

var _device = require("./device");

var _modal = require("./modal");

// Change this to use your own infura ID
var web3 = new Web3("wss://kovan.infura.io/ws/v3/".concat("48d55356a0d24b91855f633e8cf4b197")); // AggregatorV3Interface ABI

var aggregatorV3InterfaceABI = [{
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "address",
    "name": "",
    "type": "address"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "name": "Received",
  "type": "event"
}, {
  "inputs": [],
  "name": "getLatestPrice",
  "outputs": [{
    "internalType": "int256",
    "name": "",
    "type": "int256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "stateMutability": "payable",
  "type": "receive"
}]; // Price Feed Address

var addr = "0xC8f872aEe06663b900c067Dfd3D87813e6A4F72A";
document.getElementById("address").innerText = addr; // Set up contract instance

var priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);
var ethPrice;
exports.ethPrice = ethPrice;

function web3entryComponent() {
  //Make call to latestRoundData()
  priceFeed.methods.getLatestPrice().call().then(function (price) {
    // Do something with roundData
    exports.ethPrice = ethPrice = price / 1.e8;
    console.log("Ethereum Price: ", price / 1.e8);
  });
  priceFeed.events.Received(function (error, event) {
    if (event) {
      var receivedAmount = event.returnValues[1];
      console.log(receivedAmount);
      console.log(_modal.amountToPay * 1e18);

      if (receivedAmount >= _modal.amountToPay * 1e18) {
        (0, _device.withdrawFruit)('H');
        document.getElementsByClassName("modal-card-body")[0].innerHTML = "\n        <center>\n        <div class=\"columns is-vcentered has-background-primary\">\n            <div class=\"column\">\n                <strong class=\"has-text-black\">\n                Payment Succeeded\n                </strong>\n                <br>\n            </div>\n        </div>\n        <div class=\"columns is-vcentered\">\n            <div class=\"column\">\n                <figure class=\"image is-128x128\">\n                <img src=\"basket.png\" alt=\"\">\n                </figure>\n            </div>\n        </div>\n        <div class=\"columns is-vcentered has-background-info-light\">\n            <div class=\"column\">\n               <strong class=\"has-text-black\">You can now withdraw your purchase</strong> \n            </div>\n        </div>\n\n    </center>\n        ";
      } else {
        document.getElementsByClassName("modal-card-body")[0].innerHTML = "\n        <center>\n        <div class=\"columns is-vcentered has-background-danger\">\n            <div class=\"column\">\n                <strong class=\"has-text-black\">\n                Failed to proceed: Insufficient funds sent\n                </strong>\n                <br>\n            </div>\n        </div>\n        <div class=\"columns is-vcentered\">\n            <div class=\"column\">\n                <figure class=\"image is-128x128\">\n                <img src=\"cashier.png\" alt=\"\">\n                </figure>\n            </div>\n        </div>\n        <div class=\"columns is-vcentered has-background-info-light\">\n            <div class=\"column\">\n               <strong class=\"has-text-black\">Please remake your purchase</strong> \n            </div>\n        </div>\n\n    </center>\n        ";
      }
    }
  });
}
},{"./device":"js/device.js","./modal":"js/modal.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _card = require("./js/card");

var _burger = require("./js/burger");

var _web3entry = require("./js/web3entry");

var _modal = require("./js/modal");

var _serial = require("./js/serial");

var _device = require("./js/device");

new Vue({
  el: '#app',
  data: {
    cardData: _card.cardData
  }
});
/* Handles the navbar's hamburger for a small screen host. */

(0, _burger.burgerComponent)();
/* Establishes the communication with an Ethereum node. */

(0, _web3entry.web3entryComponent)();
/* Handles the fruit's modal. */

(0, _modal.modalComponent)();
/* Manages the USB Serial communication between the host and the device. */

(0, _serial.serialComponent)();
/* Handles the device interaction. */

(0, _device.deviceComponent)();
},{"./js/card":"js/card.js","./js/burger":"js/burger.js","./js/web3entry":"js/web3entry.js","./js/modal":"js/modal.js","./js/serial":"js/serial.js","./js/device":"js/device.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52546" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map