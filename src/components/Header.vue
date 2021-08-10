<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#"><img class="header-logo" src="/images/logo-header.png" alt=""></b-navbar-brand>
            <b-navbar-toggle class="m-1" target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="text-white w-75">
                    <b-nav-item-dropdown 
                        :class="`m-2 ${$route.path.split('/')[1] === 'tasks' ? 'show' : ''}`" 
                        :text="`Tasks(${ $route.name })`"
                    >
                        <b-dropdown-item to="/tasks/active">Active</b-dropdown-item>
                        <b-dropdown-item to="/tasks/complited">Complited</b-dropdown-item>  
                    </b-nav-item-dropdown>
                    <b-nav-item class="m-2">Feature 1</b-nav-item>
                    <b-nav-item class="m-2">Feature 2</b-nav-item>
                    <b-nav-item class="m-2">Feature 3</b-nav-item>
                    <b-nav-item class="m-2">Feature 4</b-nav-item>
                </b-navbar-nav>
                <b-row class="w-25">
                    <b-col cols="9">
                        <b-form-input placeholder="Search"></b-form-input>
                    </b-col>
                    <b-col cols="3">
                        <b-button  variant="outline-success">Search</b-button>
                    </b-col>
                </b-row>
            </b-collapse>  
        </b-navbar>
    </div>
</template>
<style scoped>
.ds{
    justify-content: space-between;
}
</style>
