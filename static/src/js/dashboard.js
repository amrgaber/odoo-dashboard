/** @odoo-module */

import {registry} from  '@web/core/registry'

const {Component, onWillStart, useState} = owl

import {jsonrpc} from "@web/core/network/rpc_service"

export class ProjectDashboard extends Component{
    setup(){
        this.project_state = useState({
            projects_count : 0,
            project_ids:[]
        }) ;

        onWillStart(this.onWillStart);

    }

    // Event
    async onWillStart(){
        await this.fetchDataProject();
    }

    // Fetch data from project
    fetchDataProject(){
        var self= this;
        jsonrpc("/get/project/data",{}).then(function(data_result){
            self.project_state.projects_count = data_result.projects_count
            self.project_state.project_ids = data_result.project_ids
        });
    }

    _onClickProjects(){
        var project_ids = this.project_state.project_ids
        if(project_ids){
            console.log(project_ids)
        }
    }

}

ProjectDashboard.template ="ProjectDashBoardMain"
registry.category("actions").add("project_dashboard_main", ProjectDashboard)