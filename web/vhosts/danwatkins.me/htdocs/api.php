<?php
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

include_once('/srv/data/web/vhosts/danwatkins.me/connect_vars.php');

$query = 'SELECT *
			FROM skills';

$statement = $pdo->prepare($query);
$statement->execute();
$skills = $statement->fetchAll( PDO::FETCH_ASSOC );

$return_values = array();
foreach ($skills as $key => $value) {
	$query = 'SELECT *,
			`projects`.*
			FROM `project_skills`
			RIGHT JOIN `projects` ON `project_skills`.`project_id` = `projects`.`id`
			WHERE `skill_id` = '. $skills[$key]['id'];
	$statement = $pdo->prepare($query);
	$statement->execute();
	$projects = $statement->fetchAll( PDO::FETCH_ASSOC );

	$skills[$key]['projects'] = $projects;
}

echo json_encode($skills);
?>




