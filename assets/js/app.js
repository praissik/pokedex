import './bootstrap';

// import base things
import Vue from 'vue';

// import local components
import './components';

// import require elementUI components
import './components/element';

// import app
import app from './App.vue';

// mount application
new Vue(app);