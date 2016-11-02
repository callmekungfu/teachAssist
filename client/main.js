import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var htmlCode;
var sidebar = false;
Template.login.rendered = function() {
  this.counter = new ReactiveVar(0);
  var d = new Date();
  var greetings = ["Good Morning!", "Good Afternoon!", "Good Evening!"];
  var h = d.getHours();
  var state;
  if(h < 12 && h > 0){
    state = 0;
  }else if(h<18 && h > 11){
    state = 1;
  }else state = 2;
  document.getElementById("greeting").innerHTML = greetings[state];
}

// LOGIN
Template.login.events({
  'click .loginButton'(){
    document.getElementById('errorMessage').style.display = "none";
    document.getElementById('loginText').style.opacity = "0";
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(Meteor.status().connected){
      Meteor.call("fetchLink",username, password, function(error, results) {
          if ( error ) {
            console.log( error );
          } else {
            if(results.headers['set-cookie'] != null){
              Meteor.call("fetchMark",results.headers.location, results.headers['set-cookie'], function(error, results) {
                if ( error ) {
                  console.log( error );
                } else {
                  htmlCode = results.content;
                  FlowRouter.go("/overview");
                }
              });
            }else{
                document.getElementById('errorText').innerHTML = "Password does not match"
                document.getElementById('loginText').style.opacity = "1";
                document.getElementById('loading').style.dispaly = "none";
                document.getElementById('errorMessage').style.display = "block";

            }
          }
      });
    }else{
      document.getElementById('errorText').innerHTML = "Connection Not Found";
      document.getElementById('loginText').style.opacity = "1";
      document.getElementById('errorMessage').style.display = "block";
    }
  }
});

// PROFILE
Template.profile.onRendered(function helloOnCreated() {
  document.getElementById("htmlCode").innerHTML = htmlCode;
});

Template.profile.events({
  'click .logoutButton'() {
    FlowRouter.go("/");
  }
});

// Overview
Template.overview.events({
  'click #menuToggle'(){
    if(!sidebar){
      document.getElementById("mySidenav").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
      document.body.style.backgroundColor = "rgba(0,0,0,0.6)";
      sidebar = true;
    }else{
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
      document.body.style.backgroundColor = "#e3e3e3";
      sidebar = false;
    }

  }
});
