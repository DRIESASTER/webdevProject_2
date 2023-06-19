import {createRouter, createWebHistory} from "vue-router";

import ResourceList from "../components/ResourceList.vue";
import EmployeeDetails from "../components/employee/EmployeeDetails.vue";
import EmployeeForm from "../components/employee/EmployeeForm.vue";
import CompanyForm from "@/components/companies/CompanyForm";
import CompanyDetails from "@/components/companies/CompanyDetails";
import JobForm from "@/components/jobs/JobForm";
import JobDetails from "@/components/jobs/JobDetails";
import ApplicationForm from "@/components/applications/ApplicationForm";
import ApplicationDetails from "@/components/applications/ApplicationDetails";
import RecruiterForm from "@/components/recruiters/RecruiterForm";
import RecruiterDetails from "@/components/recruiters/RecruiterDetails";
import ReviewForm from "@/components/reviews/ReviewForm";
import ReviewDetails from "@/components/reviews/ReviewDetails";
import ApplicantForm from "@/components/applicant/ApplicantForm";
import ApplicantDetails from "@/components/applicant/ApplicantDetails";

function createResourceRoutes(resourceType, listName, attribute, formComponent, detailsComponent) {
    const base = `/${resourceType}`;
    return [
        {
            path: base,
            name: resourceType,
            component: ResourceList,
            props: {resourceType, resourceListName: listName, attribute},
        },
        {
            path: `${base}/form`,
            name: `${resourceType}Add`,
            component: formComponent,
            props: true,
        },
        {
            path: `${base}/form/:url`,
            name: `${resourceType}Edit`,
            component: formComponent,
            props: true,
        },
        {
            path: `${base}/:url`,
            name: `${resourceType}Details`,
            component: detailsComponent,
            props: true,
        }
    ];
}

const routes = [
    ...createResourceRoutes('employee', 'employees', 'name', EmployeeForm, EmployeeDetails),
    ...createResourceRoutes('company', 'companies', 'name', CompanyForm, CompanyDetails),
    ...createResourceRoutes('applicant', 'applicants', 'name', ApplicantForm, ApplicantDetails),
    ...createResourceRoutes('application', 'applications', 'text', ApplicationForm, ApplicationDetails),
    ...createResourceRoutes('job', 'jobs', 'description', JobForm, JobDetails),
    ...createResourceRoutes('recruiter', 'recruiters', 'name', RecruiterForm, RecruiterDetails),
    ...createResourceRoutes('review', 'reviews', 'text', ReviewForm, ReviewDetails),
];





const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
