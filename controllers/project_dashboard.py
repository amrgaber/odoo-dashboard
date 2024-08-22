# -*- coding: utf-8 -*-
##############################################################################
from odoo.http import request,route,Controller

class ProjectDashboard(Controller):

        @route('/get/project/data', auth='user', type='json')
        def fetch_project_data(self):
            """
            when user click on the project dashboard menu, this method will be called
            :return:  dictionary of project data
            """
            project_object = request.env['project.project']
            project_ids = project_object.search([])
            data_dct  = {
                'projects_count': len(project_ids),
                'project_ids':project_ids.mapped('id')
            }
            return data_dct