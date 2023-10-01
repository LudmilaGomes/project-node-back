const {submenuAutor} = require('./menuAutor');
const {submenuEditora} = require('./menuEditora');
const {submenuLivro} = require('./menuLivro');
const {submenuRelatorios} = require('./menuRelat');
const {waitForEnter, showMenu, promptMenu} = require('./menuFuncoes');

module.exports = {submenuAutor, submenuEditora, submenuLivro, submenuRelatorios, waitForEnter, showMenu, promptMenu};