/** @odoo-module */

import {registry} from  '@web/core/registry'
const {Component} = owl

export class ProjectDashboard extends Component{

}

ProjectDashboard.template ="ProjectDashBoardMain"
registry.category("actions").add("project_dashboard_main", ProjectDashboard)