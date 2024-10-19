<?php

/*
Plugin Name: Create Multiple Page
Description: Un plugin WordPress qui utilise une architecture headless pour créer plusieurs pages à partir d'un formulaire React.
Version: 1.0
Author: Mouadh Aouiti
*/

function create_multiple_page_form_shortcode() {
	ob_start();
	?>
	<div id="react-root"></div>
	<?php
	return ob_get_clean();
}
add_shortcode('create_multiple_page_form', 'create_multiple_page_form_shortcode');

function cmp_enqueue_scripts() {
	wp_enqueue_script(
		'cmp-react-app',
		plugins_url('dist/bundle.js', __FILE__),
		array('wp-element', 'wp-api'),
		'1.0',
		true
	);

	wp_localize_script('cmp-react-app', 'cmpApi', array(
		'root'  => esc_url(rest_url()),
		'nonce' => wp_create_nonce('wp_rest')
	));
}
add_action('wp_enqueue_scripts', 'cmp_enqueue_scripts');

add_action('rest_api_init', function () {
	register_rest_route('cmp/v1', '/create-pages', array(
		'methods'             => 'POST',
		'callback'            => 'cmp_create_pages',
		'permission_callback' => function () {
			return current_user_can('edit_posts');
		}
	));
});

function cmp_create_pages($request) {
	$titles      = $request['titles'];
	$description = sanitize_textarea_field($request['description']);
	$excerpt     = sanitize_text_field($request['excerpt']);
	$cities      = $request['cities'];

	foreach ($cities as $city) {
		$post_data = array(
			'post_title'   => sanitize_text_field($titles) . ' - ' . sanitize_text_field($city),
			'post_content' => $description,
			'post_excerpt' => $excerpt,
			'post_status'  => 'publish',
			'post_type'    => 'page',
		);
		wp_insert_post($post_data);
	}

	return new WP_REST_Response('Pages created successfully', 200);
}
