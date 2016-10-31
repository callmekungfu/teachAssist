import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var htmlCode;

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0

});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

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
    document.getElementById('errorMessage').style.opacity = "0";
    document.getElementById('loginText').style.opacity = "0";
    document.getElementById('loading').style.opacity = "1";
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    //console.log(getParameterByName("username", 'https://ta.yrdsb.ca/gamma-live/index.php/login.jsp?username='+username+'&password='+password));
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
                  FlowRouter.go("/profile");
                  //document.getElementById("test").innerHTML = results.content;
                }
              });
            }else{
                document.getElementById('errorText').innerHTML = "Login Unsuccessful"
                document.getElementById('loginText').style.opacity = "1";
                document.getElementById('loading').style.opacity = "0";
                document.getElementById('errorMessage').style.opacity = "1";

            }
          }
      });
    }else{
      document.getElementById('errorText').innerHTML = "Connection Not Found";
      document.getElementById('loginText').style.opacity = "1";
      document.getElementById('loading').style.opacity = "0";
      document.getElementById('errorMessage').style.opacity = "1";
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
  },
});
