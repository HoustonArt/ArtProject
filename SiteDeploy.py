"""program to package site for deployment.  Will be part of a bash file"""
import os
import shutil

DIRECTORIES = ['app','Artists','assets']

TEXT = """
<html>

  <head>
    <title>ArtLike</title>
        <link rel="stylesheet" type="text/css" href="./assets/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="./assets/css/new-material.css">
        <link rel="stylesheet" type="text/css" href="./assets/css/ripples.min.css">

        <script src="./assets/angular2-polyfills.min.js"></script>
        <script src="./assets/system.src.js"></script>
        <script src="./assets/Rx.min.js"></script>
        <script src="./assets/router.min.js"></script>
        <script src="./assets/angular2.min.js"></script>
        <script src="./assets/jquery.min.js"></script>
        <script src="./assets/bootstrap.min.js"></script>
      <script src="https://www.gstatic.com/firebasejs/3.2.1/firebase.js"></script>
      <script src="https://www.gstatic.com/firebasejs/3.2.1/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/3.2.1/firebase-auth.js"></script>
      <script src="https://www.gstatic.com/firebasejs/3.2.1/firebase-database.js"></script>
      <script src="https://www.gstatic.com/firebasejs/3.2.1/firebase-storage.js"></script>

      <script src="./assets/material.min.js"></script>
      <script src=".assets/ripples.min.js"></script>
        <!-- 2. Configure SystemJS -->
        <style>
      html{
         position: relative;
         min-height:100%;
         }
  </style>
    <script>
    var config = {
    apiKey: "AIzaSyAZ35SfNAcOJV7Jc6jbsofyJLhigV8R52c",
    authDomain: "artlike.firebaseapp.com",
    databaseURL: "https://artlike.firebaseio.com",
    storageBucket: "firebase-artlike.appspot.com",
  };
    firebase.initializeApp(config);
      System.config({
        packages: {
          app: {
            format: 'register',
            defaultExtension: 'js'
          }
        }
      });
      System.import('app/boot')
            .then(null, console.error.bind(console));
    </script>

  </head>
  <base href="/">
  <!-- 3. Display the application -->
  <body>
    <my-app>Loading ArtLike...</my-app>
  </body>

</html>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-45815234-2', 'auto');
  ga('send', 'pageview');


  $.material.init()
</script>
"""


def get_index():
    with open('dist/index.html','w') as f:
        f.write(TEXT)
    print('Index Written')

def copy_js_folder(name):
    path = os.path.join(os.getcwd(),name)
    output_path = os.path.join(os.getcwd(),os.path.join('dist', name))
    if not os.path.exists(output_path):
        os.makedirs(output_path)
    elements = os.listdir(name)
    isdir = [os.path.isdir(os.path.join(path,i)) for i in elements]
    for i, element in enumerate(elements):
        if isdir[i]:
            copy_js_folder(os.path.join(name, element))
        else:
            if element.split('.')[-1] == 'js':
                in_file = os.path.join(path,element)
                out_file = os.path.join(output_path,element)

                with open(in_file,'r') as f:
                    data = f.readlines()

                with open(out_file,'w') as f:
                    f.write("".join([i for i in data]))

                print('Written: {0} to {1}'.format(in_file,out_file))

def copy_folder(name):
    src = os.path.join(os.getcwd(),name)
    dest = os.path.join(os.getcwd(),os.path.join('dist', name))

    try:
        shutil.copytree(src, dest)
        print('Written: {0} to {1}'.format(src,dest))
    # Directories are the same
    except shutil.Error as e:
        print('Directory not copied. Error: %s' % e)
    # Any error saying that the directory doesn't exist
    except OSError as e:
        print('Directory not copied. Error: %s' % e)


if __name__ == "__main__":
    try:
        shutil.rmtree('dist')
    except:
        print('dist already destroyed')
    os.makedirs(os.path.join(os.getcwd(),'dist'))
    get_index()
    copy_folder('partials')
    copy_folder('assets')
    copy_folder('images')
    copy_js_folder('app')
