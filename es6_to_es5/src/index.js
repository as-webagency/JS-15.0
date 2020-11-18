'use strict';

import 'nodelist-foreach-polyfill';
import  elementClosest from 'element-closest';
const elementsClosest = elementClosest(window);
// import scrollIntoView from 'scroll-into-view-if-needed';
// const scrollIntoViews = scrollIntoView({ behavior: 'smooth' });
import 'fetch-polyfill';
import 'es6-promise';
import 'formdata-polyfill';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import toggleTabs from './modules/toggleTabs';
import slider from './modules/slider';
import ourTeam from './modules/ourTeam';
import calc from './modules/calc';
import sendFormsAjax from './modules/sendFormsAjax';

// Timer
countTimer( '30 November 2020' );

// Menu
toggleMenu();

// Popup
togglePopup();

// Tabs
toggleTabs();

// Slider
slider();

// Team
ourTeam();

// Calculator
calc( 100 );

// Ajax Form
sendFormsAjax();