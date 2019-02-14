'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parties = require('../controllers/parties');

var _parties2 = _interopRequireDefault(_parties);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', _parties2.default.createParty);
router.get('/', _parties2.default.viewAllParties);
router.get('/:id', _parties2.default.viewSingleParty);
router.patch('/:id', _parties2.default.editParty);
router.delete('/:id', _parties2.default.deleteParty);

exports.default = router;
//# sourceMappingURL=parties.js.map