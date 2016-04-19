/*
 * Copyright (c) 2016 OvO
 * Date: 2016-04-06
 * 多选框
 *
 */

/*globals jQuery, define, exports, require, window, document */
(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    }
    else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function ($, undefined) {
    "use strict";

    $.ovoMultipleSelect = {
        /**
         * @name $.ovoMultipleSelect.version
         */
        version: '0.1.2',
        author: "OvO",
        /**
         * holds all the default options used when creating new instances
         * @name $.ovoMultipleSelect.defaults
         */
        defaults: {
            /**
             * configure which plugins will be active on an instance. Should be an array of strings, where each element is a plugin name. The default is `[]`
             * @name $.ovoMultipleSelect.defaults.plugins
             */
            //参数定义
            name: '',
            fromDataUrl: '',
            fromData: [],//ex:[{name: '1111', value: '1111'}, {name: '222', value: '222'}]
            toDataUrl: '',
            toData: []//ex:[{name: '1111', value: '1111'}, {name: '222', value: '222'}]

        },
        /**
         * stores all loaded ovoMultipleSelect plugins (used internally)
         * @name $.ovoMultipleSelect.plugins
         */
        plugins: {}
    };


    /**
     * __Examples__
     *    $('#select').ovoMultipleSelect(); // creates an instance
     *    $('#select').ovoMultipleSelect({ plugins : [] }); // create an instance with some options
     *    $('#select').ovoMultipleSelect('open_node', '#branch_1'); // call a method on an existing instance, passing additional arguments
     *    $('#select').ovoMultipleSelect(); // get an existing instance (or create an instance)
     *    $('#select').ovoMultipleSelect(true); // get an existing instance (will not create new instance)
     *    $('#select').ovoMultipleSelect().select_node('#branch_1'); // get an instance (using a nested element and call a method)
     *
     * @name $().ovoMultipleSelect([arg])
     * @param {String|Object} arg
     * @return {Mixed}
     */
    $.fn.ovoMultipleSelect = function (params) {

        params = $.extend(true, {}, $.ovoMultipleSelect.defaults, params);
        var modal = $(this);
        var _loadFromData = function () {
            var data = {'str': $(this).val() || ''}
            if (params.fromDataUrl.length > 0) {
                $.ajax({
                    type: "get",
                    url: params.fromDataUrl,
                    data: data || "",
                    dataType: "json",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    success: function (msg) {
                        _fillFromData(msg);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.error(errorThrown);
                        return [];
                    }
                });
            } else {
                _fillFromData();
            }
        };

        var _fillFromData = function (data) {
            data = $.extend([], params.fromData, data);
            var selectfrom = $('select.from', modal).empty();
            $(data).each(function () {
                $('<option>').html(this.name || '').val(this.value || this.sid || '').dblclick(_selectOne).appendTo(selectfrom);
            });
            $("option:first", selectfrom).prop("selected", 'selected');
        }

        var _loadToData = function () {
            if (params.toDataUrl.length > 0) {
                $.ajax({
                    type: "get",
                    url: params.toDataUrl,
                    dataType: "json",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    success: function (msg) {
                        _fillToData(msg);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.error(errorThrown);
                        return [];
                    }
                });
            } else {
                _fillToData();
            }
        };


        var _fillToData = function (data) {
            data = $.extend([], params.toData, data);
            var selectto = $('select.to', modal).empty();
            $(data).each(function () {
                $('<option>').html(this.name || '').val(this.value || this.sid || '').dblclick(_removeOne).appendTo(selectto);
            });
        }

        var _selectOne = function () {
            var selectfrom = $('select.from', modal);
            var selectto = $('select.to', modal);
            if ($("option:selected", selectfrom).length < 1) {
                $("option:first", selectfrom).prop("selected", 'selected');
            }
            $("option:selected", selectfrom).clone().dblclick(_removeOne).appendTo(selectto);
            $("option:selected", selectfrom).remove();
        }
        var _removeOne = function () {
            var selectfrom = $('select.from', modal);
            var selectto = $('select.to', modal);
            if ($("option:selected", selectto).length < 1) {
                $("option:first", selectto).prop("selected", 'selected');
            }
            $("option:selected", selectto).clone().dblclick(_selectOne).appendTo(selectfrom);
            $("option:selected", selectto).remove();
        }
        var _selectAll = function () {
            var selectfrom = $('select.from', modal);
            var selectto = $('select.to', modal);
            $("option", selectfrom).clone().dblclick(_removeOne).appendTo(selectto);
            $("option", selectfrom).remove();
        }
        var _removeAll = function () {
            var selectfrom = $('select.from', modal);
            var selectto = $('select.to', modal);
            $("option", selectto).clone().dblclick(_selectOne).appendTo(selectfrom);
            $("option", selectto).remove();
        }

        this.each(function () {
            modal = $(this);

            var selectfrom = $('<select>').addClass('from').prop('multiple', true);
            var selectto = $('<select>').addClass('to').prop('multiple', true).prop('name', params.name || '');

            var inputSearchFrom = $('<input>').addClass('form-control').prop('type', 'text').prop('placeholder', '搜索').keyup(_loadFromData);
            var btnSelect = $('<a>').addClass('btn btn-default btn-block btn-sm').append('选择 ').append($('<i>').addClass('fa fa-angle-right')).click(_selectOne);
            var btnRemove = $('<a>').addClass('btn btn-default btn-block btn-sm').append($('<i>').addClass('fa fa-angle-left')).append(' 移除').click(_removeOne);
            var btnSelectAll = $('<a>').addClass('btn btn-default btn-block btn-sm').append('全择 ').append($('<i>').addClass('fa fa-angle-double-right')).click(_selectAll);
            var btnRemoveAll = $('<a>').addClass('btn btn-default btn-block btn-sm').append($('<i>').addClass('fa fa-angle-double-left')).append(' 全移除').click(_removeAll);

            var left = $("<div>").addClass('selectpart selectleft');
            if (params.fromDataUrl.length > 0) {
                left.append($('<div>').addClass('input-icon').append($('<i>').addClass('fa fa-search')).append(inputSearchFrom));
            }
            ;
            left.append($('<div>').addClass('select').append(selectfrom)).appendTo(modal);
            $("<div>").addClass('selectpart selectop').append($('<div>').addClass('clearfix').append(btnSelect).append(btnRemove).append(btnSelectAll).append(btnRemoveAll)).appendTo(modal);
            $("<div>").addClass('selectpart selectright').append($('<div>').addClass('select').append(selectto)).appendTo(modal);

            _loadFromData();
            _loadToData();

            if (params.fromDataUrl.length > 0) {
                selectto.height(selectfrom.height() + 36);
            }
            ;

        });
    };
}));


