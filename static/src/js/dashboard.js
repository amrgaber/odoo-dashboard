/** @odoo-module */

import {registry} from '@web/core/registry'

const {Component, onWillStart, onMounted, useState} = owl

import {jsonrpc} from "@web/core/network/rpc_service"
import {useService} from "@web/core/utils/hooks";

export class ProjectDashboard extends Component {
    setup() {
        this.action = useService("action")
        this.project_state = useState({
            projects_count: 0,
            project_ids: []
        });

        onWillStart(this.onWillStart);
        onMounted(this.onMounted);
    }

    // Event
    async onWillStart() {
        await this.fetchDataProject();
    }

    async onMounted() {
        this.render_projects_hours();
    }

    // Fetch data from project
    fetchDataProject() {
        var self = this;
        jsonrpc("/get/project/data", {}).then(function (data_result) {
            self.project_state.projects_count = data_result.projects_count
            self.project_state.project_ids = data_result.project_ids
        });
    }

    render_projects_hours() {
        var self = this;
        var ctx = $('.project_hours')
        var data = {
            labels: [
                'ProA',
                'ProjB',
                'ProjC'
            ],
            datasets: [
                {
                    label: "Dataset",
                    data: [100, 200, 300],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                }
            ]
        }
        jsonrpc("web/dataset/call_kw/project.project/get_project_hours_pie", {
            model: 'project.project',
            method: 'get_project_hours_pie',
            args: [{}],
            kwargs: {}
        }).then(function (result_data) {
            var data = {
                labels: result_data[1],
                datasets: [{
                    label: "Count",
                    data: result_data[0],
                    backgroundColor: [
                        "#f95d6a",
                        "#665191",
                        "#d45087",
                        "#ff7c43",
                        "#003f5c",
                        "#2f4b7c",
                        "#ffa600",
                        "#a05195",
                        "#6d5c16"
                    ],
                    borderColor: [
                        "#003f5c",
                        "#2f4b7c",
                        "#f95d6a",
                        "#665191",
                        "#d45087",
                        "#ff7c43",
                        "#ffa600",
                        "#a05195",
                        "#6d5c16"
                    ],
                    borderWidth: 3
                }]
            };
            new Chart(ctx, {
                type: 'doughnut',
                data: data,
            });

        });
    }


    _onClickProjects() {
        var project_ids = this.project_state.project_ids
        // Action - way 1
        let context = {}
        var options = {
            additional_context: context,
            clearBreadcrumbs: false
        }
        this.action.doAction({
            name: ("Projects"),
            type: 'ir.actions.act_window',
            res_model: 'project.project',
            view_mode: 'form',
            views: [[false, 'list']],
            domain: [['id', 'in', project_ids]],
            context: {
                create: false
            },
            target: 'current'
        }, options)
        // Action = way 2
        // let xml_id = "project.open_view_project_all_config"
        // this.action.doAction(xml_id,{
        //     options
        // });
    }

}

ProjectDashboard.template = "ProjectDashBoardMain"
registry.category("actions").add("project_dashboard_main", ProjectDashboard)