<template>
  <div id="app" class="app-container">
    <nav class="app-navigation">
      <ul class="app-navigation__list">
        <li class="app-navigation__item">
          <router-link to="/employee" class="app-nav-button">Employees</router-link>
        </li>
        <li class="app-navigation__item">
          <router-link to="/company" class="app-nav-button">Companies</router-link>
        </li>
        <li class="app-navigation__item">
          <router-link to="/recruiter" class="app-nav-button">Recruiters</router-link>
        </li>
        <li class="app-navigation__item">
          <router-link to="/applicant" class="app-nav-button">Applicants</router-link>
        </li>
        <li class="app-navigation__item">
          <router-link to="/application" class="app-nav-button">Applications</router-link>
        </li>
        <li class="app-navigation__item">
          <router-link to="/job" class="app-nav-button">Jobs</router-link>
        </li>
        <li class="app-navigation__item">
          <router-link to="/review" class="app-nav-button">Reviews</router-link>
        </li>
      </ul>
    </nav>

    <div class="app-content">
      <div class="app-content-container">
        <router-view :key="$route.path"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>




