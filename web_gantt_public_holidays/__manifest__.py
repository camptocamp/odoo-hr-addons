# -*- coding: utf-8 -*-
# Copyright (C) 2018 by Camptocamp
# License LGPL or later (http://www.gnu.org/licenses/lgpl).
{
    'name': """Web Gantt Public Holidays""",
    'summary': """Highlight public holidays on Gantt views""",
    'category': "Hidden",
    'version': "10.0.1.0.0",
    'application': False,

    'author': "Camptocamp SA, "
              "Odoo Community Association (OCA)",

    'website': "https://camptocamp.com",
    'license': "LGPL-3",

    'depends': [
        'hr_holidays_gantt',
        'hr_public_holidays',
    ],
    'data': [
        'templates/assets.xml',
    ],
}
