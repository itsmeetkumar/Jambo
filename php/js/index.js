var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

var event_template = '<h1>Bowl-a-Thon</h1><img src="https://graph.facebook.com/625288044301120/picture"><h3>Time & date : </h3><p>Fri Jun 24 2016 at 09:00 am</p><h3>Address : </h3><p>RED Rascals Entertainment Depot, Monalisa Centrum, South Wing, Beside INOX, Race Course Road, Vadodara, India</p>';

$(window).load(function() {
  $messages.mCustomScrollbar();
  // setTimeout(function() {
  //   fakeMessage();
  // }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}



function insertMessage() {


  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  $('.message-input').val(null);
  $('<div class="message loading new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  var city = '';
  var category = '';



  setTimeout(function() {
    if (msg.indexOf('events') > -1) {
      city = msg.substring(msg.indexOf("in") + 3);
      $('.message.loading').remove();
      $('<div class="message new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure>' + 'Please wait! We are searching events in ' + city + '</div>').appendTo($('.mCSB_container')).addClass('new');
      $('<div class="message loading new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
      updateScrollbar();
      setTimeout(function() {


        var url = "php/main.php?city="+city;
        var html = "";
        var xmlhttp;


        if (window.XMLHttpRequest) {
              // code for IE7+, Firefox, Chrome, Opera, Safari
              xmlhttp = new XMLHttpRequest();
          } else {
              // code for IE6, IE5
              xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          }

          xmlhttp.onreadystatechange = function() {
              if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
                
            
            if(xmlhttp.status == 200){
              // document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
              console.log(xmlhttp.responseText);
              var data = $.parseJSON(xmlhttp.responseText);
              $('.message.loading').remove();
              // final_data = data.data;
              // console.log(data.username);

              var data = data['data'];
              var dataLength = data.length;
              for (var i = 0; i < dataLength; i++) {
                var event_template = '<h1>' + data[i]['title'] + '</h1><img src="' + data[i]['photo'] + '"><h3>Time & date : </h3><p>' + data[i]['date'] + '</p><h3>Address : </h3><p>' + data[i]['address'] + '</p>';
                $('<div class="message new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure>' + event_template + '</div>').appendTo($('.mCSB_container')).addClass('new');
                console.log(data[i]['title']);
              }
            }
            else if(xmlhttp.status == 400) {
              alert('There was an error 400')
            }
            else {
              alert('something else other than 200 was returned')
            }
              }
          }

          xmlhttp.open("GET", url, true);
          xmlhttp.send();



        
        
        // $('<div class="message new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure>' + event_template + '</div>').appendTo($('.mCSB_container')).addClass('new');
      }, 2000 + (Math.random() * 20) * 100);
    } else if (msg.indexOf('specialist') > -1) {
      city = msg.substring(msg.indexOf("in") + 3);
      spec = msg.substring(0, msg.indexOf("specialist")-1);
      $('.message.loading').remove();
      $('<div class="message new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure>' + 'Please wait! We are searching '  + spec + ' specialist in ' + city + '</div>').appendTo($('.mCSB_container')).addClass('new');
      $('<div class="message loading new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
      updateScrollbar();
      setTimeout(function() {


        var url = "php/doctor.php?spec="+spec+"&city="+city;
        var html = "";
        var xmlhttp;


        if (window.XMLHttpRequest) {
              // code for IE7+, Firefox, Chrome, Opera, Safari
              xmlhttp = new XMLHttpRequest();
          } else {
              // code for IE6, IE5
              xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          }

          xmlhttp.onreadystatechange = function() {
              if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
                
            
            if(xmlhttp.status == 200){
              // document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
              console.log(xmlhttp.responseText);
              var data = $.parseJSON(xmlhttp.responseText);
              $('.message.loading').remove();
              // final_data = data.data;
              // console.log(data.username);

              var data = data['data'];
              console.log(data);
              var dataLength = data.length;
              for (var i = 0; i < dataLength; i++) {
                var event_template = '<h1>' + data[i]['name'] + '</h1><h3>Address : </h3><p>' + data[i]['address'] + '</p><h3>Phone : </h3><p>' + data[i]['phone'] + '</p>';
                $('<div class="message new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure>' + event_template + '</div>').appendTo($('.mCSB_container')).addClass('new');
              }
            }
            else if(xmlhttp.status == 400) {
              alert('There was an error 400')
            }
            else {
              alert('something else other than 200 was returned')
            }
              }
          }

          xmlhttp.open("GET", url, true);
          xmlhttp.send();



        
        
        // $('<div class="message new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure>' + event_template + '</div>').appendTo($('.mCSB_container')).addClass('new');
      }, 2000 + (Math.random() * 20) * 100);
    } else if (msg.indexOf('go') > -1) {
      f = msg.substring(msg.indexOf("from") + 5);
      t = msg.substring(msg.indexOf("go") + 3, msg.indexOf("from")-1);
      console.log(f);
      console.log(t);
      $('.message.loading').remove();
      $('<div class="message new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure>' + 'Please wait! We are searching available transporation medium... </div>').appendTo($('.mCSB_container')).addClass('new');
      $('<div class="message loading new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
      updateScrollbar();
      var event_template = '<img src="js/map.png" height="250"><h3>From : </h3><p>' + f + '</p><h3>To : </h3><p>' + t + '</p>';
      $('<div class="message new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure>' + event_template + '</div>').appendTo($('.mCSB_container')).addClass('new');

      var event_template = '<h1>Ahmedabad ST Stand</h1><h3>Address : </h3><p>Astodia Road, Geeta Mandir Road, Ahmedabad - 380022</p><h3>Contact : </h3><p>+(91)-79-25463396,</p>';
      $('<div class="message new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure>' + event_template + '</div>').appendTo($('.mCSB_container')).addClass('new');

      var event_template = '<h1>Ahmedabad Railway Station</h1><h3>Address : </h3><p>Kalupur, Ahmedabad (Central Zone), Gujarat</p><h3>Contact : </h3><p>+(91)-79-36456887,</p>';
      $('<div class="message new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure>' + event_template + '</div>').appendTo($('.mCSB_container')).addClass('new');
      $('.message.loading').remove();
    } else {
      $('.message.loading').remove();
      $('<div class="message new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure>Jambo is still learning. Try these phrases.<br><br>->Events in vadodara<br>->Cancer specialist in vadodara.</div>').appendTo($('.mCSB_container')).addClass('new');
      updateScrollbar();
    }
  }, 1000 + (Math.random() * 20) * 100);

    

    

  
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

var Fake = [
  'Hi there, I\'m Fabio and you?',
  ':)'
]

function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message message-personal"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure>' + event_template + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100);

}