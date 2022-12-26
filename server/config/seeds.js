const db = require('./connection');
const { Project, Response } = require('../models');

db.once('open', async () => {
  await Project.deleteMany();

  const projects = await Project.insertMany([
    { 
        name: 'AgendaMe', 
        projectId:'461236220',    
        image: 'https://raw.githubusercontent.com/dsamuelson/AgendaMe/main/assets/images/Cover-photo.png',
        htmlUrl: 'https://github.com/dsamuelson/AgendaMe',
        deployedUrl: 'https://dsamuelson.github.io/AgendaMe/',
        topics: ['HTML', 'moment.js', 'Javascript']
    },
    { 
        name: 'parkscape', 
        projectId:'464319044',    
        image: 'https://raw.githubusercontent.com/emilypape/parkscape/main/assets/images/ParkScape-main-page.png',
        htmlUrl: 'https://github.com/emilypape/parkscape',
        deployedUrl: 'https://emilypape.github.io/parkscape/',
        topics: ['HTML', 'APIs', 'Group']
    },
    { 
        name: 'everywhere', 
        projectId:'505240156',    
        image: 'https://raw.githubusercontent.com/emilypape/everywhere/main/assets/images/home-Page.png',
        htmlUrl: 'https://github.com/emilypape/everywhere',
        deployedUrl: 'https://stark-harbor-20365.herokuapp.com/',
        topics: ['Redux', 'MERN Stack', 'Group']
    },
    { 
        name: 'Run-Buddy', 
        projectId:'449473772',    
        image: 'https://raw.githubusercontent.com/dsamuelson/run-buddy/main/assets/images/hero-bg.jpg',
        htmlUrl: 'https://github.com/dsamuelson/run-buddy',
        deployedUrl: 'https://dsamuelson.github.io/run-buddy/',
        topics: ['HTML', 'CSS', 'Pre-built']
    },
    { 
        name: 'budgetek', 
        projectId:'486003247',    
        image: 'https://raw.githubusercontent.com/dsamuelson/Budgetek/main/assets/images/login-page.png',
        htmlUrl: 'https://github.com/dsamuelson/Budgetek',
        deployedUrl: 'https://quiet-tundra-30236.herokuapp.com/',
        topics: ['Server', 'APIs', 'Group']
    },
    { 
        name: 'sample-portfolio', 
        projectId:'453771139',    
        image: 'https://raw.githubusercontent.com/dsamuelson/sample-portfolio/main/assets/images/mobile-view.png',
        htmlUrl: 'https://github.com/dsamuelson/sample-portfolio',
        deployedUrl: 'https://dsamuelson.github.io/sample-portfolio',
        topics: ['HTML', 'CSS', 'personal']
    },
    {
        projectId: '504725603',
        name: 'book-it-belle',
        image: 'https://raw.githubusercontent.com/dsamuelson/book-it-belle/main/assets/images/results-page.png',
        htmlUrl: 'https://github.com/dsamuelson/book-it-belle',
        deployedUrl: 'https://gentle-retreat-03024.herokuapp.com/',
        topics: ['Apollo', 'React', 'personal']
    },
    {
        projectId: '495172069',
        name: 'dear-diary',
        image: 'https://raw.githubusercontent.com/dsamuelson/dear-diary/main/assets/images/add-user.png',
        htmlUrl: 'https://github.com/dsamuelson/dear-diary',
        deployedUrl: 'https://github.com/dsamuelson/dear-diary',
        topics: ['CLI', 'MongoDB', 'Personal']
    },
    {
        projectId: '500970697',
        name: 'deep-thoughts',
        image: 'https://raw.githubusercontent.com/dsamuelson/deep-thoughts/main/assets/images/Cover-photo.png',
        htmlUrl: 'https://github.com/dsamuelson/deep-thoughts',
        deployedUrl: "https://arcane-ocean-39977.herokuapp.com/",
        topics: ['Social Media', 'MERN Stack', 'Classwork']
    },
    {
        projectId: '482391221',
        name: 'e-comm-backend',
        image: 'https://raw.githubusercontent.com/dsamuelson/e-comm-backend/main/assets/images/product-input.png',
        htmlUrl: 'https://github.com/dsamuelson/e-comm-backend',
        deployedUrl: 'https://protected-lake-94679.herokuapp.com/',
        topics: ['CLI', 'SQL', 'Personal']
    },
    {
        projectId: '495947524',
        name: 'food-festival',
        image: 'https://raw.githubusercontent.com/dsamuelson/food-festival/main/assets/img/grill.jpg?raw=true',
        htmlUrl: 'https://github.com/dsamuelson/food-festival',
        deployedUrl: 'https://dsamuelson.github.io/food-festival/',
        topics: ['Webkit', 'optimization', 'classwork']
    },
    {
        projectId: '471751176',
        name: 'Gen-Readme',
        image: 'https://raw.githubusercontent.com/dsamuelson/Gen-Readme/main/images/questions-screen.png',
        htmlUrl: 'https://github.com/dsamuelson/Gen-Readme',
        deployedUrl: 'https://watch.screencastify.com/v/3hdxE1gaiydfkAZZpXDs',
        topics: ['CLI', 'Inquirer.js', 'Personal']
    },
    {
        projectId: '462087572',
        name: 'git-it-done',
        image: 'https://raw.githubusercontent.com/dsamuelson/git-it-done/main/assets/images/Cover-photo.png',
        htmlUrl: 'https://github.com/dsamuelson/git-it-done',
        deployedUrl: 'https://dsamuelson.github.io/git-it-done/',
        topics: ['Server APIs', 'H-C-J', 'Classwork']
    },
    {
        projectId: '451307475',
        name: 'Horiseon-landing-page',
        image: 'https://raw.githubusercontent.com/dsamuelson/Horiseon-landing-page/main/assets/images/Screen%20Shot%202022-01-23%20at%209.14.20%20PM.png',
        htmlUrl: 'https://github.com/dsamuelson/Horiseon-landing-page',
        deployedUrl: 'https://dsamuelson.github.io/Horiseon-landing-page/',
        topics: ['Refactoring', 'Hero Page', 'Personal']
    },
    {
        projectId: '472576640',
        name: 'jest-another-rpg',
        image: 'https://raw.githubusercontent.com/dsamuelson/jest-another-rpg/main/assets/images/Cover-photo.png',
        htmlUrl: 'https://github.com/dsamuelson/jest-another-rpg',
        deployedUrl: 'https://github.com/dsamuelson/jest-another-rpg',
        topics: ['OOP', 'Jest.js', 'Classwork']
    },
    {
        projectId: '480917220',
        name: 'just-tech-news',
        image: 'https://raw.githubusercontent.com/dsamuelson/just-tech-news/main/assets/images/Cover-photo.png',
        htmlUrl: 'https://github.com/dsamuelson/just-tech-news',
        deployedUrl: 'https://protected-lake-94679.herokuapp.com/',
        topics: ['MVC, ORM', 'Sequelize', 'Classwork']
    },
    {
        projectId: '476914550',
        name: 'Notify-Me',
        image: 'https://raw.githubusercontent.com/dsamuelson/Notify-Me/main/assets/images/note-list.png',
        htmlUrl: 'https://github.com/dsamuelson/Notify-Me',
        deployedUrl: 'https://notifymeuou.herokuapp.com/',
        topics: ['Web APIs', 'Express.js', 'Personal']
    },
    {
        projectId: '456000998',
        name: 'p-gen',
        image: 'https://raw.githubusercontent.com/dsamuelson/p-gen/main/assets/images/password-generated.png',
        htmlUrl: 'https://github.com/dsamuelson/p-gen',
        deployedUrl: 'https://dsamuelson.github.io/p-gen/',
        topics: ['Javascript', 'String Manipulation','Personal']
    },
    {
        projectId: '498435878',
        name: 'photo-port',
        image: 'https://raw.githubusercontent.com/dsamuelson/spa-portfolio/main/src/assets/images/photo-port-cut.png',
        htmlUrl: 'https://github.com/dsamuelson/photo-port',
        deployedUrl: 'https://dsamuelson.github.io/photo-port/',
        topics: ['Filtering', 'React', 'Classwork']
    },
    {
        projectId: '493364894',
        name: 'pizza-hunt',
        image: 'https://raw.githubusercontent.com/dsamuelson/pizza-hunt/main/public/assets/images/Cover-photo.png',
        htmlUrl: 'https://github.com/dsamuelson/pizza-hunt',
        deployedUrl: 'https://hidden-reef-02164.herokuapp.com/',
        topics: ['MongoDB', 'virtuals','Classwork']
    },
    {
        projectId: '469864865',
        name: 'portfolio-generator',
        image: 'https://raw.githubusercontent.com/dsamuelson/portfolio-generator/main/assets/images/Cover-photo.png',
        htmlUrl: 'https://github.com/dsamuelson/portfolio-generator',
        deployedUrl: 'https://github.com/dsamuelson/portfolio-generator',
        topics: ['node.js', 'async', 'Classwork']
    },
    {
        projectId: '497727139',
        name: 'pwa-budget',
        image: 'https://raw.githubusercontent.com/dsamuelson/pwa-budget/main/assets/images/home-screen.png',
        htmlUrl: 'https://github.com/dsamuelson/pwa-budget',
        deployedUrl: 'https://serene-island-11384.herokuapp.com/',
        topics: ['PWAs', 'Graph.js', 'Personal']
    },
    {
        projectId: '458636293',
        name: 'Quizzify',
        image: 'https://raw.githubusercontent.com/dsamuelson/Quizzify/main/assets/images/Quizzify-start-screen.png',
        htmlUrl: 'https://github.com/dsamuelson/Quizzify',
        deployedUrl: 'https://dsamuelson.github.io/Quizzify/',
        topics: ['Local Storage', 'setTimeout', 'Personal']
    },
    {
        projectId: '507430110',
        name: 'redux-refactor',
        image: 'https://raw.githubusercontent.com/dsamuelson/redux-refactor/main/assets/images/index-provider.png',
        htmlUrl: 'https://github.com/dsamuelson/redux-refactor',
        deployedUrl: 'https://guarded-caverns-64367.herokuapp.com/',
        topics: ['redux', 'PWA', 'Personal']
    },
    {
        projectId: '492677647',
        name: 'regex-tutorial',
        image: 'https://raw.githubusercontent.com/dsamuelson/regex-tutorial/main/assets/images/Cover-photo.png',
        htmlUrl: 'https://github.com/dsamuelson/regex-tutorial',
        deployedUrl: 'https://gist.github.com/dsamuelson/87fd6c2115e3b36a8eeb88d94647bb5e',
        topics: ['git gist', 'regex', 'personal']
    },
    {
        projectId: '455046445',
        name: 'Robot-Battle',
        image: 'https://raw.githubusercontent.com/dsamuelson/Robot-Battle/main/assets/images/Cover-photo.png',
        htmlUrl: 'https://github.com/dsamuelson/Robot-Battle',
        deployedUrl: 'https://dsamuelson.github.io/Robot-Battle/',
        topics: ['Javascript', 'RNG', 'Classwork']
    },
    {
        projectId: '503460232',
        name: 'shop-shoppe',
        image: 'https://raw.githubusercontent.com/dsamuelson/shop-shoppe/main/assets/images/Cover-photo.png',
        htmlUrl: 'https://github.com/dsamuelson/shop-shoppe',
        deployedUrl: 'https://guarded-caverns-64367.herokuapp.com/',
        topics: ['PWA', 'State', 'Classwork']
    },
    {
        projectId: '500584433',
        name: 'spa-portfolio',
        image: 'https://raw.githubusercontent.com/dsamuelson/spa-portfolio/main/src/assets/images/portfolios-page-desktop.png',
        htmlUrl: 'https://github.com/dsamuelson/spa-portfolio',
        deployedUrl: 'https://dsamuelson.github.io/spa-portfolio/',
        topics: ['SPAs', 'React', 'Personal']
    },
    {
        projectId: '456790611',
        name: 'Taskinator',
        image: 'https://raw.githubusercontent.com/dsamuelson/Taskinator/main/assets/images/Cover-photo.png',
        htmlUrl: 'https://github.com/dsamuelson/Taskinator',
        deployedUrl: 'https://dsamuelson.github.io/Taskinator/',
        topics: ['CSS', 'WebAPIs', 'Classwork']
    },
    {
        projectId: '459259353',
        name: 'Taskmaster-pro',
        image: 'https://raw.githubusercontent.com/dsamuelson/Taskmaster-pro/main/assets/images/Cover-photo.png',
        htmlUrl: 'https://github.com/dsamuelson/Taskmaster-pro',
        deployedUrl: 'https://dsamuelson.github.io/Taskmaster-pro/',
        topics: ['JQuery', '3rd party APIs', 'Classwork']
    },
    {
        projectId: '484851153',
        name: 'Tblog-it',
        image: 'https://raw.githubusercontent.com/dsamuelson/Tblog-it/main/assets/images/dashboard.png',
        htmlUrl: 'https://github.com/dsamuelson/Tblog-it',
        deployedUrl: 'https://mighty-peak-35572.herokuapp.com/',
        topics: ['Cookies', 'Authentication', 'Personal']
    },
    {
        name: 'Zookeeper',
        projectId: '475587058',
        image: 'https://raw.githubusercontent.com/dsamuelson/Zookeeper/main/assets/images/Cover-photo.png',
        htmlUrl: 'https://github.com/dsamuelson/Zookeeper',
        deployedUrl: 'https://zookepruou.herokuapp.com/',
        topics: ['Express.js', 'REST API', 'Classwork']
    },
    {
        name: 'Workforce',
        projectId: '474434131',
        image: 'https://raw.githubusercontent.com/dsamuelson/Workforce/main/assets/images/full-run.png',
        htmlUrl: 'https://github.com/dsamuelson/Workforce',
        deployedUrl: 'https://watch.screencastify.com/v/L9wA5gBBWyJsnwcD81Cw',
        topics: ['node.js', 'HTML Generator', 'Personal']
    },
    {
        name: 'workbase-manager',
        projectId: '480109754',
        image: 'https://raw.githubusercontent.com/dsamuelson/workbase-manager/main/assets/images/workbase-menus.png',
        htmlUrl: 'https://github.com/dsamuelson/workbase-manager',
        deployedUrl: 'https://github.com/dsamuelson/workbase-manager',
        topics: ['CLI', 'SQL', 'Personal']
    },
    {
        name: 'Weatherbyme',
        projectId: '463971369',
        image: 'https://raw.githubusercontent.com/dsamuelson/Weatherbyme/main/assets/images/full-Dash.png',
        htmlUrl: 'https://github.com/dsamuelson/Weatherbyme',
        deployedUrl: 'https://dsamuelson.github.io/Weatherbyme/',
        topics: ['moment.js', 'WebAPIs', 'Personal']
    },
    {
        name: 'u-vote-it',
        projectId: '478250848',
        image: 'https://raw.githubusercontent.com/dsamuelson/u-vote-it/main/assets/images/Cover-photo.jpg',
        htmlUrl: 'https://github.com/dsamuelson/u-vote-it',
        deployedUrl: 'https://github.com/dsamuelson/u-vote-it',
        topics: ['Authentication', 'SQL', 'Classwork']
    }
  ]);
  process.exit();
});
  console.log('Projects seeded');