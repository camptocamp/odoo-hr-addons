// Copyright (C) 2018 by Camptocamp
// License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

odoo.define('web_gantt_public_holidays.gantt_holidays_highlighter', function (require) {
'use strict';

var ganttView = require('web_gantt.GanttView');
var Model = require('web.Model');

ganttView.include({
    load_gantt: function () {
        var res = this._super();

        var hrHolidays = new Model('hr.holidays.public.line');
        hrHolidays.call('search_read', [[], ['date']])
            .then(function (publicHolidays) {
                var publicHolidaysArr = publicHolidays.map(x => x['date']);
                var oldRenderHandler = gantt.templates.task_cell_class;
                gantt.templates.task_cell_class = function (item, date) {
                    res = oldRenderHandler.apply(this, arguments);
                    function zfill(value) {
                        // pads a value w/ a leading zero if it's length is 1
                        // fits this use case, not that usable outside this scope
                        return ('0' + value).slice(-2);
                    }
                    // is needed to transform a `date` object coming as an arg
                    // to Odoo's date format, for the sake of comparing it
                    // against the list of public holidays
                    var datestring = [
                        date.getFullYear(),
                        zfill((date.getMonth() + 1)),  // Jan is 0, surprisingly
                        zfill(date.getDate()),  // though day numbers start at 1
                    ].join('-');
                    if (publicHolidaysArr.indexOf(datestring) !== -1
                            && res.indexOf(' today') === -1) {
                        res += ' o_gantt_public_holiday';
                    }
                    return res;
                };
        });

        return res;
    }
});

});
