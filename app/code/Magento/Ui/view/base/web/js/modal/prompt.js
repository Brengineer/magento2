/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'underscore',
    'jquery/ui',
    'Magento_Ui/js/modal/modal',
    'mage/translate'
], function ($, _) {
    'use strict';

    $.widget('mage.prompt', $.mage.modal, {
        options: {
            modalClass: 'prompt',
            promptField: '[data-role="promptField"]',
            actions: {

                /**
                 * Callback always - called on all actions.
                 */
                always: function () {},

                /**
                 * Callback confirm.
                 */
                confirm: function () {},

                /**
                 * Callback cancel.
                 */
                cancel: function () {}
            },
            buttons: [{
                text: $.mage.__('Cancel'),
                class: 'action-tertiary',

                /**
                 * Click handler.
                 */
                click: function () {
                    this.closeModal();
                }
            }, {
                text: $.mage.__('OK'),
                class: 'action-secondary',

                /**
                 * Click handler.
                 */
                click: function () {
                    this.closeModal(true);
                }
            }]
        },

        /**
         * Create widget.
         */
        _create: function () {
            this._super();
            this.modal.find(this.options.modalContent).append('<input value="" data-role="promptField" type="text"/>');
            this.modal.find(this.options.modalCloseBtn).off().on('click',  _.bind(this.closeModal, this, false));
            this.openModal();
        },

        /**
         * Remove widget
         */
        _remove: function () {
            this.modal.remove();
        },

        /**
         * Close modal window
         */
        closeModal: function (result) {
            var value;

            result = result || false;

            if (result) {
                value = this.modal.find(this.options.promptField).val();
                this.options.actions.confirm(value);
            } else {
                this.options.actions.cancel();
            }
            this.options.actions.always();
            this.element.bind('confirmclosed', _.bind(this._remove, this));

            return this._super();
        }
    });

    return function (config) {
        return $('<div></div>').html(config.content).prompt(config);
    };
});