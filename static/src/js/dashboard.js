/** @odoo-module */

import {registry} from '@web/core/registry'

const {Component, onWillStart, onMounted, useState, useRef} = owl

import {jsonrpc} from "@web/core/network/rpc_service"
import {useService} from "@web/core/utils/hooks";

export class ProjectDashboard extends Component {
    setup() {
        this.action = useService("action")
        this.project_hours_ref = useRef("project_hours_ref")
        this.project_hours_ref_pie = useRef("project_hours_ref_pie")
        this.project_count_per_emp = useRef("project_count_per_emp")
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
        await this.render_projects_hours();
        await this.render_project_employee();
    }

    async render_project_employee(){
        var result_data = await this.fetchProjectEmployeeData()
        var $project_by_emp = $(this.project_count_per_emp.el)
        var bar_data = this.prepareChartData(result_data)
        var options_data  = {}
        this.createChart($project_by_emp,"bar",bar_data)
    }

    fetchProjectEmployeeData(){
        return jsonrpc("web/dataset/call_kw/project.project/get_project_count_per_employee", {
            model: 'project.project',
            method: 'get_project_count_per_employee',
            args: [{}],
            kwargs: {}
        });
    }

    // Fetch data from project
    fetchDataProject() {
        var self = this;
        jsonrpc("/get/project/data", {}).then(function (data_result) {
            self.project_state.projects_count = data_result.projects_count
            self.project_state.project_ids = data_result.project_ids
        });
    }

    async render_projects_hours() {
        const result_data = await this.fetchProjectHoursData();
        const chartData = this.prepareChartData(result_data);
        const $el = $(this.project_hours_ref.el);
        const $el_pie = $(this.project_hours_ref_pie.el);
        this.createChart($el,"doughnut",chartData)
        this.createChart($el_pie,"pie",chartData)
    }

    fetchProjectHoursData() {
        return jsonrpc("web/dataset/call_kw/project.project/get_project_hours_pie", {
            model: 'project.project',
            method: 'get_project_hours_pie',
            args: [{}],
            kwargs: {}
        });
    }

    prepareChartData(result_data) {
        const labels = result_data[1]
        const data = result_data[0]
        const colors = generateDynamicColors(labels.length)
        return {
            labels: labels,
            datasets: [
                {
                    label: "Count",
                    data: data,
                    backgroundColor: colors,
                    borderColor: colors.map(color => color.replace('50%', '40%')),
                    borderWidth:3
                }
            ]
        }
    }

    createChart(element, type, data, options={}) {
        new Chart(element, {
            type: type,
            data: data,
            options : options
        })
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