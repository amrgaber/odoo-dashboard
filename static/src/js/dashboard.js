/** @odoo-module */

import {registry} from  '@web/core/registry'
const {Component, useState} = owl

export class ProjectDashboard extends Component{
    setup(){
        this.project_state = useState({
            projects_count : 100
        }) ;
    }
}

ProjectDashboard.template ="ProjectDashBoardMain"
registry.category("actions").add("project_dashboard_main", ProjectDashboard)