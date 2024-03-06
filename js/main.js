'use strict';

import toggleTheme from './common/toggle-theme.js';
import toggleNav from './common/toggle-nav.js';
import adjustNavTop from './common/adjust-nav-top.js';
import authMenuHandler from './auth/auth-menu-handler.js';
import logout from './auth/logout.js';

(() => {
    toggleTheme();
    toggleNav();
    adjustNavTop();
    authMenuHandler();
    logout();
})();
