<?php
/**
 * Plugin Name:       Blocks Plugin
 * Description:       A set of useful blocks.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Mauriac
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blocks-plugin
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_blocks_plugin_block_init() {
	register_block_type( __DIR__ . '/build/recipe-block' );
}
add_action( 'init', 'create_block_blocks_plugin_block_init' );
