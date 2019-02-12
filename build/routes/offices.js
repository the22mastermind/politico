'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _offices = require('../controllers/offices');

var _offices2 = _interopRequireDefault(_offices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', _offices2.default.createOffice);
router.get('/', _offices2.default.viewAllOffices);
router.get('/:id', _offices2.default.viewSpecificOffice);

exports.default = router;
//# sourceMappingURL=offices.js.map