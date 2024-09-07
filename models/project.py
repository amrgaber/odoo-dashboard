# -*- coding: utf-8 -*-

import calendar
from datetime import datetime

from dateutil.relativedelta import relativedelta
from odoo import api, fields, models


class ProjectProject(models.Model):
    _inherit = 'project.project'

    @api.model
    def get_project_hours_pie(self, kwargs):
        #  for testing
        analytic_project = self.env['account.analytic.line']
        projects = analytic_project.read_group(
            domain=[],
            fields=['project_id', 'unit_amount:sum'],
            groupby=['project_id']
        )
        project_with_hours = {
            project['project_id'][1]: project['unit_amount']
            for project in projects if project['project_id']
        }
        names = [project_name for project_name in project_with_hours]
        counts = [project_with_hours[project_name] for project_name in project_with_hours]

        return [counts, names]

    @api.model
    def get_project_count_per_employee(self, kwargs):
        lst = [
            [10, 20, 30,15,25],
            ['Ahmed','Ali','Mohamed','AAA','BBB']
        ]
        return lst