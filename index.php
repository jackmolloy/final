<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">

    <!-- C3 styles -->
    <!-- <link href="css/c3.min.css" rel="stylesheet"> -->
    <link href="css/style.css" rel="stylesheet">
  </head>

  <?php

  // TWITTER API
  ini_set('display_errors', 1);
  require_once('TwitterAPIExchange.php');

  // <!-- Set access tokens here - see: https://dev.twitter.com/apps/  -->
  $settings = array(
      'oauth_access_token' => "",
      'oauth_access_token_secret' => "",
      'consumer_key' => "",
      'consumer_secret' => ""
  );


  /** URL for REST request, see: https://dev.twitter.com/docs/api/1.1/ **/
  $url = 'https://api.twitter.com/1.1/blocks/create.json';
  $requestMethod = 'GET';


  // <!-- Perform a GET request and echo the response
  // Note: Set the GET field BEFORE calling buildOauth();  -->
  // $url = 'https://api.twitter.com/1.1/search/tweets.json?geocode=35.8941264,-78.9133741,30mi&q=coffee%20shop%20coffee%20OR%20cafe&src=typdvertical=default';
  // $getfield = '?screen_name=yaboymolloy';
  // $requestMethod = 'GET';
  // $twitter = new TwitterAPIExchange($settings);
  // echo $twitter->setGetfield($getfield)
  //              ->buildOauth($url, $requestMethod)
  //              ->performRequest();


  $url = 'https://api.twitter.com/1.1/search/tweets.json';
  $getfield = 'geocode=35.8941264,-78.9133741,30mi&q=coffee%20shop%20coffee%20OR%20cafe&src=typdvertical=default';
  $requestMethod = 'GET';
  $twitter = new TwitterAPIExchange($settings);
  $tweetData = json_decode($twitter->setGetfield($getfield)
              ->buildOauth($url, $requestMethod)
              ->performRequest(),$assoc=TRUE);


  // DIV FLOAT START (from https://stackoverflow.com/questions/6037712/how-to-float-a-div-over-google-maps)
  echo '<div id="floating-panel">';

  // OVER_MAP START
  // echo '<div id="over_map">';

  // scroll div found at: https://stackoverflow.com/questions/9707397/making-a-div-vertically-scrollable-using-css
  echo '<div class="twitter-feed scrollable-content">';

   foreach($tweetData['statuses'] as $index => $items) {
     $userArray = $items['user'];

     echo '<div class="twitter-post">';
     echo '<a href="http://twitter.com/' . $userArray['screen_name'] . '"><img class="tw-pic" src="' . $userArray['profile_image_url'] . '"/></a>' . '<p class="tw-handle">@' . $userArray['screen_name'] . '</p>' . '<br />' ;
     // echo $userArray['screen_name'] . "<br />";
     echo '<p class="tweet-text">' . $items['text'] . '</p>' . '<br />' ;
     echo '</div>';



   }

   // SCROLL DIV DONE
   echo '</div>';

   // OVER_MAP DONE
   echo '</div>';

   echo '<script> pageComplete(); </script>';



   // YELP API
   // HUGE help retrieving acess token from Patrick Evans at: https://stackoverflow.com/questions/40602788/how-to-get-a-yelp-fusion-api-access-token

   $postData = "grant_type=client_credentials&".
            "client_id=".
            "client_secret=";

   $ch = curl_init();

   //set the url
   curl_setopt($ch,CURLOPT_URL, "https://api.yelp.com/oauth2/token");
   //tell curl we are doing a post
   curl_setopt($ch,CURLOPT_POST, TRUE);
   //set post fields
   curl_setopt($ch,CURLOPT_POSTFIELDS, $postData);
   //tell curl we want the returned data
   curl_setopt($ch,CURLOPT_RETURNTRANSFER, TRUE);
   $result = curl_exec($ch);

   //close connection
   curl_close($ch);

   if($result){
   $data = json_decode($result);
   // echo "Token: ".$data->access_token;
   }

   // Token: qHiPzfIEB6FKzSmkS637eWb5gR20O8yx0c2XFfogZUlBvR9mC9ElTqjUEslOaiFJRFpvjtZr7yTrb8vVJqWREYpvuZmQVtDlPWrjMGNkv6X4xJnaiG_W1W3mTG8lWnYx


   $url = 'https://api.yelp.com/v3/businesses/search?term=coffee&';
   $requestMethod = 'GET';


  ?>




  <body>

    <div id="title">
    <h1>Coffee Shops <span class="sm-title">in the</span> Triangle</h1>
    </div>

      <!-- GOOGLE MAP START -->
      <!-- <div id="google_map"> -->

        <!-- <input id="pac-input" class="controls" type="text" placeholder="Search Box"> -->
        <div id="map"></div>

      <!-- GOOGLE MAP END -->
      <!-- </div> -->

    <!-- WRAPPER END -->
    <!-- </div> -->




    <!-- <div class="container">
    <h1>Latest News</h1>

    <div class="row">
      <div class="col-md-3">
        <div id="sources-area"></div>
      </div>
      <div class="col-md-9">

        <div id="feed-area"></div>

      </div> -->



  </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script type='text/javascript' src='config.js'></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=MY_KEY&libraries=places" type="text/javascript"></script>
    <!-- <script type="text/javascript" src="https://api.twitter.com/1.1/search/tweets.json?vertical=default&q=coffee%20shop%20coffee%20OR%20cafe&near=me&src=typd" type="text/javascript"></script> -->
    <!-- <script async defer src="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.8941264,-78.9133741&radius=50&type=restaurant&key=AIzaSyCLVMA-bqxdvnC-t4AKofWg9M9_dJg37oM"></script> -->
    <script src="js/tweetLinkIt.js"></script>
    <script>
      $('.tweet').tweetLinkify();
    </script>


    <script src="js/script.js"></script>


  </body>
</html>
