<?php

require('./conf.php');

$url = $baseUrl . '/patchfile';

switch($_SERVER['REQUEST_METHOD']) {
    
    case 'POST':
        $post['userId'] = $_POST['userId'];
        $post['file'] = '@' . $_FILES['thefile']['tmp_name'];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
        
        header('Content-Type: application/json');
        $response = curl_exec($ch);               
        break;
    
    case 'GET':
        $parts = explode('/', $_SERVER['REQUEST_URI']);

        if( count($parts) < 4 ) {
            throw new Exception('invalid patch');            
        }
        
        $patchId = $parts[2];
        $userId = $parts[3];
        
        $url .= '/' . $patchId . '/' . $userId;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
        
        header('Content-Type: application/json');
        $response = curl_exec($ch);
        
        break;
    
   case 'PUT': 
        $data = file_get_contents('php://input');
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        
        header('Content-Type: application/json');
        $response = curl_exec($ch);
        break;       
}