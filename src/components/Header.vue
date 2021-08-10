<template>
    <div>
        <b-navbar type="dark" variant="dark">
            <b-navbar-brand href="#"><img class="header-logo" src="/images/logo-header.png" alt=""></b-navbar-brand>
            <b-collapse is-nav>
                <b-navbar-nav class="text-white">
                    <b-nav-item-dropdown  text="Tasks">
                        <b-dropdown-item href="/tasks/active">Active</b-dropdown-item>
                        <b-dropdown-item href="/tasks/complited">Complited</b-dropdown-item>  
                    </b-nav-item-dropdown>
                    <b-nav-item>Feature 1</b-nav-item>
                    <b-nav-item>Feature 2</b-nav-item>
                    <b-nav-item>Feature 3</b-nav-item>
                    <b-nav-item>Feature 4</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
            <b-collapse is-nav class="ml-auto justify-content-end">
                <b-form-input class="w-50 m-2" placeholder="Search"></b-form-input>
                <b-button class="m-2"  variant="outline-success">Search</b-button>
            </b-collapse>
        </b-navbar>
    </div>
</template>
