# -*- coding: utf-8 -*-
{
    'name': 'Odoo Project Dashboard',
    'version': '17.0.1.0.0',
    'category': 'project',
    'summary': """
    Get a Detailed View Dashboard for Project .
    """,
    'description': """
    In this dashboard user can get the Detailed Information about Project, Task, 
    Employee, Hours recorded, Total Margin and Total Sale Orders.
    """,
    'author': 'amrgaber',
    'depends': ['sale_management', 'project', 'sale_timesheet'],
    'data': [
        'views/views.xml'
    ],
    'assets': {
        'web.assets_backend': [
            'project_dashboard/static/src/css/dashboard.css',
            'https://cdn.jsdelivr.net/npm/chart.js',
            'project_dashboard/static/src/js/dashboard.js',
            'project_dashboard/static/src/xml/dashboard.xml',
        ]},
    'images': [],
    'installable': True,
    'application': False,
    'auto_install': False,
}
