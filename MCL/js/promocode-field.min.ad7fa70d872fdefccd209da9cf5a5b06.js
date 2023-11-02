(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{39:function(o,e,t){"use strict";t.r(e);t(40),t(41)},40:function(o,e,t){},41:function(o,e){
/*!
 * ///////////////////////////////////////////////////////////////////////////////////////////////////
 * // NortonLifeLock copyright header start
 * // //////////////////////
 * //
 * // PROPRIETARY / CONFIDENTIAL.
 * // Use of this product is subject to license terms.
 * // Copyright (c) 2023 NortonLifeLock Inc.
 * // All rights reserved.
 * //
 * ///////////////////////////////////////////////////////////////////////////////////////////////////
 * // NortonLifeLock copyright header stop
 * // //////////////////////
 */
var t={submitPromoCode:function(){try{var o=document.querySelector(".c-promocode-field__button"),e=document.querySelector(".c-promocode-field__input");o&&e&&(e.addEventListener("keyup",(function(e){13===e.keyCode&&(e.preventDefault(),o.click())})),o.addEventListener("click",(function(o){o.preventDefault(),t.promoCodeRedirect(e.value)})))}catch(o){console.log("promocode-field: submitPromoCode() ::"+o)}},promoCodeRedirect:function(o){try{t.isValidPromo(o)?window.location.href="/offers?promocode="+encodeURIComponent(o):document.getElementsByClassName("c-promocode-field__placeholder__err")[0].style.display="block"}catch(o){console.log("promocode-field: promoCodeRedirect() ::"+o)}},isValidPromo:function(o){if(o.length>0&&/^[a-zA-Z0-9-!@#%*^$&()\`.+,/_\"]*$/.test(o))return!0}};t.submitPromoCode()}},[[39,0]]]);